import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
  POPULAR = 'POPULAR',
}

class PageOptionsDto {

  @IsOptional()
  readonly search?: string;

  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page? = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

}

interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  total: number;
}

class PageMetaDto {
  readonly page: number;

  readonly take: number;

  readonly total: number;

  readonly pageCount: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, total }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.total = total;
    this.pageCount = Math.ceil(this.total / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}

class PageDto<T> {

  @IsArray()
  readonly data: T[];

  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}

export { Order, PageOptionsDto, PageMetaDtoParameters, PageMetaDto, PageDto };