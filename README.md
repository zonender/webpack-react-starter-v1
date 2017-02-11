
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


HANDLING CSS WITH WEBPACK (ADDING CSS LOADERS AND INJECTING CSS INSIDE BUNDLE.JS):
===========================================================================
===========================================================================

1) create the file image_viewer.js in the src folder with this code:

======
const image = document.createElement('img');

image.src = 'http://lorempixel.com/400/400'
document.body.appendChild(image);
======

This will display a random image on the screen.

2) Import the image viewer into the index.js file:

======
import sum from './sum';
import './image_viewer'; //we use this from of import when the code we are importing is not 
//producing/returning any value, the image viewr is just generating an image tag in the dom
//also if we do not import this file it will not be executed.

const total = sum(5, 15);

const totaltext = document.createElement('p');
totaltext.innerText = 'The total is:' + total
document.body.appendChild(totaltext);
======

3) Adding css to the image, a red border, we do this by creating the file called image_viewer.css under a folder called styles under the src dir, in the file
put this code:

======
img {
    border: 10px solid red;
}
======

4) now import the newly create css file into the image_viewer.js file like this:

======
import './styles/image_viewer.css';

const image = document.createElement('img');

image.src = 'http://lorempixel.com/400/400'
document.body.appendChild(image);
======

5) now we have to install the css-loaders to teach webpack how to process and read css files and the style-loader so that webpack is able to inject them into the html files:

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
        use: ['style-loader', 'css-loader'], //here the order matters loaders on the right will run first
        test: /\.css$/ //now any css file will be processed with both css and style loader
      }
    ]
  },
  watch: false
};
======

Webpack using css-loader and style-loader has included/injected the style inside the head tag of the index.html, the way it does this is as follows:

The css-loader takes the css code and puts it inside bundle.js and then the style-loader adds its own code to the bundle.js file that injects the css to the dom.

If you don't like this approach you can take another approach and let the loader creeate a separate css file instead of including it in the bundle.js file

4) run: npm run build

5) run: webpack-dev-server

HANDLING CSS WITH WEBPACK (ADDING CSS LOADERS AND CREATING A SEPARATE CSS FILE (FASTER)):
===========================================================================
===========================================================================

1) First we need to add the library called "extract-text-webpack-plugin": 

======
npm install extract-text-webpack-plugin --save-dev
======

if the latest version doesn't work use: npm install extract-text-webpack-plugin@2.0.0-beta.4 --save-dev

or: npm install npm install extract-text-webpack-plugin@^2.0.0-beta --save-dev (This worked for me)

2) we have to include the plugin/library inside the webpack config file, we will also rewrite the config file in ES6 module, the extract-text-webpack-plugin requires 
we fall back to the legacy "loader" key/property instead of the "use" key, in webpack loaders are used for preprocessing and file transforation before including them in the bundle.js file
while plugin usually do not include files in the bundle.js, the extract-text-webpack-plugin will grap any css file produced by the css-loader and insert it into the style.css file:

======
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
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
        loader: ExtractTextPlugin.extract ({
          loader: 'css-loader'
        }),
        test: /\.css$/ //now any css file will be processed with both css and style loader
      }
    ]
  },
  plugins: [
      new ExtractTextPlugin('style.css') // this will grap any css file produced by the css-loader and inserted into the style.css file
    ]
};

module.exports = config;
======

3) run:

======
npm run build
======

to create the build and the style.css file.

4) Add a link tag in the index.html file, to reference the style.css file:

======
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="build/style.css"></link>
    <meta charset="UTF-8">
    <title>Upstar Music</title>
  </head>
  <body>
    <p>Hello Webpack!!!</p>
    <div id="root"></div>
  </body>
  <script src="/build/bundle.js"></script>
</html>
======

HANDLING IMAGES WITH WEBPACK:
===========================================================================
===========================================================================

The image image_viewer is currently relying on an outside source for it's images, which makes it lag, we will now see how to handle images locally and include them in our build pipeline.

We will be using the image-webpack-loader, the loader will compress the image and include it in the bundle.js if it is small (smaller than 40000 bytes). and will output it to the build directory if the image is large.

1) Install the loaders:

======
npm install --save-dev image-webpack-loader url-loader
======

2) edit the webpack config by adding the loaders:

======
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
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
        loader: ExtractTextPlugin.extract ({
          loader: 'css-loader'
        }),
        test: /\.css$/ //now any css file will be processed with both css and style loader
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {limit: 40000}
          },
          'image-webpack-loader'
        ]
      } 
    ]
  },
  plugins: [
      new ExtractTextPlugin('style.css') // this will grap any css file produced by the css-loader and inserted into the style.css file
    ]
};

module.exports = config;
======

3) Download a small image from: http://lorempixel.com/200/200/ and a large image from http://lorempixel.com/1200/1200/ and save them to an assets directory
located in the root that you must create.

4) import these two images to the image_viewer.js file:

======
import big from '../assets/big.jpg'
import small from '../assets/small.jpg'
import './styles/image_viewer.css';

const image = document.createElement('img');

image.src = 'http://lorempixel.com/400/400'
document.body.appendChild(image);
======

5) run the build:

======
npm run build
======

You will notice that the large jpg file has been added in the build directory because it exceeds 40000 bytes, and if you open the bundle.js file 
and find the string: "data:image/jpeg;base64" you will notice that the image has been converted to a base64 string.

6) to use the images edit the image_viewer.js as follows:

======
import big from '../assets/big.jpg';
import small from '../assets/small.jpg';
import './styles/image_viewer.css';

const smallImage = document.createElement('img');
smallImage.src = small;
document.body.appendChild(smallImage);

const bigImage = document.createElement('img');
bigImage.src = big;
document.body.appendChild(bigImage);
======

7) add the public path property to the webpack config file:

======
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'build/'
  },
  module: {
    rules: [
      {
        use: 'babel-loader', //here we are selecting the loader 
        test: /\.js$/ //and here we specify which file the loader will process 
      },
      {
        loader: ExtractTextPlugin.extract ({
          loader: 'css-loader'
        }),
        test: /\.css$/ //now any css file will be processed with both css and style loader
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader'
        ]
      } 
    ]
  },
  plugins: [
      new ExtractTextPlugin('style.css') // this will grap any css file produced by the css-loader and inserted into the style.css file
    ]
};

module.exports = config;
======

8) run the build:

======
npm run build
======

9) run the webpack server:

======
webpack-dev-server
======
