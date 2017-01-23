var nunjucks = require('nunjucks'),
    fs = require('fs'),
    path = require('path');

var paths = {
  testsJson: path.join(__dirname, '../tests.json'),
  templates: path.join(__dirname, 'templates'),
  outPath: path.join(__dirname, '../'),
  out: fname => path.join(paths.outPath, fname)
};

function getFilename( catname, testname ){
    var filename = [catname.toLowerCase(), testname.toLowerCase()]
                      .join('-')
                      .replace(/[^a-z0-9\-\ ]/, '')
                      .replace('/', ' ')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-');

    return filename;
}

function processExample( example ){
  if( example.indexOf('images') > -1 ){
    example = example.replace('images/', 'assets/test_images/');
    console.log(example);
  }

  return example;
}

function generateFiles(){
  var testsFile = fs.readFileSync(paths.testsJson).toString();
  var tests = JSON.parse(testsFile);

  nunjucks.configure(paths.templates);

  // Generate index

  var indexout = nunjucks.render('index.html', {tests: tests});
  fs.writeFileSync(paths.out('index.html'), indexout, 'utf8');

  // Generate individual tests

  for( catname in tests ){
    for( testname in tests[catname] ){
      var testObj = tests[catname][testname];

      var filename = getFilename( catname, testname );

      var filecontent = nunjucks.render('single-test.html', {
        testname: testname,
        example: processExample(testObj.example)
      });

      fs.writeFileSync(paths.out('tests/' + filename + ".html"), filecontent, 'utf8');    
    }
  }

  // TODO: Generate results
  var resultsout = nunjucks.render('results.html', {tests: tests});
  fs.writeFileSync(paths.out('results.html'), resultsout, 'utf8');

}

module.exports = {
  generate: generateFiles
}