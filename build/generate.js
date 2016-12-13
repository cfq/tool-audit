var nunjucks = require('nunjucks'),
    fs = require('fs');

var testsFile = fs.readFileSync('../tests.json').toString();
var tests = JSON.parse(testsFile);

nunjucks.configure('templates');

var indexout = nunjucks.render('index.html', {tests: tests});

fs.writeFileSync('out/index.html', indexout, 'utf8');
