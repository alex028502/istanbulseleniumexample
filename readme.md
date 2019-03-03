# client side istanbul code coverage example

I need to measure test coverage for transpiled code test in the browser with
selenium.  I couldn't find much documentation on it, so I created
this example project.

The following project really helped me figure it out:
https://github.com/mahuntington/e2e-istanbul

However, I needed to figure out two more things
* how to make it work with webpack, and `istanbul-instrumenter-loader`
* how merge the results with unit test results

### project notes

#### python

My real project uses javascript with async/await for selenium testing.  However,
I have used python for selenium tests here. This made it easier for me to take
in how the different parts interact. I hope this doesn't make it too much less
helpful for somebody else.

#### server

Amazingly, this works without a server. Even though chrome dev tools can't see
the source maps when it is run locally, the instrumented code seems to find them
for coverage information.

This example shows some express middleware, but I don't really understand what it
does:
https://medium.com/@the1mills/front-end-javascript-test-coverage-with-istanbul-selenium-4b2be44e3e98
Maybe if I read it after completed this project, I'll figure it out.

#### coffee script

My real project is react, but I decided to test source map support by making one
module with coffeescript. This has allowed me to avoid babel for a change. (nothing
aganist babel - I would be lost without it)

I originally tried to do that with the only other webpacker language loader I could
find, https://github.com/fengari-lua/fengari-loader for lua. That would have been
awesome. However, it seems to embed an interpreter rather than transpiling, so I
don't think I would have gotten a very good source map example.

#### output directory

I couldn't figure out how to tell nyc to output to a different directory, or not
to delete the directory, so I have two output directories confusingly named
`.nyc_output` and `nyc_output`. The former is where nyc automatically puts the
code coverage from the node tests, and then second is where we copy it to when
we are done so that we can mix it with the code coverage json from the selenium
tests.

#### important bits of code

The important things that I might want to copy later are:
* [the webpack config](./webpack.config.js) which instruments the code
* [javascript that copies the coverage info from the browser](./test.py)
* [npm script](./package.json) '_report' that generates a coverage report from
multiple files

## how to run

#### prerequisites
I have used node 8 and python3. I also have chromedriver installed.

#### install everything
```
npm ci
```

that will also install python dependencies. However, if you run it with scripts
turned off, it won't. You can then install the python dependencies like this
```
./install-python-stuff.sh
```

### try out the app

```
npm start
```

The above starts a server with python. It will only work if your port 8000 is
free. Because I already have python3 for selenium tests, I used their handy dev
server too. No dev server is used for selenium tests, but we use it here because
source maps don't seem to show up for local html files.

If you go to http://localhost:8080, you should see an amazing app that can
translate just about any word to Spanish. However I would start with 'hello',
and then try some others.

If you open dev tools you can see the source maps. You can also print out
a coverage report by putting this into the browser console:
```
> console.log(JSON.stringify(window.__coverage__));
```

The selenium test copies that to a file.

If you actually want to publish an app, you should probably webpack an
uninstrumented version of it. There is no example of that in this project.

### see unit test only coverage

```
npm run only-unit
```

You should see this after all of the tests pass:

```
----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |    94.74 |     87.5 |      100 |    94.74 |                   |
 index.js |       90 |     87.5 |      100 |       90 |                14 |
 test.js  |      100 |      100 |      100 |      100 |                   |
----------|----------|----------|----------|----------|-------------------|

```

It shows that only one line is not covered in src/index.js

This just runs the standard way with nyc.

### see selenium only test coverage

```
npm run only-browser
```

If you have `chromedriver` installed, this should open up your app in a browser
as a local file, and then try to translate a word that does exist, and one that
doesn't.

When it is done you should see the amazing part:

```
---------------|----------|----------|----------|----------|-------------------|
File           |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------|----------|----------|----------|----------|-------------------|
All files      |       75 |       50 |      100 |       75 |                   |
 src           |      100 |      100 |      100 |      100 |                   |
  index.js     |      100 |      100 |      100 |      100 |                   |
 src/translate |       60 |       50 |      100 |       60 |                   |
  index.js     |       60 |       50 |      100 |       60 |          5,6,8,16 |
 src/ucase     |       75 |      100 |      100 |       75 |                   |
  index.coffee |       75 |      100 |      100 |       75 |                 8 |
---------------|----------|----------|----------|----------|-------------------|
```

You can see that most of `src/translate.js` was not touched by the selenium tests.

### the two combined (as well as td;dr sorry to tell you so late)

```
npm test
```

This will run the unit tests, and the integration tests (and lint) and if all
goes well, should produce a single code coverage report.

```
---------------|----------|----------|----------|----------|-------------------|
File           |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------|----------|----------|----------|----------|-------------------|
All files      |    96.55 |      100 |      100 |    96.55 |                   |
 src           |      100 |      100 |      100 |      100 |                   |
  index.js     |      100 |      100 |      100 |      100 |                   |
 src/translate |      100 |      100 |      100 |      100 |                   |
  index.js     |      100 |      100 |      100 |      100 |                   |
  test.js      |      100 |      100 |      100 |      100 |                   |
 src/ucase     |       75 |      100 |      100 |       75 |                   |
  index.coffee |       75 |      100 |      100 |       75 |                 8 |
---------------|----------|----------|----------|----------|-------------------|
```

And you can see that the only line with no coverage is the line of the ucase
library that is not used by the app, and was not unit tested.

Amazing!
