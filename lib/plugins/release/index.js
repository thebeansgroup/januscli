import Plugin from '../../plugin.js';

class Release extends Plugin {

  constructor(janus) {
    super(janus);
  }

  name() {
    return 'Release';
  }

  /**
  * CLI options for plugin to
  * respond to.
  *
  */

  cli() {
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
