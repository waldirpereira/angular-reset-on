<p align="center">
    <a href="https://github.com/waldirpereira/angular-reset-on">
        <h1>ng-reset-on</h1>
    </a>
    <br>
    <strong>Reset a field when the given condition is true.</strong>
</p>


<p align="center">
    <a href="https://travis-ci.org/waldirpereira/angular-reset-on.svg">
        <img src="https://travis-ci.org/waldirpereira/angular-reset-on.svg?branch=master"
             alt="Travis">
    </a>
    <a href="https://david-dm.org/joeblau/gitignore.io">
        <img src="https://img.shields.io/david/joeblau/gitignore.io.svg"
             alt="David">
    </a>
    <a href="https://david-dm.org/joeblau/gitignore.io#info=devDependencies">
        <img src="https://img.shields.io/david/dev/joeblau/gitignore.io.svg"
             alt="David">
    </a>
    <img src="https://img.shields.io/badge/Platforms-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey.svg"
          alt="Platforms">
    <a href="https://github.com/joeblau/gitignore.io/blob/master/LICENSE.md">
        <img src="https://img.shields.io/github/license/joeblau/gitignore.io.svg"
             alt="license">
    </a>
</p>

# angular-reset-on directive
Reset a field when the given condition is true.

# Installation

Just import the `angular-reset-on.js` file.

# Usage

You must include the module as a dependency of yours, something like:

```Javascript
angular.module('myModule', ['ng-reset-on'])
```

# Example

**HTML**

```HTML
<body ng-app="myModule">
    <div ng-controller="Ctrl">
        <input type="text" ng-reset-on="someField == 1" />
    </div>
</body>
```

# PLNKR

  * https://plnkr.co/BDr93NlKohXRjaGisdkF
