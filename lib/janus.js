import CLI from './cli.js';

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
  * @param {String} name Plugin name
  * @param {Object} opts Config options for plugin
  */

  loadPlugin(name, opts) {
    console.log('load:', name);
    this.cli.addOption(
      '-p, --pepper <n>',
      'Test',
      false,
      function(val) {
        console.log('arg called', arguments);
      }
    );
  }

  /**
  * loadPlugin() loads Janus plugin
  * and passes class scope
  *
  * @param {String} name Plugin name
  * @param {Object} opts Config options for plugin
  */

  start() {
    this.cli.parse();
    console.log('start janus');
  }
}

export default new Janus();
