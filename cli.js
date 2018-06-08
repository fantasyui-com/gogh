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

  .option('-d, --database [file]', 'Primary gradient information database.', 'style.json')
  .option('-f, --file [file]', 'File to use by operations.')

  .option('-i, --import', 'Read import.json and output style.json')
  .option('-m, --merge', 'Read import.json and merge with style.json')
  .option('-c, --compile', 'Read style.json and output style.css')

  .parse(process.argv);

if(program.import){

  const database = path.resolve(path.join('./', program.database) )
  const file = path.resolve(path.join('./', program.file) )
  core.importData({database,file})

}else if(program.merge){

  const database = path.resolve(path.join('./', program.database) )
  const file = path.resolve(path.join('./', program.file) )
  core.mergeData({database,file})

}else if(program.compile){

  // const source = path.resolve(path.join('./', program.compile) )
  // console.log('compile: location: %s', source);
  // core({location})

}else{

  console.log('huh: Nothing to do.');

}
