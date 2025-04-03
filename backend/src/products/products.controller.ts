import { Controller, Get, Post, Delete, Body, Param, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { SearchProductDto } from './dto/search-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('search')
  search(@Query() searchProductDto: SearchProductDto): Promise<Product[]> {
    return this.productsService.search(searchProductDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}