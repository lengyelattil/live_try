flockwave-web
=============

This is the official web frontend for the Flockwave server.

Steps to install
----------------

1. Install Node.js and `npm` (the Node.js Package Manager); see the
   instructions [here](https://docs.npmjs.com/getting-started/installing-node).
   If you are on Ubuntu Linux, it is probably enough to run `sudo apt-get
   install nodejs npm`; see also
   [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server).
   If you are running Windows, you should probably download installer from
   [here](https://nodejs.org/en/download/) that contains both.

2. Install [Babel.js](http://babeljs.io/): `npm install -g babel-cli`. This
   will install the command line interface of Babel _globally_; we need that
   because some JavaScript modules that we check out from Github need a global
   installation of Babel.

3. Install all the dependencies of `flockwave-web` by running `npm install`
   from a fresh checkout of the repository. Note for windows: you have to use
   `git-shell` or `power-shell` for the command above to run properly,
   as standard `cmd` cannot execute git.

4. Place a `production.js` file (or if you'd like,
   you can specify other names via the environmental variable `NODE_ENV`)
   into the `config` folder based on the `production.js.sample` format,
   and include your Bing Maps API key inside it.

5. Start a development web server with `npm start` inside `flockwave-web`.

6. Navigate to http://localhost:8080 from your browser.

ps.: OpenLayers versions above and including 3.19.0 have issues with closing polygons, so until that is fixed we stick to 3.18.2.
