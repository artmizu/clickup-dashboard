import path from 'path'
import { fileURLToPath } from 'url'
import { buildSchema } from 'type-graphql'
import { getResolvers } from './shared/file-resolve'
import { authorizationChecked } from './user/helper/authorizationChecker'

export default async function getSchema({ emitSchemaFile = true }: { emitSchemaFile?: boolean } = {}) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const resolvers = await getResolvers(path.resolve(__dirname, './**/*.resolver.{ts,js}'))
  return buildSchema({
    resolvers,
    emitSchemaFile,
    validate: true,
    authChecker: authorizationChecked
  })
}
