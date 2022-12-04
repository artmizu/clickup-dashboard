import { ObjectType, Field, ID, registerEnumType } from 'type-graphql'
import { UserRole } from '@clickup-dashboard/shared'
import tg, { mongoose } from '@typegoose/typegoose'
const { prop, getModelForClass } = tg

registerEnumType(UserRole, {
  name: 'UserRole'
})

@ObjectType()
export class User {
  @Field(() => ID)
  id: mongoose.Types.ObjectId

  @Field()
  @prop({ required: true })
  email: string

  @prop({ required: true })
  password: string

  @Field(() => UserRole)
  @prop({ type: () => String, enum: UserRole })
  role: UserRole
}

@ObjectType()
export class Token {
  @Field()
  accessToken: string

  @Field()
  expirationInSeconds: number
}

@ObjectType()
export class UserAndToken {
  @Field(() => User)
  user: User

  @Field(() => Token)
  token: Token
}

export const UserModel = getModelForClass(User)
