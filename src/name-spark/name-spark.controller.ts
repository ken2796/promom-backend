import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SearchNameSparkDto } from './dto/search-name-spark.dto';
import { UpdateNameFavoriteDto } from './dto/update-name-favorite.dto';
import { NameSparkService } from './name-spark.service';

@Controller('v1')
export class NameSparkController {
  constructor(private readonly nameSparkService: NameSparkService) {}

  @Post('name-spark/search')
  search(@Body() body: SearchNameSparkDto) {
    return this.nameSparkService.search(body);
  }

  @Get('names/:id')
  getNameDetail(@Param('id') id: string) {
    return this.nameSparkService.getNameDetail(id);
  }

  @Patch('names/:id/favorite')
  updateFavorite(
    @Param('id') id: string,
    @Body() body: UpdateNameFavoriteDto,
  ) {
    return this.nameSparkService.updateFavorite(id, body);
  }
}
