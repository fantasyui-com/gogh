#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program = require('commander');
const core = require('./index.js');
const path = require('path');
const fs = require('fs');

program
  .version('0.1.0')

  .option('-o, --output', 'Type of output, by default STDOUT.')

  .option('-i, --import [file]', 'Read import.json and output style.json', 'import.json')
  .option('-m, --merge [file]', 'Read import.json and merge with style.json', 'import.json')
  .option('-c, --compile [file]', 'Read style.json and output style.css ', 'style.json')

  .parse(process.argv);

if(program.import){

  const location = path.resolve(path.join('./', program.import) )
  console.log('import: location: %s', location);
  core.importData({location})

}else if(program.merge){
  
  const location = path.resolve(path.join('./', program.import) )
  console.log('import: location: %s', location);
  core.importData({location})

}else if(program.compile){

  const location = path.resolve(path.join('./', program.compile) )
  console.log('compile: location: %s', location);
  core({location})

}else{

  console.log('huh: Nothing to do.');

}
