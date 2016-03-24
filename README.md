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
