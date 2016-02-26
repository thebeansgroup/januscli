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
  * addOption() use commander option
  * as a callback system for plugins
  *
  * @param {String} flags
  * @param {String} description
  * @param {Mixed} defaultValue
  * @param {Function} fn
  * @return {this} for chaining
  */

  addOption(flags, description, defaultValue, fn) {
    commander.option(flags, description, fn, defaultValue);
    return this;
  }

 /**
  * addCommand() use commander command
  * as a callback system for plugins
  *
  * @param {String} flags
  * @param {String} description
  * @param {Function} fn
  * @return {this} for chaining
  */

  addCommand(cmd, description, fn) {
    commander.command(cmd)
      .description(description)
      .action(fn);
    return this;
  }

  /**
  * parse() Call the commander parse method
  *
  */

  parse() {
    commander.parse(process.argv);
  }
}

export default new CLI();
