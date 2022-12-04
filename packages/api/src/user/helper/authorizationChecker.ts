import type { AuthChecker } from 'type-graphql'
import { GraphQLError } from 'graphql';
import type Context from '../../shared/type/Context'

export const authorizationChecked: AuthChecker<Context> = ({ context }, roles) => {
  if (roles.length) {
    if (roles.some((r) => r === context.user?.role)) {
      return true
    } else {
      throw new GraphQLError('Не туда ты хочешь зайти друг, тебе в следующую дверь')
    }
  } else {
    return true
  }
}
