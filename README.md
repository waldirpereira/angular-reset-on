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
