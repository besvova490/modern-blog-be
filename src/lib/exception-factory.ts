import { ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export function exceptionFactory(errors: ValidationError[]) {
  const validationPayload = errors.reduce(
    (prev: Record<string, string>, current: ValidationError) => {
      prev[current.property] = Object.values(current.constraints).map((item) =>
        item.replace(`${current.property} `, ''),
      )[0];

      return prev;
    },
    {},
  );

  return new BadRequestException(validationPayload);
}
