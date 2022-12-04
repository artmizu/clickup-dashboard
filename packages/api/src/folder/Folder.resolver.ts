import { Query, Resolver, Ctx, Mutation, Arg, Authorized } from 'type-graphql'
import Context from '../shared/type/Context'
import { Folder } from './Folder.entity'

@Resolver(() => Folder)
export class FolderResolver {
  @Query(() => [Folder])
  async getFolders(@Ctx() context: Context) {
    const res = await context.dataSources.folderAPI.getFolders()
    console.log('111', res)

    return res
  }
}
