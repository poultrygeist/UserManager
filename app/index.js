import "./modules/userGrid/userGridDirective.js";

import userGridDirective from "./modules/userGrid/userGridDirective.js";

angular.module('UserManager', [])
    .directive("userGrid", userGridDirective);