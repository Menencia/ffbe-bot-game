import * as mongoose from 'mongoose'
import { mongoDBUri } from '../../settings'

import { newPlayerObj, playerSchema } from './schemas/player'

const player = mongoose.model('Player', playerSchema)

// mongoose.connection.on('open', () => {
//   console.log('\nDATABASE: Connected!');
// });

// mongoose.connection.on('close', () => {
//   console.log('DATABASE: Disconnected!\n');
// });

// process.on('close', () => {
//   console.log('Database disconnecting on app termination')
//   if (mongoose.connection.readyState === 1) {
//     mongoose.connection.close(() => {
//       process.exit(0)
//     })
//   }
// })

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0)
  })
})

function connect() {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(mongoDBUri)
  }
}

function disconnect() {
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.close()
  }
}

mongoose.connection.on('error', (err) => {
  console.log(err)
  disconnect()
})

export class Database {

  constructor(public helper) {}

  public createNewPLayer(discordId, name) {
    connect()
    return new Promise((resolve, reject) => player.create(newPlayerObj(discordId, name), (err, result) => {
      if (err) {
        disconnect()
        return reject(err)
      }

      disconnect()
      return resolve(result)
    }))
  }

  public deletePlayer(discordId) {
    connect()
    return new Promise((resolve, reject) => player.remove({discordId}, (err) => {
      if (err) {
        disconnect()
        return reject(err)
      }

      disconnect()
      return resolve()
    }))
  }

  public loadPlayer(discordId, selectFields = {}) {
    connect()
    return new Promise((resolve, reject) => player.findOne({discordId}, (err, result) => {
      if (err) {
        disconnect()
        return reject(err)
      }

      disconnect()
      return resolve(result)
    })
      .select(selectFields))
  }

}
