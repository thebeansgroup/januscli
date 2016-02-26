import Plugin from '../../plugin.js';

/**
 * Release plugin definition
 */

class Release extends Plugin {

  constructor(janus) {
    super(janus);
  }

 /**
  * name() set plugin name
  *
  */

  name() {
    return 'Release';
  }


/**
  * CLI options for plugin to
  * respond to.
  *
  */

  cliCommands() {
    return [
      [
        'exec [cmd]',
        'run the given remote command',
        function(cmd) {
          console.log('exec "%s"', cmd);
        }
      ]
    ]
  }

  /**
  * CLI options for plugin to
  * respond to.
  *
  */

  cliOptions() {
    return [
      [
        '-p, --pepper <n>',
        'Test 1',
        false,
        function(val) {
          console.log('arg called', arguments);
        }
      ],
      [
        '-t, --test <n>',
        'Test 2',
        false,
        function(val) {
          console.log('arg called', arguments);
        }
      ]
    ]
  }

}

export default Release;
