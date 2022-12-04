import Koa from 'koa'
import http from 'http'
import Router from '@koa/router'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { koaMiddleware } from "@as-integrations/koa";

import Context from './shared/type/Context'
import getUserByToken from './user/helper/getUserByToken'
import getSchema from './getSchema'
import Container from 'typedi'
import { FolderAPI } from './folder/Folder.data'

export default async function startApolloServer() {
  const schema = await getSchema({ emitSchemaFile: true })
  const httpServer = http.createServer()
  const server = new ApolloServer<Context>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer })
    ]
  })

  await server.start()
  const router = new Router()
  const app = new Koa()
  app
    .use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

  router.all('/graphql', koaMiddleware(server, {
    context: async ({ ctx }) => {
      const token = ctx.request.header['authorization']
      return {
        user: token ? await getUserByToken(token as string) : undefined,
        // userToken: ctx.ctx.request.header.authorization,
        dataSources: {
          folderAPI: new FolderAPI()
          // folderAPI: Container.get(FolderAPI)
        }
      }
    },
  }))

  httpServer.on('request', app.callback())
  await new Promise<void>((resolve) => httpServer.listen({ port: 7200 }, resolve))
  console.log('🚀 Server ready at http://localhost:7200/graphql')

  // process.on('SIGKILL', async () => {
  //   console.log('CLOSING');
  //   await httpServer.close()
  // });

  return { server, app, router }
}
