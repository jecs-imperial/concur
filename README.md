# Concur

An implementation of the Concur algorithm.

## Installation

You can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/jecs-imperial/concur.git

...and then install the necessary modules with npm from within the project's root directory:

    npm install

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Running the tests

This can be done from the root of the repository:

    ./node_modules/.bin/mocha --recursive -R spec ./test

## Contact

- james.smith@openmathematics.org
- http://djalbat.com
