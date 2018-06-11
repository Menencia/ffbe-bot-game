import { PlayCommand } from '../commands/play'
import { StopCommand } from '../commands/stop'

export const commands = [
  new PlayCommand(),
  new StopCommand()
]
