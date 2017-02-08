
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
  "scripts": {
    "build": "webpack"
  },
==========

installing webpack or any other library globally will force your pc to look for the global installation of node_modules under your username folder in your pc, which could
include a large number of modules and libraries, this might be slightly slower, it is best to install it locally using "npm install --save-dev" so that next time you run the command 
npm will look only in our locally installed node_modules, this is faster.

USING WEBPACK IN WATCH MODE:
===========================================================================
===========================================================================

1) add a key called watch in the webpack config:

===========
module.exports = {
	entry: "./app.js",
	output: {
		filename: "bundle.js"
	},
	watch: true
}
===========

2) run the command:

==========
webpack
==========

3) do not exit the running webpack command, leave it running and make the changes you wish to you JS files, once you save the changes webpack will automatically run the bundle, to see
the changes on index,html reload the broweser.

USING WEBPACK's DEV SERVER AND HOT RELOADING THE BROWSER:
===========================================================================
===========================================================================

So far we have been using the file protocal: 

file:///C:/Users/acsaa/Desktop/WebpackFundamentalsCourse/index.html

instead of the http protocal, to use the http protocal we will need to serve the files via a server, we need to install the webpack dev server to do this:

1) install the webpack dev server:

======
npm install webpack-dev-server -g 
======

2) from withing the project directory run:

=====
webpack-dev-server
=====

you will notice that the webpack server actually executed the webpack bundle.js creation.

3) Now we can change the url to: http://localhost:8080/ we can also use: http://localhost:8080/webpack-dev-server/ this will display a status bar on top of the page, the server also
has a hot relod feature, this means you don't have to hit the reload button to see the changes, but it won't open the broweser for you.

Remember webpack will automatically bundle all js files that are required/imported to app.js, and if other files are required in other files related to app.js those will be required as well
but if there is a file that has no require statemnt or import statement then we have to explicitly mention it in the webpack config file as an array value under the entry key, like this:

======
module.exports = {
	entry: ["./utils", "./app.js"],
	output: {
		filename: "bundle.js"
	},
	watch: true
}
======

LOADERS FOR TRANSPILING ES6 TO ES5 AND LINTING:
===========================================================================
===========================================================================

With loaders we can process files and change them into something else, for example we can use webpack loaders to change es6 files into es5, and we can also use jshint
to look for errors in our files without changing them, jshint will just inform us about the errors.

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

1) change the login.js file to an es6 file by renaming it to login.es6 and put this code in it:

======
let login = (username, password) => {
    if(username !== 'admin' || password !=='radical') {
        console.log('incorrect password');
    }
};

login('admin', 'wrongpass');
======

2) open the webpack config file and edit it as follows:

======
module.exports = {
	entry: ["./utils", "./app.js"],
	output: {
		filename: "bundle.js"
	},
	watch: true,
	module: {
		loaders: [
			{
				test: /\.es6$/, //tests what kind of files to run/use through this loader
				exclude: /node_modules/, //here we specify which files to exclude
				loader: "babel-loader" //here we specifiy which loader we will user, from the package.json file
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.es6']
	}//here we specify which files we want to process without specifically giving them a file extension, by default 
	//webpack will assume all files not having an extension are js files, but here we tell webpack if it comes accross a file with no extensions also try these as well.
}
======

3) run the webpack dev server by typing: "webpack-dev-server"

Now to use our preloaders for linting:
======================================

preloaders run before the loader.




