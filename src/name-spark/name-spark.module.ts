import { Module } from '@nestjs/common';
import { NameSparkController } from './name-spark.controller';
import { NameSparkService } from './name-spark.service';

@Module({
  controllers: [NameSparkController],
  providers: [NameSparkService],
})
export class NameSparkModule {}
