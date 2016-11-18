<p align="center">
    <h1><a href="https://github.com/waldirpereira/angular-reset-on">ng-reset-on</a> directive</h1>
    <strong>Reset a field when the given condition is true.</strong>
</p>


<p align="center">
    <a href="https://travis-ci.org/waldirpereira/angular-reset-on.svg"><img src="https://travis-ci.org/waldirpereira/angular-reset-on.svg?branch=master"
      alt="Travis"></a>
    <a href="https://raw.githubusercontent.com/waldirpereira/angular-reset-on/master/LICENSE.md"><img src="https://img.shields.io/github/license/waldirpereira/angular-reset-on.svg"
      alt="license"></a>
    <a href='https://www.versioneye.com/user/projects/582f2dcfc8dd3300448f9ec5'><img src='https://www.versioneye.com/user/projects/582f2dcfc8dd3300448f9ec5/badge.svg?style=flat-square' 
      alt="Dependency Status" /></a>
    <a href='https://coveralls.io/github/waldirpereira/angular-reset-on?branch=master'><img src='https://coveralls.io/repos/github/waldirpereira/angular-reset-on/badge.svg?branch=master' 
      alt='Coverage Status' /></a>
    <a href="https://github.com/waldirpereira/angular-reset-on/issues"><img src="https://img.shields.io/github/issues/waldirpereira/angular-reset-on.svg"
      alt="license"></a>
</p>

# Demo

Just visit https://waldirpereira.github.io/angular-reset-on/example!

# Installation

#### Install with Bower
```sh
$ bower install angular-reset-on
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
        <input type="text" ng-reset-on="someField == 1" />
    </div>
</body>
```
