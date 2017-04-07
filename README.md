<p align="center">
    <h1><a href="https://waldirpereira.github.io/angular-reset-on">ng-reset-on</a> directive</h1>
    <strong>Resets a field to its initial value (or cleans) when given scope expression is true.</strong>
</p>

<p align="center">
    <a href="https://travis-ci.org/waldirpereira/angular-reset-on"><img src="https://travis-ci.org/waldirpereira/angular-reset-on.svg?branch=master"
      alt="Build Status"></a>
    <a href='https://www.versioneye.com/user/projects/582f2dcfc8dd3300448f9ec5'><img src='https://www.versioneye.com/user/projects/582f2dcfc8dd3300448f9ec5/badge.svg?style=flat' 
      alt="Dependency Status" /></a>
    <a href='https://coveralls.io/github/waldirpereira/angular-reset-on?branch=master'><img src='https://coveralls.io/repos/github/waldirpereira/angular-reset-on/badge.svg?branch=master' 
      alt='Coverage Status' /></a>
    <a href="https://github.com/waldirpereira/angular-reset-on/issues"><img src="https://img.shields.io/github/issues/waldirpereira/angular-reset-on.svg"
      alt="Open Issues"></a>
    <a href="https://raw.githubusercontent.com/waldirpereira/angular-reset-on/master/LICENSE.md"><img src="https://img.shields.io/github/license/waldirpereira/angular-reset-on.svg"
      alt="License"></a>
</p>

# Demo

Just visit https://waldirpereira.github.io/angular-reset-on/example!

# Installation

#### Install with Bower
```sh
$ bower install angular-reset-on
```

#### Install with NPM
```sh
$ npm install angular-reset-on
```

#### Manual download

Just import the `angular-reset-on.js` file on `dist` directory to your project.

# Usage

You must include the module as a dependency of yours, something like:

#### .js
```Javascript
angular.module('myModule', ['ng-reset-on'])
```

#### .html
```HTML
<body ng-app="myModule">
    <div ng-controller="Ctrl">
        <input type="text" ng-model="thisField" ng-reset-on="anotherField === 1" mode="reset" />
    </div>
</body>
```

#### Options
 - `ng-reset-on`:  AngularJS expression (*required*)
 - `mode`: (default: `clean`)
   - `reset`: resets the field to its initial value
   - `clean`: cleans the field

# Changelog

See [CHANGELOG.md](https://github.com/waldirpereira/angular-reset-on/blob/master/CHANGELOG.md)

# Contribution
 - Using [Gulp](http://gulpjs.com) as build tool
 - Uses [jasmine 2.5.2](http://jasmine.github.io) in writing unit test specs
 - `gulp` to build the project
 - `gulp test` to run unit tests
 - Update `README.md` and `CHANGELOG.md` to reflect the new changes
 - Update the version number of `package.json` and `bower.json`
