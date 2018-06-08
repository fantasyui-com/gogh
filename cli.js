#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program = require('commander');
const core = require('./index.js');
const util = require('./util.js');
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
  util.importData({database,file})

}else if(program.merge){

  const database = path.resolve(path.join('./', program.database) )
  const file = path.resolve(path.join('./', program.file) )
  util.mergeData({database,file})

}else if(program.compile){

  const database = path.resolve(path.join('./', program.database) )
  console.log( core.css(/[a-z]/, {database}) );

}else{

  console.log('huh: Nothing to do.');

}
