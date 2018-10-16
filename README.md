# Concur Algorithm

An implementation of the Concur algorithm.

There is a paper describing the algorithm which is (as they say) by no means inaccessible to the non-specialist:

* [The First Correct Concurrency Control Algorithm](http://djalbat.com/TFCCCA.pdf)

To summarise, the algorithm makes the following contributions:

1. It includes a set of comprehensive stringwise operational transformations,
2. has a recursive function that composes these transformations and is guaranteed to terminate,
3. includes a protocol that makes use of this recursive function and
4. can handle an arbitrary number of users and any amount of latency.

## Installation

With [npm](https://www.npmjs.com/):

    npm install concur-algorithm

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/jecs-imperial/concur-algorithm.git

...and then install the necessary modules with npm from within the project's root directory:

    npm install

You will need to do this if you want to look at the example.

## Example

This encompasses a basic implementation of the algorithm. If you have cloned the repository, it can be run with the following command:

    node ./bin/example.js

Once the server is running, launch a browser and the client will be available at `http://localhost:8888`.

## Usage

    const concur = require('concur-algorithm'),    ///
          { generateOperations, transformContent } = concur;

Not all the functionality required to implement the algorithm is exported by the package. If you want to implement the algorithm the only place to start is the example.

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
