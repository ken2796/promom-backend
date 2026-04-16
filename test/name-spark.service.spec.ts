import { NotFoundException } from '@nestjs/common';
import { NameSparkService } from '../src/name-spark/name-spark.service';

describe('NameSparkService', () => {
  let service: NameSparkService;

  beforeEach(() => {
    service = new NameSparkService();
  });

  it('throws a not found error for an unknown name id', () => {
    expect(() => service.getNameDetail('missing-name')).toThrow(NotFoundException);
  });
});
