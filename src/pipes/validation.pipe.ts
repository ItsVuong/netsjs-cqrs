
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ToNumberPipe implements PipeTransform {
    constructor(private defaultValue: Number) { }

    transform(value: any, metadata: ArgumentMetadata) {
        value = Number(value);
        return value || this.defaultValue;
    }
}
