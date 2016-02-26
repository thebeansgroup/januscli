/**
 * Plugin base class
 */

class Plugin {
  constructor(janus) {
    this.janus = janus;
    this.setupCLI();
  }

  /**
  * name() Default plgin method for name.
  * if method is not set in comsuming class
  * it will throw an error.
  *
  */

  name() {
    throw new Error('JANUS CLI: Plugin name not set');
  }


  /**
  * setupCLI() finds plugin cli options and
  * parse.
  *
  */

  setupCLI() {
    const options = this.cliOptions();
    if(options) {
      options.forEach( this.addCLIOption.bind(this) );
    }

   const commands = this.cliCommands();
   if(commands) {
      commands.forEach( this.addCLICommand.bind(this) );
    }
  }

  /**
  * Default methods to prevent errors
  *
  */

  cliOptions() { return []; }
  cliCommands() { return []; }

  /**
  * addCLIOption() call plugin cli option 
  * on janus cli method.
  *
  */

  addCLIOption(option) {
    this.janus.cli.addOption.apply(
      this.janus.cli,
      option
    )
  }

  /**
  * addCLICommand() call plugin cli command
  * on janus cli method.
  *
  */

  addCLICommand(command) {
    this.janus.cli.addCommand.apply(
      this.janus.cli,
      command
    )
  }

}

export default Plugin;
