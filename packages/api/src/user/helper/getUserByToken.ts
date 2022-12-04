import jwt from 'jsonwebtoken'
import { UserModel, User } from '../User.entity'

export default async function getUserByToken(token: string) {
  if (!process.env['JWT_SECRET']) throw Error('Не предоставлен JWT_SECRET для правильно работы сервиса')
  let result: User | null = null
  try {
    const data = jwt.verify(token, process.env['JWT_SECRET']) as any // TODO
    const tmp = await UserModel.findById(data['id']).lean({ virtuals: true })
    if (!tmp) return result

    result = {
      ...tmp,
      id: tmp._id
    }
  } catch (e) {
    console.log('Ошибка при проверке токена или при получении пользователя', e)
  }

  return result
}
