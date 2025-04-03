import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) { }

  async findAll(): Promise<Product[]> {
    try {
      return this.productsRepository.find();
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }

  }

  async search(searchProductDto: SearchProductDto): Promise<Product[]> {
    try {
      const queryBuilder = this.productsRepository.createQueryBuilder('product');

      if (searchProductDto.name) {
        queryBuilder.andWhere('product.name ILIKE :name', { name: `%${searchProductDto.name}%` });
      }

      if (searchProductDto.minPrice !== undefined) {
        queryBuilder.andWhere('product.price >= :minPrice', { minPrice: searchProductDto.minPrice });
      }

      if (searchProductDto.maxPrice !== undefined) {
        queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice: searchProductDto.maxPrice });
      }

      return queryBuilder.getMany();
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }

  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const productExist = await this.productsRepository.findOne({ where: { name: createProductDto.name } });

      if (productExist) {
        throw new NotFoundException(`Product already exist in database`);
      }

      const product = this.productsRepository.create(createProductDto);

      return this.productsRepository.save(product);
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }

  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.productsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }

  }
}