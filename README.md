# Concur Algorithm

An implementation of the Concur algorithm.

There is a paper describing the algorithm which is (as they say) by no means inaccessible to the non-specialist:

* [The First Correct Concurrency Control Algorithm](http://djalbat.com/TFCCCA.pdf)

The example includes a basic implementation of the algorithm.

## Installation

With [npm](https://www.npmjs.com/):

    npm install concur-algorithm

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/jecs-imperial/concur-algorithm.git

...and then install the necessary modules with npm from within the project's root directory:

    npm install

You will need to do this if you want to look at the example.

## Example

This includes a basic implementation of the algorithm. Once you have cloned the repository, the server can be run with the following command:

    node ./bin/example.js

Once the server is running, launch a browser and the client will be available at `http://localhost:8888/example.html`.

## Usage

    const concur = require('concur-algorithm'),    ///
          { generateOperations, transformContent } = concur;

Not all the functionality required to implement the algorithm is exported by the package. If you want to implement the algorithm fully, the only place to start is the example.

## Running the tests

This can be done from the root of the repository:

    ./node_modules/.bin/mocha --recursive -R spec ./test

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Contact

- james.smith@openmathematics.org
- http://djalbat.com
