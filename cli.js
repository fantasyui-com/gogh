#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.1.0')

  .option('-o, --output', 'Type of output, by default STDOUT.')

  .option('-t, --txt [file]', 'Read style.txt and output style.json')
  .option('-j, --json [file]', 'Read style.json and output style.css ')

  .parse(process.argv);

if(program.txt){
  console.log('Nothing to do.')
}else if(program.txt){
  console.log('Nothing to do.')
}else{
  console.log('Nothing to do.')
}
