Todo application demonstrating use of:
	- [Riot](https://muut.com/riotjs/) UI library
	- [Lupin](https://github.com/shader/lupin/) state and event system
	- [Immutable](http://facebook.github.io/immutable-js/) state manager

- Written in ES6.
- Compiled using [babel](http://babeljs.io/).
- Bundled with [Webpack](http://webpack.github.io/).
- Uses browser LocalStorage for persistence.


## Building and Running
The app is developed and built in a node/npm environment. To install
and run:

1. Make sure you have node and npm installed.

2. Clone the Github repo:

        git clone https://github.com/samchristie/lupinExample.git

3. Install npm dependencies:

        cd lupinExample
        npm install

4. Build the app `build/bundle.js` bundle:

        webpack

5. Open the page

	file:<path>/dist

