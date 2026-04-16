import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NameSparkModule } from './name-spark/name-spark.module';

@Module({
  imports: [NameSparkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
