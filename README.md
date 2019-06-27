# FHCookieGuard

This library provides a cookie notification in which the user can accept or decline the usage of cookies on the website.
When accepting it will load guarded scripts in meta tags.

## Features

* Options for cookie name, expire days, callback etc.
* Transform data-content attribute to working script tag
* Exclude cookie message on certain pages
* Option to auto accept cookies after x requests
* Ready to use sass styling components for a variation of cookie notifications and popups
* Ready to use twig example to be used with styling

## Documentation

- [Installation](doc/installation.md)
- [Usage](doc/usage.md)
- [Configuration](doc/configuration.md)

## Browser support

This library supports the latest 2 versions of all modern browsers. But support can be extended by converting code to ES5 and using some polyfills.
- ~~IE11 convert ES2015 code to ES5 with webpack or another bundler~~ Still using ES5 build for now due to import issues in webpack with babel
- IE10 support by adding element.dataset polyfill

## Roadmap

* Add cookie groups that can be accepted or refused, eg. Functional / Analitic / Advertorial / Social cookies
