# Concur Algorithm

An implementation of the Concur algorithm.

There is a paper describing the algorithm which is (as they say) by no means inaccessible to the non-specialist:

* [The First Correct Concurrency Control Algorithm](http://djalbat.com/TFCCCA.pdf)

## Installation

With [npm](https://www.npmjs.com/):

    npm install concur-algorithm

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/jecs-imperial/concur-algorithm.git

...and then install the necessary modules with npm from within the project's root directory:

    npm install

You will need to do this if you want to look at the example.

## Usage

```js
const concur = require('concur-algorithm'),    ///
      { generateOperations, transformContent } = concur;
```

Not all of the functionality required to implement the algorithm is exported by the package. If you want to see a full implementation, albeit a basic one, the only place to start is the example.

## Example

Once you have cloned the repository, the example server can be run with the following command:

    node ./bin/example.js

When the server is running the example client will be available at `http://localhost:8888/example.html`. To try out the algorithm you might want to open several browser tabs or windows with this URL. You can also increase the latency in most browser's developer tools.

For a closer look at the example server and client implementations, see the `example.js` files in `bin` and `es6` directories, respectively.

The server implementation is straightforward and should present no challenges to anyone familiar with [Express](https://expressjs.com/). To make use of the algorithm in your own server, you should replace the topmost `require('../index')` directive with `require('concur-algorithm')`. Note that the URIs are exported alongside the handlers and must be used as-is, because they are utilised by the client.

The client implementation is necessarily more complex. It must handle user interactions, for which it sets up a dedicated textarea, and scheduling. A document is created from the textarea that implements the requisite functionality to get and set its content, and this is passed to an 'agent' that handles scheduling and communication with the server. All of this apparatus obscures the working of the operational transformations and recursive function to transform sequences of operations somewhat, but bear in mind that this layer is also a part of the algorithm.
```

## Running the tests

This can be done from the root of the repository:

    ./node_modules/.bin/mocha --recursive -R spec ./test

As of writing the tests cover the operational transformations and rescursive function to transform sequences of operations, but no much else.

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Contact

- james.smith@openmathematics.org
- http://djalbat.com
