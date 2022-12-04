import { FolderAPI } from '../../folder/Folder.data'
import type { User } from '../../user/User.entity'

export default interface Context {
  user: User,
  dataSources: {
    folderAPI: FolderAPI
  }
}
