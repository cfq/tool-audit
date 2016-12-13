var nunjucks = require('nunjucks'),
    fs = require('fs');

function getFilename( catname, testname ){
    var filename = [catname.toLowerCase(), testname.toLowerCase()]
                      .join('-')
                      .replace(/[^a-z0-9\-\ ]/, '')
                      .replace('/', ' ')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-');

    return filename;
}

var testsFile = fs.readFileSync('../tests.json').toString();
var tests = JSON.parse(testsFile);

nunjucks.configure('templates');

// Generate index

var indexout = nunjucks.render('index.html', {tests: tests});

fs.writeFileSync('out/index.html', indexout, 'utf8');

// Generate individual tests

for( catname in tests ){
  for( testname in tests[catname] ){
    var testObj = tests[catname][testname];

    var filename = getFilename( catname, testname );

    var filecontent = nunjucks.render('single-test.html', {
      testname: testname,
      example: testObj.example
    });

    fs.writeFileSync('out/tests/' + filename + ".html", filecontent, 'utf8');    
  }
}

// Generate results


