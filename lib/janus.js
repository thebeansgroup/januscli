import EventEmitter from 'events';
import CLI from './cli.js';
import inquirer from 'inquirer';
import Plugin from './plugin.js';
import colors from 'colors';

const plugins = {};

/**
 * Janus CLI Core Class
 */

class Janus extends EventEmitter {

  constructor() {
    super();
    this.cli = new CLI(this);
    this.inquirer = inquirer;
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
  }

 /**
  * Custom Janus Errors
  *
  */

  error(msg, exit) {
    exit = (exit === undefined) ? true : exit;
    const error_txt = String.fromCharCode(0x2716) + " Error: ";
    console.log(error_txt.red + msg);
    if(exit) process.exit(1);
  }
}

export { Plugin };
export default new Janus();
