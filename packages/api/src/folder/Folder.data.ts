import type { Folder } from './Folder.entity'
import ClickupAPI from '../shared/data/ClickupAPI'
import { Service } from 'typedi'

@Service()
export class FolderAPI extends ClickupAPI {
  constructor() {
    super()
  }

  async getFolders() {
    const response: unknown[] = (await this.get('/space/10921750/folder'))?.folders || []
    console.log(response)
    return response
  }
}
