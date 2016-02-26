import CLI from './cli.js';

const plugins = {};

/**
 * Janus CLI Core Class
 */

class Janus {

  constructor() {
    console.log('hello Janus');
    this.cli = CLI;
  }

  /**
  * loadPlugin() loads Janus plugin
  * and passes class scope
  *
  * @param {Class} plugin Plugin ES6 Class
  */

  loadPlugin(plugin) {
    const inst = new plugin(this);
    plugins[inst.name()] = inst;
  }

  /**
  * start() Starts the lifecycle of Janus
  *
  */

  start() {
    this.cli.parse();
    console.log('start janus');
  }
}

export default new Janus();
