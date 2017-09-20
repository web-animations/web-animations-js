/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * @fileoverview Externs for the Web Animations API (Level 2 / Groups).
 *
 * This defines externs for the "-next" version of the Web Animations API
 * polyfill found online at:
 *    https://github.com/web-animations/web-animations.js
 *
 * These features are NOT natively implemented in browsers and are not clearly
 * part of the official spec. This is NOT intended to be exhaustive, and
 * requires the base externs from web-animations.js.
 *
 * @externs
 */


/** @type {Element} */
KeyframeEffectReadOnly.prototype.target;

/** @type {?function(number, !KeyframeEffect, !Animation)|undefined} */
KeyframeEffectReadOnly.prototype.onsample;


/**
 * @param {!AnimationEffectReadOnly} effect
 * @return {!Animation}
 */
DocumentTimeline.prototype.play = function(effect) {};

/**
 * @return {!Array<!Animation>}
 */
DocumentTimeline.prototype.getAnimations = function() {};


/**
 * @param {!Array<!AnimationEffectReadOnly>} children
 * @param {AnimationEffectTimingProperties=} timing
 * @constructor
 * @implements {AnimationEffectReadOnly}
 */
var SequenceEffect = function(children, timing) {};

/** @override */
SequenceEffect.prototype.getComputedTiming = function() {};

/** @override */
SequenceEffect.prototype.timing;

/** @type {!Array<!AnimationEffectReadOnly>} */
SequenceEffect.prototype.children;


/**
 * @param {!Array<!AnimationEffectReadOnly>} children
 * @param {AnimationEffectTimingProperties=} timing
 * @constructor
 * @implements {AnimationEffectReadOnly}
 */
var GroupEffect = function(children, timing) {};

/** @override */
GroupEffect.prototype.getComputedTiming = function() {};

/** @override */
GroupEffect.prototype.timing;

/** @type {!Array<!AnimationEffectReadOnly>} */
GroupEffect.prototype.children;
