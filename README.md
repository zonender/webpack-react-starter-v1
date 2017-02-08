
https://github.com/zonender/webpack2
//==============================================================\\
//==============================================================\\
                            MY NOTES:
\\==============================================================//
\\==============================================================//

BASIC INSTALLATION AND USE:
===========================================================================
===========================================================================

our project should include a scr folder with a simple index.js file with the following code:

=============
const sum = require('./sum');

const total = sum(1, 2);

console.log(total);
==============

And a sum.js file with:

======
const sum = (a, b) => a + b;

module.exports = sum;
======

And a simple index.html file in the root:

==========
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Upstar Music</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script src="dist/bundle.js"></script>
</html>

==========

1) to install webpack:

======
npm install webpack --save-dev
======

USING A CONFIG FILE:
===========================================================================
===========================================================================

1) create a webpack.config.js file with the following code, here we are using the common js module not es6:

THis is the absolute minimum to run webpack.

==========
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
============

path.resolve makes sure we get the path we need regardless of the OS it is running on.

__dirname = the current directory. (where webpack.config.js is located)

entry: "./src/index.js" is the top level file we want to include in our build.

filename: "bundle.js" is the output file that has includes all out JS code.

2) to create our bundle.js all we have to do is to create an npm "build" script in the package.json file:

==========
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  }
};
==========

installing webpack or any other library globally will force your pc to look for the global installation of node_modules under your username folder in your pc, which could
include a large number of modules and libraries, this might be slightly slower, it is best to install it locally using "npm install --save-dev" so that next time you run the command 
npm will look only in our locally installed node_modules, this is faster.

3) to see the html page run the command:

======
start index.html
======

USING WEBPACK IN WATCH MODE:
===========================================================================
===========================================================================

1) add a key called watch in the webpack config:

===========
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  watch: true
};
===========

2) run the command:

==========
npm run build
==========

3) do not exit the running webpack command, leave it running and make the changes you wish to you JS files, once you save the changes webpack will automatically run the bundle, to see
the changes on index,html reload the broweser.

USING WEBPACK's DEV SERVER:
===========================================================================
===========================================================================

So far we have been using the file protocal: 

file:///C:/Users/acsaa/Desktop/WebpackFundamentalsCourse/index.html

instead of the http protocal, to use the http protocal we will need to serve the files via a server, we need to install the webpack dev server to do this:

1) install the webpack dev server:

======
npm install webpack-dev-server --save-dev 
======

2) run the npm command:

======
npm run build
======


3) from within the project directory run:

=====
webpack-dev-server
=====

3) Now we can change the url to: http://localhost:8080/ we can also use: http://localhost:8080/webpack-dev-server/ this will display a status bar on top of the page, the server also
has a hot relod feature, this means you don't have to hit the reload button to see the changes, but it won't open the broweser for you.

Remember webpack will automatically bundle all js files that are required/imported to app.js, and if other files are required in other files related to app.js those will be required as well
but if there is a file that has no require statemnt or import statement then we have to explicitly mention it in the webpack config file as an array value under the entry key, like this:

THIS IS JUST AN EXAMPLE NOT A FILE USED IN THIS PROJECT:

======
module.exports = {
	entry: ["./utils", "./app.js"],
	output: {
		filename: "bundle.js"
	},
	watch: true
}
======

LOADERS FOR TRANSPILING ES6 TO ES5:
===========================================================================
===========================================================================

With loaders we can process files and change them into something else, for example we can use webpack loaders to change es6 files into es5.

before using babel we have to install it:

1) create a file called .babelrc and put this code inside it:

======
{
  "presets": ["es2015"]
}
======

2) install babel:

======
npm install --save-dev babel-core babel-loader babel-preset-es2015
======

Now we are ready to use babel with webpack.

Now to use our loaders for transpiling:
======================================

1) open the webpack config file and add the key "module" with an array called "rules", as follows:

======
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader', //here we are selecting the loader 
        test: /\.js$/ //and here we specify which file the loader will process 
      }
    ]
  },
  watch: false
};
======

2) run the npm command:

======
npm run build
======


3) run the webpack dev server from the command prompt:

======
webpack-dev-server
======


LOADERS FOR PROCESSING CSS:
===========================================================================
===========================================================================

1) fist we have to install the css-loaders to teach webpack how to process css files.

2) then we have to install style-loader so that webpack is able to inject them into the html files.

======
npm install --save-dev css-loader style-loader
======

3) Then we have to configure webpack.config.js to process every css file with both the css-loader and the style-loader

======
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader', //here we are selecting the loader 
        test: /\.js$/ //and here we specify which file the loader will process 
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/ //now any css file will be processed with both css and style loader
      }
    ]
  },
  watch: false
};
======

4) run: npm run build

5) run: webpack-dev-server



