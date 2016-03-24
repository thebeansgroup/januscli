# Janus CLI

Janus CLI is a Toolbelt framework that provides a simple plugin system to allow you to build plugins for your build process. 

It is important to note that Janus CLI is *not* in itself an executable but a tool to help you build your own. NPM have a [great blog post](http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm) that explains how to build an executable using NPM.

# Existing plugins

* [Task Runner Plugin](https://github.com/thebeansgroup/januscli-tasks)
  * As it sounds, the task runner will synchronously run tasks from a YAML file in the current repo. Useful for pre-release tasks.
* [Release Plugin](https://github.com/thebeansgroup/januscli-release)
  * This plugin handles semantic versioning, auto changelings and github releases.

# Usage

## Writing your executable file 

Our company Janus executable is open over at [thebeansgroup/tbg-januscli](https://github.com/thebeansgroup/tbg-januscli) and acts as a template for rolling out your own.

This example shows how you can use the above plugins using `ES6`:

```javascript
import janus from 'januscli';
import release from 'januscli-release';
import tasks from 'januscli-tasks';

janus.loadPlugin(release);
janus.loadPlugin(tasks);

janus.start();
```

or using `common.js` modules:

```javascript
var janus = require('januscli').default;
var release = require('januscli-release').default;
var tasks = require('januscli-tasks').default;

janus.loadPlugin(release);
janus.loadPlugin(tasks);

janus.start();
```

Once you’ve built your executable — and assuming you have named it `janus` — then you can run the tasks like any CLI. 

```zsh
$ my-repo> janus -h

  Usage: janus [options] [command]


  Commands:

    release [level_override]  Create a release of current app
    tasks                     Run tasks in project

  Options:

    -h, —help      output usage information
    -V, —version   output the version number
    -v, —verbose   Verbose mode for debugging

```

# Writing plugins

A plugin is just an extension of the main [plugin class](https://github.com/thebeansgroup/januscli/blob/master/lib/plugin.js). Within your plugin you need only do three things:
* Set CLI commands
* Set CLI options
* Add listeners and handlers for commands.

The following is a simple example of a plugin taken from the [Janus Plugin Example repo](https://github.com/thebeansgroup/januscli-plugin-example).

```javascript
import { Plugin } from 'januscli';


/**
 * Example plugin definition
 */

class Example extends Plugin {

  constructor(janus) {
    super(janus);
    this.foo = 'bar';
  }

 /**
  * name() set plugin name
  *
  */

  name() {
    return 'example';
  }


 /**
  * Event handlers
  *
  */

  events() {
    this.janus.on( this.startEventName(), this.startExampleCommand.bind(this) )
    this.janus.on( 'example2:start', this.startExample2Command.bind(this) )
  }

 /**
  * CLI options for plugin to
  * respond to.
  *
  */

  cliCommands() {
    return [
      [
        'example', // command line option name
        'Run example command', // Command line description
        this.name() // event name
      ],
      [
        'example2', // command line option name
        'Run example 2 command', // command line description
        'example2' // event name
      ]
    ]
  }

 /**
  * CLI options for plugin to
  * respond to.
  *
  * This is a decorator for https://github.com/tj/commander.js/#option-parsing
  * 
  */

  cliOptions() {
    return [
      [
        '-f, --foo <value>', // command line flags
        'Set Foo', // command line description
        'bar', // default value
        (value) => { // Callback (this differs to commander.js)
          this.foo = value;
        }
      ]
    ]
  }

  /**
  * Example command
  *
  */

  startExampleCommand() {
    this.janus.success('Example:', 'Example command started');
    this.janus.info('Example:', `Foo = ${this.foo}` );
  }

  /**
  * Example 2 command
  *
  */

  startExample2Command() {
    this.janus.success('Example:', 'Example 2 command started');
    this.janus.info('Example:', `Foo = ${this.foo}` );
  }


}

export default Example;
```

This plugin can then be consumed by your toolbelt:

```javascript
import janus from 'januscli';
import Example from './example.js';

janus.loadPlugin(Example);

janus.start();
```

Example output:

```zsh
[master][~/src/janustest] ./bin/index.js -h

  Usage: index [options] [command]


  Commands:

    example    Run example command
    example2   Run example 2 command

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -v, --verbose      Verbose mode for debugging
    -f, --foo <value>  Set Foo
    
 [master][~/src/janustest] ./bin/index.js example
✓ Success: Example: Example command started
ℹ Info: Example: Foo = bar

[master][~/src/janustest] ./bin/index.js example2
✓ Success: Example: Example 2 command started
ℹ Info: Example: Foo = bar

[master][~/src/janustest] ./bin/index.js example2 --foo buzz
✓ Success: Example: Example 2 command started
ℹ Info: Example: Foo = buzz
```
