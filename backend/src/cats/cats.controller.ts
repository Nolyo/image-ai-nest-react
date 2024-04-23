import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './CreateCatDto';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): Observable<any[]> {
    return of(['test', 'toast']);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return 'This action adds a new cat';
  }
}
