import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValibotPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    console.log('value', value);
    console.log('metadata', metadata);
    return value;
  }
}
