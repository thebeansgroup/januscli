import janus from './janus.js';
import release from 'januscli-release';
import tasks from 'januscli-tasks';

janus.loadPlugin(release);
janus.loadPlugin(tasks);

janus.start();
