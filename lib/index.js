import janus from './janus.js';
import release from './plugins/release';

janus.loadPlugin(release);

janus.start();
