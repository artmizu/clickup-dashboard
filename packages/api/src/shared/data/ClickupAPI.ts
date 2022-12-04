import { RESTDataSource, WillSendRequestOptions } from '@apollo/datasource-rest'

export default class ClickupAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.CLICKUP_API_URL;
    this.memoizeGetRequests = false
  }

  override willSendRequest(request: WillSendRequestOptions) {
    request.headers['authorization'] = process.env.CLICKUP_TOKEN;
  }
}