import { Database } from '../database/database'
import { Helper } from '../utils/helper'

export class Game {

  public database: Database

  constructor(public hook: object, public helper: Helper) {
    this.database = new Database(helper)
  }

}
