import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Test {
  @Field()
  name: string
}