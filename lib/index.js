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
    this.allowVerboseDebugMode();
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
  * hadPlugin() test if plugin is loaded
  *
  * @param {String} name Plugin name
  */

  hasPlugin(name) {
    return !!plugins[name];
  }

  allowVerboseDebugMode() {
    this.debug = false;
    this.cli.addOption(
      '-v, --verbose',
      'Verbose mode for debugging',
      null,
      () => {
        this.info('Janus:', 'Verbose mode for debugging active.');
        this.debug = true; 
      }
    )
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

  error(pre, msg, exit) {
    exit = (exit === undefined) ? true : exit;
    const error_txt = String.fromCharCode(0x2718) + " Error: ";
    console.log(error_txt.red + pre.grey + ' ' + msg);
    if(exit) process.exit(1);
  }

 /**
  * Custom Janus Success
  *
  */

  success(pre, msg) {
    const success_txt = String.fromCharCode(0x2713) + " Success: ";
    console.log(success_txt.green + pre.grey + ' ' + msg);
  }

 /**
  * Custom Janus Info Message
  *
  */

  info(pre, msg) {
    const info_txt = String.fromCharCode(0x2139) + " Info: ";
    console.log(info_txt.grey + pre.grey + ' ' + msg);
  }

}

export { Plugin };
export default new Janus();
