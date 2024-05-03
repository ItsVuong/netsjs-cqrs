import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint()
@Injectable()
export class DateStringValidator implements ValidatorConstraintInterface {

  validate(date: string) {
    if (this.validateDateString(date)) return true;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid date`;
  }

  private validateDateString(dateString: string): boolean {
    const reFormattedString = dateString.replaceAll("\/", "-");
    const dateArray = reFormattedString.split("-");
    const date = new Date(reFormattedString);
    
    const monthString = (/\d{4}/.test(reFormattedString[0]))? dateArray[2] : dateArray[1]

    // console.log(monthString);
    // console.log(`Date: ${date}, stringArray: ${dateArray}`)

    if ((date.getMonth() + 1) == Number(monthString))
      return true;
    return false;
  }
}

export function validateDateString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DateStringValidator,
    });
  }
}