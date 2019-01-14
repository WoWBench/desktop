import { EventEmitter } from 'events';

class GameInstancesStore extends EventEmitter {
  constructor () {
    super()
    this.instances = {}
  }

  add (instance) {
    this.instances[instance.number] = instance;
  }

  getAll () {
    return this.instances;
  }
}

export const GameInstanceStore = new GameInstancesStore();