#!/usr/bin/env node

/// <reference path="typings/node/node.d.ts"/>

var jsdiff = require('diff');
var chalk = require('chalk');

var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['verbose', 'debug']
});

argv.debug = argv.debug || argv.verbose;

if (argv.debug) {
  console.log('args:', argv);
}

function getHelpText() {
  var fs = require('fs');
  var path = require('path');
  var helpText = fs.readFileSync(path.join(__dirname, 'README.md')).toString();
  helpText = helpText.substr(helpText.indexOf('<!-- HELP-BEGIN -->') + 20);
  helpText = helpText.substr(0, helpText.indexOf('<!-- HELP-END -->') - 1);

  var output = require('msee').parse(helpText);
  output = output.replace(/&nbsp;/g, ' ');

  return output;
}

if (argv.help) {
  console.log(getHelpText());
  return;
}

if (argv.version) {
  console.log(require('./package').version);
  return;
}

if (argv._.length !== 2) {
  console.log(getHelpText());
  return;
}

var file1 = argv._[0];
var file2 = argv._[1];

var shelljs = require('shelljs');

var f1Result = shelljs.exec('od -c ' + file1, {silent: true});
var f2Result = shelljs.exec('od -c ' + file2, {silent: true});

var diff = jsdiff.diffChars(f1Result.output, f2Result.output);

diff.forEach(function(part) {

  // green for additions, red for deletions
  // grey for common parts
  var color = part.added ? 'green' :
    part.removed ? 'red' : 'gray';

  process.stdout.write(chalk[color](part.value));
});
