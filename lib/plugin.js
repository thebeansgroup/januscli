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
    const options = this.cli();
    if(!options) return false;

    options.forEach( this.addCLIOption.bind(this) );
  }

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
}

export default Plugin;
