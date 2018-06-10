import * as mongoose from 'mongoose'

export class UserModel {

  public static getSchema() {
    return new mongoose.Schema({
      username: String,
      id: String,
      lapis: Number,
      created: Date
    })
  }

  constructor(
    public username: string,
    public id: string,
    public lapis: number,
    public created: Date = new Date()
  ) {}

}
