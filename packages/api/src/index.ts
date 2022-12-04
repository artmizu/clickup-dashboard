import 'dotenv/config'
import 'reflect-metadata'
import startApolloServer from './startApolloServer.js'
import DBConnect from './db'

await DBConnect()
const { router, app } = await startApolloServer()

app.on('error', (err) => {
  console.log('Global app error', err)
  return err
})

router.get('/', (ctx) => {
  ctx.body = 'Root route of the graphql api'
})

// TODO
// router.all('/analytic/', async (ctx) => {
//   try {
//     ctx.header['content-type'] = registry.contentType
//     ctx.body = await registry.metrics()
//   } catch (e) {
//     ctx.status = 500
//     ctx.body = e
//   }
// })

