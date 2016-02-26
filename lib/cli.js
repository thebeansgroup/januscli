import commander from 'commander';
import version from './version.js';

/**
 * Global CLI setup
 */

class CLI {

  constructor() {
    commander.version(version);
  }

 /**
  * loadPlugin() loads Janus plugin
  * and passes class scope
  *
  * @param {String} flags
  * @param {String} description
  * @param {Mixed} defaultValue
  * @param {Function} callback
  * @return {this} for chaining
  */

  addOption(flags, description, defaultValue, fn) {
    commander.option(flags, description, fn, defaultValue);
    return this;
  }

  /**
  * loadPlugin() loads Janus plugin
  * and passes class scope
  *
  * @param {String} name Plugin name
  * @param {Object} opts Config options for plugin
  */

  parse() {
    commander.parse(process.argv);
  }
}

export default new CLI();
