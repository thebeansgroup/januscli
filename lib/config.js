import nconf from 'nconf';
import nconfYAML from 'nconf-yaml';
import fs from 'fs';

const file = '.janus';

/**
 * Load file into config
 */

class Config {

  constructor(janus) {
    this.janus = janus;
    this.config = nconf;

    if (!this.isSetup()) {
      this.reportMissingFile();
    }
    this.readConfigFile();
  }

  isSetup() {
    let setup = true;
    try {
      fs.readFileSync(`./${file}`).toString('utf8');
    } catch (e) {
      setup = false;
    }

    return setup;
  }

  readConfigFile() {
    this.config.file({
      file,
      format: nconfYAML,
    });
  }

  reportMissingFile() {
    this.janus.error(
      'Config:', 
      "File '.janus' is missing. Please add the file and run again.",
      true
    );
  }

  get(key) {
    return nconf.get(key);
  }

  set(key, value) {
    return nconf.set(key, value);
  }

}


export default Config;
