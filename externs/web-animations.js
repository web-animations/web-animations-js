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
 * @fileoverview Basic externs for the Web Animations API. This is not
 * nessecarily exhaustive. For more information, see the spec-
 *   https://w3c.github.io/web-animations
 * @externs
 */


/**
 * @param {!Array<!Object>} frames
 * @param {(number|KeyframeAnimationOptions)=} options
 * @return {!Animation}
 */
Element.prototype.animate = function(frames, options) {};

/**
 * @return {!Array<!Animation>}
 */
Element.prototype.getAnimations = function() {};


/**
 * @constructor
 * @param {AnimationEffectReadOnly=} effect
 * @param {AnimationTimeline=} timeline
 * @implements {EventTarget}
 */
var Animation = function(effect, timeline) {};

/** @override */
Animation.prototype.addEventListener = function(type, listener, options) {};

/** @override */
Animation.prototype.removeEventListener = function(type, listener, options) {};

/** @override */
Animation.prototype.dispatchEvent = function(evt) {};

/**
 * @return {undefined}
 */
Animation.prototype.cancel = function() {};

/**
 * @return {undefined}
 */
Animation.prototype.finish = function() {};

/**
 * @return {undefined}
 */
Animation.prototype.pause = function() {};

/**
 * @return {undefined}
 */
Animation.prototype.play = function() {};

/**
 * @return {undefined}
 */
Animation.prototype.reverse = function() {};

/** @type {number} */
Animation.prototype.currentTime;

/** @type {AnimationEffectReadOnly} */
Animation.prototype.effect;

/** @type {!Promise<void>} */
Animation.prototype.finished;

/** @type {string} */
Animation.prototype.id;

/** @type {?function(!Event)} */
Animation.prototype.oncancel;

/** @type {?function(!Event)} */
Animation.prototype.onfinish;

/** @type {number} */
Animation.prototype.playbackRate;

/** @type {string} */
Animation.prototype.playState;

/** @type {!Promise<void>} */
Animation.prototype.ready;

/** @type {number} */
Animation.prototype.startTime;

/** @type {!AnimationTimeline} */
Animation.prototype.timeline;


/**
 * @interface
 */
var AnimationEffectReadOnly = function() {};

/**
 * @return {!ComputedTimingProperties}
 */
AnimationEffectReadOnly.prototype.getComputedTiming = function() {};

/** @type {!AnimationEffectTiming} */
AnimationEffectReadOnly.prototype.timing;


/**
 * @constructor
 * @param {Element} target
 * @param {(!Array<!Object<string, *>>|!Object<string, !Array<*>>)} frames
 * @param {(number|AnimationEffectTimingProperties)=} options
 * @implements {AnimationEffectReadOnly}
 */
var KeyframeEffectReadOnly = function(target, frames, options) {};

/** @override */
KeyframeEffectReadOnly.prototype.getComputedTiming = function() {};

/** @override */
KeyframeEffectReadOnly.prototype.timing;


/**
 * @constructor
 * @param {Element} target
 * @param {(!Array<!Object<string, *>>|!Object<string, !Array<*>>)} frames
 * @param {(number|AnimationEffectTimingProperties)=} options
 * @extends {KeyframeEffectReadOnly}
 */
var KeyframeEffect = function(target, frames, options) {};


/**
 * @record
 */
var AnimationEffectTimingProperties;

/** @type {number|undefined} */
AnimationEffectTimingProperties.prototype.delay;

/** @type {number|undefined} */
AnimationEffectTimingProperties.prototype.endDelay;

/** @type {string|undefined} */
AnimationEffectTimingProperties.prototype.fill;

/** @type {number|undefined} */
AnimationEffectTimingProperties.prototype.iterationStart;

/** @type {number|undefined} */
AnimationEffectTimingProperties.prototype.iterations;

/** @type {number|string|undefined} */
AnimationEffectTimingProperties.prototype.duration;

/** @type {string|undefined} */
AnimationEffectTimingProperties.prototype.direction;

/** @type {string|undefined} */
AnimationEffectTimingProperties.prototype.easing;


/**
 * @record
 * @extends {AnimationEffectTimingProperties}
 */
var KeyframeAnimationOptions;

/** @type {string|undefined} */
KeyframeAnimationOptions.prototype.id;


/**
 * @record
 * @extends {AnimationEffectTimingProperties}
 */
var ComputedTimingProperties;

/** @type {number} */
ComputedTimingProperties.prototype.endTime;

/** @type {number} */
ComputedTimingProperties.prototype.activeDuration;

/** @type {?number} */
ComputedTimingProperties.prototype.localTime;

/** @type {?number} */
ComputedTimingProperties.prototype.progress;

/** @type {?number} */
ComputedTimingProperties.prototype.currentIteration;


/**
 * @interface
 */
var AnimationEffectTimingReadOnly = function() {}

/** @type {number} */
AnimationEffectTimingReadOnly.prototype.delay;

/** @type {number} */
AnimationEffectTimingReadOnly.prototype.endDelay;

/** @type {string} */
AnimationEffectTimingReadOnly.prototype.fill;

/** @type {number} */
AnimationEffectTimingReadOnly.prototype.iterationStart;

/** @type {number} */
AnimationEffectTimingReadOnly.prototype.iterations;

/** @type {number|string} */
AnimationEffectTimingReadOnly.prototype.duration;

/** @type {string} */
AnimationEffectTimingReadOnly.prototype.direction;

/** @type {string} */
AnimationEffectTimingReadOnly.prototype.easing;


/**
 * @interface
 * @extends {AnimationEffectTimingReadOnly}
 */
var AnimationEffectTiming = function() {};


/**
 * @interface
 */
var AnimationTimeline = function() {};

/** @type {?number} */
AnimationTimeline.prototype.currentTime;


/**
 * @constructor
 * @implements {AnimationTimeline}
 */
var DocumentTimeline = function() {};

/** @override */
DocumentTimeline.prototype.currentTime;


/** @type {!DocumentTimeline} */
Document.prototype.timeline;

