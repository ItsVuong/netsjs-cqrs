import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { GetUsername } from "src/users/queries/impelments/get-user.query";

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(
    private readonly queryBus: QueryBus
){}

  async validate(id: string) {
    try {
      const user = await this.queryBus.execute(new GetUsername(id));
      if (user && user.length) return false;
    } catch (e) {
      return false; 
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Username already exist, pick another one`;
  }
}