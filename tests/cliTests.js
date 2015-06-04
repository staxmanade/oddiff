var approvals = require('approvals');
var shelljs = require('shelljs');
var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;

var exec = function(args) {
  var tool = path.join(__dirname, '../index');
  var result = shelljs.exec('node ' + tool + ' ' + args);
  return result.output;
};

describe('When executing the oddiff tool command', function() {

  it('should strip out help command and markdown-ify it for console usage', function() {

    // trim because shelljs seems to capture an extra \n
    var result = exec('--help').trim();

    approvals.verify(path.join(__dirname, 'approvals'), 'HelpFile', result);

  });

  it('should print the version', function() {

    // trim because shelljs seems to capture an extra \n
    var result = exec('--version').trim();

    var expectedVersion = require('../package').version;
    expect(result).to.equal(expectedVersion);

  });


  it('Zero args should print help', function() {

    // trim because shelljs seems to capture an extra \n
    var expectedHelpResult = exec('--help');
    var zeroArgsResult = exec('');

    expect(zeroArgsResult).to.equal(expectedHelpResult);

  });

});
