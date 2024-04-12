import { AggregateRoot } from "@nestjs/cqrs";

export class Camper extends AggregateRoot{
    constructor(
        private readonly usernme: string
    ){
        super();
    }

    getUsername(){
        return this.usernme;
    }
}