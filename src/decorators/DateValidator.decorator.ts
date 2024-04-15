import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { GetUsername } from "src/users/queries/impelments/get-user.query";

@ValidatorConstraint()
@Injectable()
export class DateStringValidator implements ValidatorConstraintInterface {
  //"DD-MM-YYYY"  
  validate(date: string) {
    console.log(date)
    const regex1 = /^(\d{4})-(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])$/;
    const regex2 = /^(\d{4})\/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/;
    if (regex1.test(date) || regex2.test(date)) return true;

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid date`;
  }
}