const API_URL = "http://localhost:1400";

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
}

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return headers;
};

export interface CreateProductDto {
  name: string;
  price: number;
  description?: string;
  category?: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function createProduct(
  product: CreateProductDto
): Promise<Product> {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create product");
  }

  return response.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}

// Auth functions
export async function login(
  username: string,
  password: string
): Promise<{ access_token: string }> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await response.json();
  setAuthToken(data.access_token);
  return data;
}

export async function register(  
  username: string,
  password: string,
  name: string,
): Promise<any> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, name }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
}

export async function getProfile(): Promise<any> {
  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to get profile");
  }

  return response.json();
}

export interface SearchProductDto {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
}

export async function searchProducts(params: SearchProductDto): Promise<Product[]> {
  const queryParams = new URLSearchParams();
  
  if (params.name) queryParams.append('name', params.name);
  if (params.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
  if (params.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());

  const response = await fetch(`${API_URL}/products/search?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to search products");
  }
  return response.json();
}
