import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Folder {
  @Field()
  id: string

  @Field()
  name: string
}