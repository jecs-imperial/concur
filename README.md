# Concur Algorithm

An implementation of the Concur algorithm.

There is a paper describing the algorithm which is (as they say) by no means inaccessible to the non-specialist:

* [The First Correct Concurrency Control Algorithm](http://djalbat.com/TFCCCA.pdf)

## Installation

With [npm](https://www.npmjs.com/):

    npm install concur-algorithm

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/concur-algorithm.git

...and then install the necessary modules with npm from within the project's root directory:

    npm install

You can also run a development server, see the section on building later on.

## Usage

The two functions that implement the algorithm's core functionality are the `generateOperations(...)` and `transformContent(...)` functions:

```
import { generateOperations, transformContent } from "concur-algorithm";

...
```

Bear in mind that not all of the functionality required for a working algorithm is exported by the package. If you want to see a full implementation, albeit a basic one, the only place to start is the example. For a closer look at the server and client implementations, see the `bin/main.js` and `es6/example.js` files, respectively.

## The example

Once you have cloned the repository, the example server can be run with the following command:

    npm start

When the server is up and running, the client will be available at `http://localhost:8888/`. To try it out you might want to open several browser tabs or windows with this URL. You can also increase the latency in some browser developer tools.

The server implementation is straightforward and should present no challenges to anyone familiar with [Express](https://expressjs.com/). On the other hand, the client implementation is necessarily more complex. It must handle user interactions, for which it sets up a dedicated textarea, as well as scheduling. A document is created from the textarea that implements the requisite functionality to get and set the textarea's content. The document is then passed in turn to an agent that handles scheduling and communication with the server. All of this apparatus obscures the working of the operational transformations and recursive function to transform sequences of operations somewhat, but bear in mind that such a layer is an essential part of any working algorithm.

The implementation supports only one anonymous session per server instance and only one document within that session. If you want to write a client and a server to support multiple sessions and documents, you will need to abandon this implementation for the most part and use it for guidance only.

## Running the tests

This can be done from the root of the repository with the following command:

    npm test

As of writing the tests cover the operational transformations and recursive function to transform sequences of operations, but not much else.

## Building

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Contact

- james.smith@djalbat.com
