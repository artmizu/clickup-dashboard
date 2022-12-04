import { Query, Resolver, Ctx, Mutation, Arg, Authorized } from 'type-graphql'
import { Test } from './Test.entity'

@Resolver(() => Test)
export class TestResolver {
  @Query(() => Test)
  getTest() {
    return {
      name: 'qweqwe'
    }
  }
}
