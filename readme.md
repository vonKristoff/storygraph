#js-state-machine

### Package Module into CJS Format
This can now be included in another `rollup` built bundle.  
Work on `es6/package.js`, and create with..
    
    npm run package

### Testing bundle
Work in `js/main` as usual

    npm start

---

### notes
* Uses `rollup` where most `commonjs` modules from `npm` will work, there may still need to be some tweaking.
* `ENV variables` are available, see `npm run production` and in `js/main.js`. Also `rollup.config.js` detects `ENV` and `uglifies` where applicable.
* [eslint](http://eslint.org/docs/user-guide/configuring) check the manual for any issues with ES6

---
