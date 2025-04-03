'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, register, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(name, username, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full" style={{ maxWidth: "600px", minWidth: "400px" }}>
        <Card className="w-full shadow-xl">
          <div className="py-8 px-8">
            <h2 className="text-3xl font-bold mb-8 text-center w-full whitespace-nowrap">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    size="large"
                    prefix={<UserOutlined className="text-gray-400" />}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-base font-medium text-gray-700 mb-2">
                  Username
                </label>
                <Input
                  id="username"
                  size="large"
                  prefix={<UserOutlined className="text-gray-400" />}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input.Password
                  id="password"
                  size="large"
                  prefix={<LockOutlined className="text-gray-400" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="w-full h-12 text-lg mt-8"
              >
                {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <Button
                type="link"
                onClick={() => setIsLogin(!isLogin)}
                size="large"
                className="text-base"
              >
                {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}