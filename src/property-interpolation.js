// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.

(function(scope, testing) {

  var propertyHandlers = {};

  function addPropertiesHandler(handler, properties) {
    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
      propertyHandlers[property] = propertyHandlers[property] || [];
      propertyHandlers[property].push(handler);
    }
  }
  scope.addPropertiesHandler = addPropertiesHandler;

  function propertyInterpolation(property, left, right) {
    var handlers = propertyHandlers[property];
    for (var i = 0; handlers && i < handlers.length; i++) {
      var interpolation = handlers[i](left, right);
      if (interpolation)
        return interpolation;
    }
    return scope.Interpolation(false, true, function(bool) {
      return bool ? right : left;
    });
  }
  scope.propertyInterpolation = propertyInterpolation;

})(webAnimations, testing);

