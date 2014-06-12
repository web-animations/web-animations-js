// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

(function(scope, testing) {

  // Configures an accessor descriptor for use with Object.defineProperty() to
  // allow the property to be changed and enumerated, to match __defineGetter__()
  // and __defineSetter__().
  var configureDescriptor = function(descriptor) {
    descriptor.configurable = true;
    descriptor.enumerable = true;
    return descriptor;
  };

  var cssStyleDeclarationAttribute = {
    cssText: true,
    length: true,
    parentRule: true,
    'var': true
  };

  var cssStyleDeclarationMethodModifiesStyle = {
    getPropertyValue: false,
    getPropertyCSSValue: false,
    removeProperty: true,
    getPropertyPriority: false,
    setProperty: true,
    item: false
  };

  var copyInlineStyle = function(sourceStyle, destinationStyle) {
    for (var i = 0; i < sourceStyle.length; i++) {
      var property = sourceStyle[i];
      destinationStyle[property] = sourceStyle[property];
    }
  };

  /** @constructor */
  var AnimatedCSSStyleDeclaration = function(element) {
    // ASSERT_ENABLED && assert(
    //     !(element.style instanceof AnimatedCSSStyleDeclaration),
    //     'Element must not already have an animated style attached.');

    // Stores the inline style of the element on its behalf while the
    // polyfill uses the element's inline style to simulate web animations.
    // This is needed to fake regular inline style CSSOM access on the element.
    this._surrogateElement = document.createElement('div');
    this._style = element.style;
    this._length = 0;
    this._isAnimatedProperty = {};

    // Populate the surrogate element's inline style.
    copyInlineStyle(this._style, this._surrogateElement.style);
    this._updateIndices();
  };

  AnimatedCSSStyleDeclaration.prototype = {
    get cssText() {
      return this._surrogateElement.style.cssText;
    },
    set cssText(text) {
      var isAffectedProperty = {};
      for (var i = 0; i < this._surrogateElement.style.length; i++) {
        isAffectedProperty[this._surrogateElement.style[i]] = true;
      }
      this._surrogateElement.style.cssText = text;
      this._updateIndices();
      for (var i = 0; i < this._surrogateElement.style.length; i++) {
        isAffectedProperty[this._surrogateElement.style[i]] = true;
      }
      for (var property in isAffectedProperty) {
        if (!this._isAnimatedProperty[property]) {
          this._style.setProperty(property,
              this._surrogateElement.style.getPropertyValue(property));
        }
      }
    },
    get length() {
      return this._surrogateElement.style.length;
    },
    get parentRule() {
      return this._style.parentRule;
    },
    get 'var'() {
      return this._style.var;
    },
    _updateIndices: function() {
      while (this._length < this._surrogateElement.style.length) {
        Object.defineProperty(this, this._length, {
          configurable: true,
          enumerable: false,
          get: (function(index) {
            return function() {
              return this._surrogateElement.style[index];
            };
          })(this._length)
        });
        this._length++;
      }
      while (this._length > this._surrogateElement.style.length) {
        this._length--;
        Object.defineProperty(this, this._length, {
          configurable: true,
          enumerable: false,
          value: undefined
        });
      }
    },
    _clearAnimatedProperty: function(property) {
      this._style[property] = this._surrogateElement.style[property];
      this._isAnimatedProperty[property] = false;
    },
    _setAnimatedProperty: function(property, value) {
      this._style[property] = value;
      this._isAnimatedProperty[property] = true;
    }
  };

  for (var method in cssStyleDeclarationMethodModifiesStyle) {
    AnimatedCSSStyleDeclaration.prototype[method] =
        (function(method, modifiesStyle) {
      return function() {
        var result = this._surrogateElement.style[method].apply(
            this._surrogateElement.style, arguments);
        if (modifiesStyle) {
          if (!this._isAnimatedProperty[arguments[0]]) {
            this._style[method].apply(this._style, arguments);
          }
          this._updateIndices();
        }
        return result;
      }
    })(method, cssStyleDeclarationMethodModifiesStyle[method]);
  }

  for (var property in document.documentElement.style) {
    if (cssStyleDeclarationAttribute[property] ||
        property in cssStyleDeclarationMethodModifiesStyle) {
      continue;
    }
    (function(property) {
      Object.defineProperty(AnimatedCSSStyleDeclaration.prototype, property,
          configureDescriptor({
            get: function() {
              return this._surrogateElement.style[property];
            },
            set: function(value) {
              this._surrogateElement.style[property] = value;
              this._updateIndices();
              if (!this._isAnimatedProperty[property]) {
                this._style[property] = value;
              }
            }
          }));
    })(property);
  }

  // This function is a fallback for when we can't replace an element's style with
  // AnimatatedCSSStyleDeclaration and must patch the existing style to behave
  // in a similar way.
  // Only the methods listed in cssStyleDeclarationMethodModifiesStyle will
  // be patched to behave in the same manner as a native implementation,
  // getter properties like style.left or style[0] will be tainted by the
  // polyfill's animation engine.
  var patchInlineStyleForAnimation = function(style) {
    var surrogateElement = document.createElement('div');
    copyInlineStyle(style, surrogateElement.style);
    var isAnimatedProperty = {};
    for (var method in cssStyleDeclarationMethodModifiesStyle) {
      if (!(method in style)) {
        continue;
      }
      Object.defineProperty(style, method, configureDescriptor({
        value: (function(method, originalMethod, modifiesStyle) {
          return function() {
            var result = surrogateElement.style[method].apply(
                surrogateElement.style, arguments);
            if (modifiesStyle) {
              if (!isAnimatedProperty[arguments[0]]) {
                originalMethod.apply(style, arguments);
              }
            }
            return result;
          }
        })(method, style[method], cssStyleDeclarationMethodModifiesStyle[method])
      }));
    }

    style._clearAnimatedProperty = function(property) {
      this[property] = surrogateElement.style[property];
      isAnimatedProperty[property] = false;
    };

    style._setAnimatedProperty = function(property, value) {
      this[property] = value;
      isAnimatedProperty[property] = true;
    };
  };

  function ensureStyleIsPatched(element) {
    if (element.style._webAnimationsStyleInitialised) {
      return;
    }
    try {
      var animatedStyle = new AnimatedCSSStyleDeclaration(element);
      Object.defineProperty(element, 'style', configureDescriptor({
        get: function() { return animatedStyle; }
      }));
    } catch (error) {
      patchInlineStyleForAnimation(element.style);
    }
    element.style._webAnimationsStyleInitialised = true;
  }

  scope.apply = function(element, property, value) {
    ensureStyleIsPatched(element);
    element.style._setAnimatedProperty(property, value);
  };

  scope.clear = function(element, property) {
    ensureStyleIsPatched(element);
    element.style._clearAnimatedProperty(property);
  };

})(webAnimations, testing);
