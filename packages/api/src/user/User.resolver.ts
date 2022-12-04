import { Query, Resolver, Ctx, Mutation, Arg, Authorized } from 'type-graphql'
import { User, UserModel, UserAndToken } from './User.entity'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type Context from '../shared/type/Context'
import { AddUserInput } from './input/AddUserInput'
import { LoginInput } from './input/LoginInput'
import { GraphQLError } from 'graphql';

@Resolver(() => User)
export class UserResolver {
  @Authorized('admin', 'user')
  @Query(() => User, {
    description: 'Получаем категорию по ID'
  })
  getUserInfo(@Ctx() ctx: Context) {
    console.log(ctx.user)
    return {
      ...ctx.user
    }
  }

  @Authorized('admin')
  @Query(() => [User], {
    description: 'Получаем категорию по ID'
  })
  async getUsers() {
    return await UserModel.find()
  }

  @Mutation(() => UserAndToken)
  async login(@Arg('data', () => LoginInput) data: LoginInput) {
    const user = await UserModel.findOne({
      email: data.email
    }).lean({ virtuals: true })
    if (!user) throw new GraphQLError('Пользователь не найден или пароль не подходит')

    const notValidPassword = !bcrypt.compareSync(data.password, user.password)
    if (notValidPassword) throw new GraphQLError('Пользователь не найден или пароль не подходит')

    const token = jwt.sign({ id: user._id }, process.env['JWT_SECRET'] as string, {
      expiresIn: '1 days'
    })

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      token: {
        accessToken: token,
        expirationInSeconds: Math.round(Date.now() / 1000) + 24 * 60 * 60
      }
    }
  }

  @Authorized('admin')
  @Mutation(() => User)
  async addUser(@Arg('data', () => AddUserInput) data: AddUserInput) {
    const passwordHash = await bcrypt.hash(data.password, 10)
    const user = await UserModel.create<AddUserInput>({
      ...data,
      password: passwordHash
    })

    return {
      id: user._id,
      email: user.email,
      role: user.role
    }
  }

  @Authorized('admin')
  @Mutation(() => User)
  async updateUser(@Arg('id') id: string, @Arg('data') data: AddUserInput) {
    const passwordHash = await bcrypt.hash(data.password, 10)
    const user = await UserModel.findOneAndUpdate<User>(
      { _id: id },
      {
        ...data,
        password: passwordHash
      },
      {
        returnDocument: 'after'
      }
    )

    if (user) {
      return {
        id: user.id,
        email: user.email,
        role: user.role
      }
    } else {
      throw Error('Пользователь не найден')
    }
  }

  @Authorized('admin')
  @Mutation(() => User)
  removeUser(@Arg('id') id: string) {
    return UserModel.findOneAndRemove({ _id: id })
  }
}
