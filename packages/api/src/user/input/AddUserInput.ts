import { UserRole } from '@clickup-dashboard/shared'
import { InputType, Field } from 'type-graphql'
import type { User } from '../User.entity'

@InputType()
export class AddUserInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  password: string

  @Field(() => UserRole)
  role: UserRole
}
