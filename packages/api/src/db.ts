import mongoose from 'mongoose'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'

export default async function connect() {
  try {
    mongoose.plugin(mongooseLeanVirtuals)
    if (!process.env['MONGO_URI']) throw Error('Не предоставлена переменная окружения MONGO_URI')
    await mongoose.connect(process.env['MONGO_URI'], {
      socketTimeoutMS: 30000,
      maxPoolSize: 50
    })
    console.log('successful connected to DB')

    mongoose.connection.on('error', (err) => {
      console.log('Mongoose error', err)
    })
  } catch (e) {
    console.log('cannot connect to DB', e)
    throw Error('cannot connect to DB')
  }
}
