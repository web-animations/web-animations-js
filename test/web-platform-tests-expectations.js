// Expectations to be used by karma-testharness-adapter.js.
module.exports = {
  skip: {
    'test/web-platform-tests/web-animations/interfaces/Animation/constructor.html':
        'KeyframeEffectReadOnly is not defined causing the test to timeout.',
  },

  flakyTestIndicator: 'FLAKY_TEST_RESULT',
  expectedFailures: {
    'test/web-platform-tests/web-animations/interfaces/Animatable/animate-basic.html': {
      'Element.animate() creates an Animation object':
          'assert_equals: Returned object is an Animation expected "[object Animation]" but got "[object Object]"',

      // Seems to be a bug in Firefox 47? The TypeError is thrown but disappears by the time it bubbles up to assert_throws().
      'Element.animate() does not accept property-indexed keyframes with an invalid easing value':
          'assert_throws: function "function () {\n"use strict";\n\n      div.animate(subtest.input, 2000);\n    }" did not throw',
    },

    'test/web-platform-tests/web-animations/interfaces/Animatable/animate-effect.html': {
      'Element.animate() accepts a double as an options argument':
          'assert_equals: expected "auto" but got "none"',

      'Element.animate() accepts a keyframe sequence where greater shorthand precedes lesser shorthand':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a keyframe sequence where lesser shorthand precedes greater shorthand':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a keyframe sequence where longhand precedes shorthand':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a keyframe sequence where shorthand precedes longhand':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a keyframe sequence with a CSS variable reference':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a keyframe sequence with a CSS variable reference in a shorthand property':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a keyframe sequence with different composite values, but the same composite value for a given offset':
          'add compositing is not supported',

      'Element.animate() accepts a keyframe sequence with different easing values, but the same easing value for a given offset':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a keyframe sequence with duplicate values for a given interior offset':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a keyframe sequence with duplicate values for offsets 0 and 1':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a keyframe sequence with repeated values at offset 1 with different easings':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a one property keyframe sequence with all omitted offsets':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a one property keyframe sequence with some omitted offsets':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a one property one keyframe sequence':
          'Partial keyframes are not supported',

      'Element.animate() accepts a one property one non-array value property-indexed keyframes specification':
          'Partial keyframes are not supported',

      'Element.animate() accepts a one property one value property-indexed keyframes specification':
          'Partial keyframes are not supported',

      'Element.animate() accepts a one property two keyframe sequence':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a one property two keyframe sequence that needs to stringify its values':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a one property two value property-indexed keyframes specification':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a one property two value property-indexed keyframes specification that needs to stringify its values':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a one property two value property-indexed keyframes specification where the first value is invalid':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a one property two value property-indexed keyframes specification where the second value is invalid':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a one shorthand property two keyframe sequence':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a one shorthand property two value property-indexed keyframes specification':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a property-indexed keyframes specification with a CSS variable reference':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a property-indexed keyframes specification with a CSS variable reference in a shorthand property':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a property-indexed keyframes specification with an invalid value':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a single keyframe sequence with omitted offsets':
          'Partial keyframes are not supported',

      'Element.animate() accepts a two property (a shorthand and one of its component longhands) two keyframe sequence':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a two property (one shorthand and one of its longhand components) two value property-indexed keyframes specification':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a two property four keyframe sequence':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a two property keyframe sequence where one property is missing from the first keyframe':
          'Partial keyframes are not supported',

      'Element.animate() accepts a two property keyframe sequence where one property is missing from the last keyframe':
          'Partial keyframes are not supported',

      'Element.animate() accepts a two property keyframe sequence with some omitted offsets':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a two property property-indexed keyframes specification with different numbers of values':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a two property two keyframe sequence':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts a two property two value property-indexed keyframes specification':
          'anim.effect.getKeyframes is not a function',

      'Element.animate() accepts an absent options argument':
          'assert_equals: expected (string) "auto" but got (number) 0',

      'Element.animate() creates an Animation object with a KeyframeEffect':
          'assert_equals: Returned Animation has a KeyframeEffect expected "[object KeyframeEffect]" but got "[object Object]"',
    },

    'test/web-platform-tests/web-animations/interfaces/Animatable/animate-pseudo-element.html': {
      'CSSPseudoElement.animate() creates an Animation object':
          'document.getAnimations is not a function',

      'CSSPseudoElement.animate() creates an Animation object targeting to the correct CSSPseudoElement object':
          'document.getAnimations is not a function',
    },

    'test/web-platform-tests/web-animations/interfaces/Animatable/animate-timeline.html': {
      'Element.animate() correctly sets the Animation\'s timeline when triggered on an element in a different document':
          'div.animate is not a function',
    },

    'test/web-platform-tests/web-animations/interfaces/Animation/cancel.html': {
      'Animated style is cleared after calling Animation.cancel()':
          'assert_not_equals: transform style is animated before cancelling got disallowed value "none"',
    },

    'test/web-platform-tests/web-animations/interfaces/Animation/finish.html': {
      'Test exceptions when finishing infinite animation':
          'assert_throws: function "function () {\n"use strict";\n\n    animation.finish();\n  }" did not throw',

      'Test exceptions when finishing non-running animation':
          'assert_throws: function "function () {\n"use strict";\n\n    animation.finish();\n  }" did not throw',

      'Test finish() resolves finished promise synchronously with an animation without a target':
          'KeyframeEffectReadOnly is not defined',

      'Test finish() while pause-pending with negative playbackRate':
          'assert_equals: The play state of a pause-pending animation should become "finished" after finish() is called expected "finished" but got "paused"',

      'Test finish() while pause-pending with positive playbackRate':
          'assert_equals: The play state of a pause-pending animation should become "finished" after finish() is called expected "finished" but got "paused"',

      'Test finish() while paused':
          'assert_equals: The play state of a paused animation should become "finished" after finish() is called expected "finished" but got "paused"',

      'Test finish() while play-pending':
          'assert_approx_equals: The start time of a play-pending animation should be set after calling finish() expected NaN +/- 0.0005 but got 0',

      'Test finishing of animation with a current time past the effect end':
          'animation.effect.getComputedTiming is not a function',

      'Test normally finished animation resolves finished promise synchronously with an animation without a target':
          'KeyframeEffectReadOnly is not defined',
    },

    'test/web-platform-tests/web-animations/interfaces/Animation/finished.html': {
      'Test finished promise changes for animation duration changes':
          'assert_equals: currentTime should be unchanged when duration shortened expected 50000 but got 25000',

      'Test finished promise is not resolved once the animation falls out finished state even though the current finished promise is generated soon after animation state became finished':
          'assert_unreached: Animation.finished should not be resolved Reached unreachable code',

      'Test finished promise is not resolved when the animation falls out finished state immediately':
          'assert_unreached: Animation.finished should not be resolved Reached unreachable code',

      'cancelling an already-finished animation replaces the finished promise':
          'assert_not_equals: A new finished promise should be created when cancelling a finished animation got disallowed value object "[object Promise]"',

      'cancelling an idle animation still replaces the finished promise':
          'assert_not_equals: A redundant call to cancel() should still generate a new finished promise got disallowed value object "[object Promise]"',
    },

    'test/web-platform-tests/web-animations/interfaces/Animation/oncancel.html': {
      'oncancel event is fired when animation.cancel() is called.':
          'FLAKY_TEST_RESULT',
    },

    'test/web-platform-tests/web-animations/interfaces/Animation/onfinish.html': {
      'onfinish event is fired when animation.finish() is called':
          'FLAKY_TEST_RESULT',
    },

    'test/web-platform-tests/web-animations/interfaces/Animation/pause.html': {
      'pause() from idle':
          'assert_equals: initially pause-pending expected "pending" but got "paused"',
    },

    'test/web-platform-tests/web-animations/interfaces/Animation/playbackRate.html': {
      'Test the effect of setting playbackRate while playing animation':
          'FLAKY_TEST_RESULT',
    },

    'test/web-platform-tests/web-animations/interfaces/Animation/reverse.html': {
      'reverse() when playbackRate < 0 and currentTime < 0':
          'assert_equals: reverse() should start playing from the start of animation time if the playbackRate < 0 and the currentTime < 0 expected 0 but got -200000',

      'reverse() when playbackRate < 0 and currentTime < 0 and the target effect end is positive infinity':
          'assert_equals: reverse() should start playing from the start of animation time if the playbackRate < 0 and the currentTime < 0 and the target effect is positive infinity expected 0 but got -200000',

      'reverse() when playbackRate < 0 and currentTime > effect end':
          'assert_equals: reverse() should start playing from the start of animation time if the playbackRate < 0 and the currentTime > effect end expected 0 but got 200000',

      'reverse() when playbackRate > 0 and currentTime < 0':
          'assert_equals: reverse() should start playing from the animation effect end if the playbackRate > 0 and the currentTime < 0 expected 100000 but got -200000',

      'reverse() when playbackRate > 0 and currentTime > effect end':
          'assert_equals: reverse() should start playing from the animation effect end if the playbackRate > 0 and the currentTime > effect end expected 100000 but got 200000',
    },

    'test/web-platform-tests/web-animations/interfaces/AnimationEffectTiming/delay.html': {
      'Test adding a positive delay to an animation without a backwards fill makes it no longer active':
          'anim.effect.getComputedTiming is not a function',

      'Test finishing an animation using a large negative delay':
          'anim.effect.getComputedTiming is not a function',

      'Test seeking an animation by setting a negative delay':
          'anim.effect.getComputedTiming is not a function',

      'set delay -100':
          'anim.effect.getComputedTiming is not a function',

      'set delay 100':
          'anim.effect.getComputedTiming is not a function',
    },

    'test/web-platform-tests/web-animations/interfaces/AnimationEffectTiming/duration.html': {
      'set 100 string duration in animate using an options object':
          'assert_throws: function "function () {\n"use strict";\n\n    div.animate({ opacity: [ 0, 1 ] }, { duration: \'100\' });\n  }" did not throw',

      'set NaN duration in animate using a duration parameter':
          'assert_throws: function "function () {\n"use strict";\n\n    div.animate({ opacity: [ 0, 1 ] }, NaN);\n  }" did not throw',

      'set NaN duration in animate using an options object':
          'assert_throws: function "function () {\n"use strict";\n\n    div.animate({ opacity: [ 0, 1 ] }, { duration: NaN });\n  }" did not throw',

      'set abc string duration in animate using an options object':
          'assert_throws: function "function () {\n"use strict";\n\n    div.animate({ opacity: [ 0, 1 ] }, { duration: \'abc\' });\n  }" did not throw',

      'set auto duration in animate as object':
          'assert_equals: set duration \'auto\' expected (string) "auto" but got (number) 0',

      'set duration 123.45':
          'anim.effect.getComputedTiming is not a function',

      'set duration Infinity':
          'anim.effect.getComputedTiming is not a function',

      'set duration auto':
          'anim.effect.getComputedTiming is not a function',

      'set duration string 100':
          'assert_throws: function "function () {\n"use strict";\n\n    anim.effect.timing.duration = \'100\';\n  }" did not throw',
    },

    'test/web-platform-tests/web-animations/interfaces/AnimationEffectTiming/easing.html': {
      'Change the easing while the animation is running':
          'anim.effect.getComputedTiming is not a function',

      'ease function':
          'animation.effect.getComputedTiming is not a function',

      'ease-in function':
          'animation.effect.getComputedTiming is not a function',

      'ease-in-out function':
          'animation.effect.getComputedTiming is not a function',

      'ease-out function':
          'animation.effect.getComputedTiming is not a function',

      'easing function which produces values greater than 1':
          'animation.effect.getComputedTiming is not a function',

      'linear function':
          'animation.effect.getComputedTiming is not a function',

      'steps(end) function':
          'animation.effect.getComputedTiming is not a function',

      'steps(start) function':
          'animation.effect.getComputedTiming is not a function',
    },

    'test/web-platform-tests/web-animations/interfaces/AnimationEffectTiming/endDelay.html': {
      'onfinish event is fired currentTime is after endTime':
          'FLAKY_TEST_RESULT',

      'set endDelay -1000':
          'anim.effect.getComputedTiming is not a function',

      'set endDelay 123.45':
          'anim.effect.getComputedTiming is not a function',

      'set endDelay Infinity':
          'assert_throws: we can not assign Infinity to timing.endDelay function "function () {\n"use strict";\n\n    anim.effect.timing.endDelay = Infinity;\n  }" did not throw',

      'set endDelay negative Infinity':
          'assert_throws: we can not assign negative Infinity to timing.endDelay function "function () {\n"use strict";\n\n    anim.effect.timing.endDelay = -Infinity;\n  }" did not throw',
    },

    'test/web-platform-tests/web-animations/interfaces/AnimationEffectTiming/fill.html': {
      'set fill backwards':
          'anim.effect.getComputedTiming is not a function',

      'set fill both':
          'anim.effect.getComputedTiming is not a function',

      'set fill forwards':
          'anim.effect.getComputedTiming is not a function',

      'set fill none':
          'anim.effect.getComputedTiming is not a function',
    },

    'test/web-platform-tests/web-animations/interfaces/AnimationEffectTiming/getAnimations.html': {
      'when currentTime changed in duration:1000, delay: -500, endDelay: -500':
          'assert_equals: when currentTime 0 expected 0 but got 1',

      'when currentTime changed in duration:1000, delay: 500, endDelay: -500':
          'assert_equals: set currentTime 1000 expected 0 but got 1',

      'when duration is changed':
          'assert_equals: set duration 102000 expected (object) object "[object Object]" but got (undefined) undefined',

      'when endDelay is changed':
          'assert_equals: set negative endDelay so as endTime is less than currentTime expected 0 but got 1',

      'when iterations is changed':
          'assert_equals: set iterations 10 expected (object) object "[object Object]" but got (undefined) undefined',
    },

    'test/web-platform-tests/web-animations/interfaces/AnimationEffectTiming/getComputedStyle.html': {
      'change currentTime when fill forwards and endDelay is positive':
          'assert_equals: set currentTime just a little before duration expected "0.0001" but got "0"',

      'changed duration immediately updates its computed styles':
          'FLAKY_TEST_RESULT',

      'changed iterations immediately updates its computed styles':
          'FLAKY_TEST_RESULT',
    },

    'test/web-platform-tests/web-animations/interfaces/AnimationEffectTiming/iterationStart.html': {
      'Test invalid iterationStart value':
          'assert_throws: function "function () {\n"use strict";\n\n                  anim.effect.timing.iterationStart = -1;\n                }" threw object "ReferenceError: timing is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Test that changing the iterationStart affects computed timing during the active phase':
          'anim.effect.getComputedTiming is not a function',

      'Test that changing the iterationStart affects computed timing when backwards-filling':
          'anim.effect.getComputedTiming is not a function',

      'Test that changing the iterationStart affects computed timing when forwards-filling':
          'anim.effect.getComputedTiming is not a function',
    },

    'test/web-platform-tests/web-animations/interfaces/AnimationEffectTiming/iterations.html': {
      'set iterations 2':
          'anim.effect.getComputedTiming is not a function',

      'set iterations Infinity':
          'anim.effect.getComputedTiming is not a function',
    },

    'test/web-platform-tests/web-animations/interfaces/AnimationTimeline/document-timeline.html': {
      'document.timeline.currentTime liveness tests':
          'assert_true: document.timeline.currentTime increases between script blocks expected true got false',

      'document.timeline.currentTime value tests':
          'assert_true: document.timeline.currentTime is positive expected true got false',
    },

    'test/web-platform-tests/web-animations/interfaces/AnimationTimeline/idlharness.html': {
      'AnimationTimeline interface object length':
          'assert_own_property: self does not have own property "AnimationTimeline" expected property "AnimationTimeline" missing',

      'AnimationTimeline interface object name':
          'assert_own_property: self does not have own property "AnimationTimeline" expected property "AnimationTimeline" missing',

      'AnimationTimeline interface: attribute currentTime':
          'assert_own_property: self does not have own property "AnimationTimeline" expected property "AnimationTimeline" missing',

      'AnimationTimeline interface: document.timeline must inherit property "currentTime" with the proper type (0)':
          'assert_inherits: property "currentTime" found on object expected in prototype chain',

      'AnimationTimeline interface: existence and properties of interface object':
          'assert_own_property: self does not have own property "AnimationTimeline" expected property "AnimationTimeline" missing',

      'AnimationTimeline interface: existence and properties of interface prototype object':
          'assert_own_property: self does not have own property "AnimationTimeline" expected property "AnimationTimeline" missing',

      'AnimationTimeline interface: existence and properties of interface prototype object\'s "constructor" property':
          'assert_own_property: self does not have own property "AnimationTimeline" expected property "AnimationTimeline" missing',

      'DocumentTimeline interface object length':
          'assert_own_property: self does not have own property "DocumentTimeline" expected property "DocumentTimeline" missing',

      'DocumentTimeline interface object name':
          'assert_own_property: self does not have own property "DocumentTimeline" expected property "DocumentTimeline" missing',

      'DocumentTimeline interface: existence and properties of interface object':
          'assert_own_property: self does not have own property "DocumentTimeline" expected property "DocumentTimeline" missing',

      'DocumentTimeline interface: existence and properties of interface prototype object':
          'assert_own_property: self does not have own property "DocumentTimeline" expected property "DocumentTimeline" missing',

      'DocumentTimeline interface: existence and properties of interface prototype object\'s "constructor" property':
          'assert_own_property: self does not have own property "DocumentTimeline" expected property "DocumentTimeline" missing',

      'DocumentTimeline must be primary interface of document.timeline':
          'assert_own_property: self does not have own property "DocumentTimeline" expected property "DocumentTimeline" missing',

      'Stringification of document.timeline':
          'assert_equals: class string of document.timeline expected "[object DocumentTimeline]" but got "[object Object]"',
    },

    'test/web-platform-tests/web-animations/interfaces/Document/getAnimations.html': {
      'Test document.getAnimations for non-animated content':
          'document.getAnimations is not a function',

      'Test document.getAnimations for script-generated animations':
          'document.getAnimations is not a function',

      'Test document.getAnimations with null target':
          'KeyframeEffectReadOnly is not defined',

      'Test the order of document.getAnimations with script generated animations':
          'document.getAnimations is not a function',
    },

    'test/web-platform-tests/web-animations/interfaces/KeyframeEffect/constructor.html': {
      'Invalid KeyframeEffectReadOnly option by -Infinity':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by NaN':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by a NaN duration':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by a NaN iterations':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by a blank easing':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by a multi-value easing':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by a negative Infinity duration':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by a negative Infinity iterations':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by a negative duration':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by a negative iterations':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by a negative value':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by a string duration':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by a variable easing':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by an \'inherit\' easing':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by an \'initial\' easing':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid KeyframeEffectReadOnly option by an unrecognized easing':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target,\n                                 { left: ["10px", "20px"] },\n                                 stest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'Invalid easing [a blank easing] in keyframe sequence should be thrown':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target, subtest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "TypeError" ("TypeError")',

      'Invalid easing [a multi-value easing] in keyframe sequence should be thrown':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target, subtest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "TypeError" ("TypeError")',

      'Invalid easing [a variable easing] in keyframe sequence should be thrown':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target, subtest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "TypeError" ("TypeError")',

      'Invalid easing [an \'inherit\' easing] in keyframe sequence should be thrown':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target, subtest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "TypeError" ("TypeError")',

      'Invalid easing [an \'initial\' easing] in keyframe sequence should be thrown':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target, subtest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "TypeError" ("TypeError")',

      'Invalid easing [an unrecognized easing] in keyframe sequence should be thrown':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target, subtest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "TypeError" ("TypeError")',

      'KeyframeEffect constructor creates an AnimationEffectTiming timing object':
          'assert_equals: expected "[object KeyframeEffect]" but got "[object Object]"',

      'KeyframeEffectReadOnly constructor throws with a keyframe sequence with an invalid easing value':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target, subtest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'KeyframeEffectReadOnly constructor throws with keyframes not loosely sorted by offset':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target, subtest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'KeyframeEffectReadOnly constructor throws with keyframes with an invalid composite value':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target, subtest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'KeyframeEffectReadOnly constructor throws with keyframes with an out-of-bounded negative offset':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target, subtest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'KeyframeEffectReadOnly constructor throws with keyframes with an out-of-bounded positive offset':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target, subtest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'KeyframeEffectReadOnly constructor throws with property-indexed keyframes with an invalid easing value':
          'assert_throws: function "function () {\n"use strict";\n\n      new KeyframeEffectReadOnly(target, subtest.input);\n    }" threw object "ReferenceError: KeyframeEffectReadOnly is not defined" ("ReferenceError") expected object "[object Object]" ("TypeError")',

      'a KeyframeEffectReadOnly can be constructed with a keyframe sequence where greater shorthand precedes lesser shorthand':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a keyframe sequence where lesser shorthand precedes greater shorthand':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a keyframe sequence where longhand precedes shorthand':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a keyframe sequence where shorthand precedes longhand':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a keyframe sequence with a CSS variable reference':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a keyframe sequence with a CSS variable reference in a shorthand property':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a keyframe sequence with different composite values, but the same composite value for a given offset':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a keyframe sequence with different easing values, but the same easing value for a given offset':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a keyframe sequence with duplicate values for a given interior offset':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a keyframe sequence with duplicate values for offsets 0 and 1':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a keyframe sequence with repeated values at offset 1 with different easings':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one property keyframe sequence with all omitted offsets':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one property keyframe sequence with some omitted offsets':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one property one keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one property one non-array value property-indexed keyframes specification':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one property one value property-indexed keyframes specification':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one property two keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one property two keyframe sequence that needs to stringify its values':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one property two value property-indexed keyframes specification':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one property two value property-indexed keyframes specification that needs to stringify its values':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one property two value property-indexed keyframes specification where the first value is invalid':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one property two value property-indexed keyframes specification where the second value is invalid':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one shorthand property two keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a one shorthand property two value property-indexed keyframes specification':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a property-indexed keyframes specification with a CSS variable reference':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a property-indexed keyframes specification with a CSS variable reference in a shorthand property':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a property-indexed keyframes specification with an invalid value':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a single keyframe sequence with omitted offsets':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a two property (a shorthand and one of its component longhands) two keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a two property (one shorthand and one of its longhand components) two value property-indexed keyframes specification':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a two property four keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a two property keyframe sequence where one property is missing from the first keyframe':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a two property keyframe sequence where one property is missing from the last keyframe':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a two property keyframe sequence with some omitted offsets':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a two property property-indexed keyframes specification with different numbers of values':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a two property two keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with a two property two value property-indexed keyframes specification':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly can be constructed with no frames':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed by +Infinity':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed by a double value':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed by a forwards fill':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed by a normal KeyframeEffectOptions object':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed by an Infinity duration':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed by an Infinity iterations':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed by an auto duration':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed by an auto fill':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed by an empty KeyframeEffectOptions object':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a keyframe sequence where greater shorthand precedes lesser shorthand roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a keyframe sequence where lesser shorthand precedes greater shorthand roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a keyframe sequence where longhand precedes shorthand roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a keyframe sequence where shorthand precedes longhand roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a keyframe sequence with a CSS variable reference in a shorthand property roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a keyframe sequence with a CSS variable reference roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a keyframe sequence with different composite values, but the same composite value for a given offset roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a keyframe sequence with different easing values, but the same easing value for a given offset roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a keyframe sequence with duplicate values for a given interior offset roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a keyframe sequence with duplicate values for offsets 0 and 1 roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a keyframe sequence with repeated values at offset 1 with different easings roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one property keyframe sequence with all omitted offsets roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one property keyframe sequence with some omitted offsets roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one property one keyframe sequence roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one property one non-array value property-indexed keyframes specification roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one property one value property-indexed keyframes specification roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one property two keyframe sequence roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one property two keyframe sequence that needs to stringify its values roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one property two value property-indexed keyframes specification roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one property two value property-indexed keyframes specification that needs to stringify its values roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one property two value property-indexed keyframes specification where the first value is invalid roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one property two value property-indexed keyframes specification where the second value is invalid roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one shorthand property two keyframe sequence roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a one shorthand property two value property-indexed keyframes specification roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a property-indexed keyframes specification with a CSS variable reference in a shorthand property roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a property-indexed keyframes specification with a CSS variable reference roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a property-indexed keyframes specification with an invalid value roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a single keyframe sequence with omitted offsets roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a two property (a shorthand and one of its component longhands) two keyframe sequence roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a two property (one shorthand and one of its longhand components) two value property-indexed keyframes specification roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a two property four keyframe sequence roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a two property keyframe sequence where one property is missing from the first keyframe roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a two property keyframe sequence where one property is missing from the last keyframe roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a two property keyframe sequence with some omitted offsets roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a two property property-indexed keyframes specification with different numbers of values roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a two property two keyframe sequence roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with a two property two value property-indexed keyframes specification roundtrips':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed with null target':
          'KeyframeEffectReadOnly is not defined',

      'a KeyframeEffectReadOnly constructed without any KeyframeEffectOptions object':
          'KeyframeEffectReadOnly is not defined',

      'composite values are parsed correctly when passed to the KeyframeEffectReadOnly constructor in KeyframeTimingOptions':
          'KeyframeEffectReadOnly is not defined',

      'composite values are parsed correctly when passed to the KeyframeEffectReadOnly constructor in property-indexed keyframes':
          'KeyframeEffectReadOnly is not defined',

      'composite values are parsed correctly when passed to the KeyframeEffectReadOnly constructor in regular keyframes':
          'KeyframeEffectReadOnly is not defined',

      'easing values are parsed correctly when passed to the KeyframeEffectReadOnly constructor in KeyframeTimingOptions':
          'KeyframeEffectReadOnly is not defined',

      'easing values are parsed correctly when passed to the KeyframeEffectReadOnly constructor in a property-indexed keyframe':
          'KeyframeEffectReadOnly is not defined',

      'easing values are parsed correctly when passed to the KeyframeEffectReadOnly constructor in regular keyframes':
          'KeyframeEffectReadOnly is not defined',

      'the KeyframeEffectReadOnly constructor reads keyframe properties in the expected order':
          'KeyframeEffectReadOnly is not defined',
    },

    'test/web-platform-tests/web-animations/interfaces/KeyframeEffect/effect-easing.html': {
      'effect easing produces values greater than 1 with keyframe easing cubic-bezier(1, 1, 1, 1)':
          'assert_approx_equals: The left of the animation should be approximately 102.40666638411385 at 250ms expected 102.40666638411385 +/- 0.01 but got 100',

      'effect easing produces negative values 1 with keyframe easing cubic-bezier(0, 0, 0, 0)':
          'assert_approx_equals: The left of the animation should be approximately -29.501119758965654 at 250ms expected -29.501119758965654 +/- 0.01 but got 0',

      'effect easing which produces values greater than 1 and the tangent on the upper boundary is infinity with keyframe easing producing values greater than 1':
          'assert_approx_equals: The left of the animation should be approximately 100 at 240ms expected 100 +/- 0.01 but got 99.5333',
    },

    'test/web-platform-tests/web-animations/interfaces/KeyframeEffect/effect-easing-steps.html': {
      'Test bounds point of step-start easing':
          'animation.effect.getComputedTiming is not a function',

      'Test bounds point of step-start easing with compositor':
          'animation.effect.getComputedTiming is not a function',

      'Test bounds point of step-start easing with reverse direction':
          'animation.effect.getComputedTiming is not a function',

      'Test bounds point of step-start easing with iterationStart not at a transition point':
          'animation.effect.getComputedTiming is not a function',

      'Test bounds point of step-start easing with iterationStart and delay':
          'animation.effect.getComputedTiming is not a function',

      'Test bounds point of step-start easing with iterationStart and reverse direction':
          'animation.effect.getComputedTiming is not a function',

      'Test bounds point of step(4, start) easing with iterationStart 0.75 and delay':
          'animation.effect.getComputedTiming is not a function',

      'Test bounds point of step-start easing with alternate direction':
          'animation.effect.getComputedTiming is not a function',

      'Test bounds point of step-start easing with alternate-reverse direction':
          'animation.effect.getComputedTiming is not a function',

      'Test bounds point of step-start easing in keyframe':
          'animation.effect.getComputedTiming is not a function',

      'Test bounds point of step-end easing with iterationStart and delay':
          'animation.effect.getComputedTiming is not a function',

      'Test bounds point of step-end easing with iterationStart not at a transition point':
          'animation.effect.getComputedTiming is not a function',
    },

    'test/web-platform-tests/web-animations/interfaces/KeyframeEffect/getComputedTiming.html': {
      'getComputedTiming().activeDuration for a non-zero duration and default iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for a non-zero duration and fractional iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for a non-zero duration and integral iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for a zero duration and default iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for a zero duration and fractional iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for a zero duration and infinite iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for a zero duration and zero iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for an empty KeyframeEffectOptions object':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for an infinite duration and default iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for an infinite duration and fractional iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for an infinite duration and infinite iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for an infinite duration and zero iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for an non-zero duration and infinite iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().activeDuration for an non-zero duration and zero iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().endTime for a non-zero duration and default iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().endTime for a non-zero duration and non-default iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().endTime for a non-zero duration and non-zero delay':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().endTime for a non-zero duration, non-zero delay and non-default iteration':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().endTime for a zero duration and negative delay':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().endTime for an empty KeyframeEffectOptions object':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().endTime for an infinite duration':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().endTime for an infinite duration and delay':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().endTime for an infinite duration and negative delay':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().endTime for an infinite iteration count':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().endTime for an non-zero duration and negative delay':
          'KeyframeEffectReadOnly is not defined',

      'getComputedTiming().endTime for an non-zero duration and negative delay greater than active duration':
          'KeyframeEffectReadOnly is not defined',

      'values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by +Infinity':
          'KeyframeEffectReadOnly is not defined',

      'values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by a double value':
          'KeyframeEffectReadOnly is not defined',

      'values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by a forwards fill':
          'KeyframeEffectReadOnly is not defined',

      'values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by a normal KeyframeEffectOptions object':
          'KeyframeEffectReadOnly is not defined',

      'values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by an Infinity duration':
          'KeyframeEffectReadOnly is not defined',

      'values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by an Infinity iterations':
          'KeyframeEffectReadOnly is not defined',

      'values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by an auto duration':
          'KeyframeEffectReadOnly is not defined',

      'values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by an auto fill':
          'KeyframeEffectReadOnly is not defined',

      'values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by an empty KeyframeEffectOptions object':
          'KeyframeEffectReadOnly is not defined',

      'values of getComputedTiming() when a KeyframeEffectReadOnly is constructed without any KeyframeEffectOptions object':
          'KeyframeEffectReadOnly is not defined',
    },

    'test/web-platform-tests/web-animations/interfaces/KeyframeEffect/processing-a-keyframes-argument.html': {
      'non-animatable property \'animation\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animation\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationDelay\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationDelay\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationDirection\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationDirection\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationDuration\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationDuration\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationFillMode\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationFillMode\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationIterationCount\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationIterationCount\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationName\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationName\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationPlayState\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationPlayState\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationTimingFunction\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'animationTimingFunction\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'display\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'display\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'transition\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'transition\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'transitionDelay\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'transitionDelay\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'transitionDuration\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'transitionDuration\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'transitionProperty\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'transitionProperty\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'transitionTimingFunction\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'transitionTimingFunction\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'unsupportedProperty\' is not accessed when using a keyframe sequence':
          'KeyframeEffectReadOnly is not defined',

      'non-animatable property \'unsupportedProperty\' is not accessed when using a property-indexed keyframe object':
          'KeyframeEffectReadOnly is not defined',
    },

    'test/web-platform-tests/web-animations/interfaces/KeyframeEffect/setKeyframes.html': {
      'Keyframes can be replaced with a keyframe sequence where greater shorthand precedes lesser shorthand':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a keyframe sequence where lesser shorthand precedes greater shorthand':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a keyframe sequence where longhand precedes shorthand':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a keyframe sequence where shorthand precedes longhand':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a keyframe sequence with a CSS variable reference':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a keyframe sequence with a CSS variable reference in a shorthand property':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a keyframe sequence with different composite values, but the same composite value for a given offset':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a keyframe sequence with different easing values, but the same easing value for a given offset':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a keyframe sequence with duplicate values for a given interior offset':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a keyframe sequence with duplicate values for offsets 0 and 1':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a keyframe sequence with repeated values at offset 1 with different easings':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one property keyframe sequence with all omitted offsets':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one property keyframe sequence with some omitted offsets':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one property one keyframe sequence':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one property one non-array value property-indexed keyframes specification':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one property one value property-indexed keyframes specification':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one property two keyframe sequence':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one property two keyframe sequence that needs to stringify its values':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one property two value property-indexed keyframes specification':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one property two value property-indexed keyframes specification that needs to stringify its values':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one property two value property-indexed keyframes specification where the first value is invalid':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one property two value property-indexed keyframes specification where the second value is invalid':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one shorthand property two keyframe sequence':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a one shorthand property two value property-indexed keyframes specification':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a property-indexed keyframes specification with a CSS variable reference':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a property-indexed keyframes specification with a CSS variable reference in a shorthand property':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a property-indexed keyframes specification with an invalid value':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a single keyframe sequence with omitted offsets':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a two property (a shorthand and one of its component longhands) two keyframe sequence':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a two property (one shorthand and one of its longhand components) two value property-indexed keyframes specification':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a two property four keyframe sequence':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a two property keyframe sequence where one property is missing from the first keyframe':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a two property keyframe sequence where one property is missing from the last keyframe':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a two property keyframe sequence with some omitted offsets':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a two property property-indexed keyframes specification with different numbers of values':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a two property two keyframe sequence':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with a two property two value property-indexed keyframes specification':
          'effect.setKeyframes is not a function',

      'Keyframes can be replaced with an empty keyframe':
          'effect.setKeyframes is not a function',
    },

    'test/web-platform-tests/web-animations/interfaces/KeyframeEffect/setTarget.html': {
      'Test setting target from a valid target to another target':
          'assert_equals: Value of 1st element (currently not targeted) after changing the effect target expected "10px" but got "50px"',

      'Test setting target from a valid target to null':
          'assert_equals: Value after clearing the target expected "10px" but got "50px"',

      'Test setting target from null to a valid target':
          'assert_equals: Value at 50% progress after setting new target expected "50px" but got "10px"',
    },

    'test/web-platform-tests/web-animations/timing-model/animation-effects/current-iteration.html': {
      'Test currentIteration during before and after phase when fill is none':
          'anim.effect.getComputedTiming is not a function',

      'Test fractional iterations: iterations:3.5 iterationStart:0 duration:0 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test fractional iterations: iterations:3.5 iterationStart:0 duration:100 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test fractional iterations: iterations:3.5 iterationStart:0 duration:Infinity delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:0 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:100 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:Infinity delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test fractional iterations: iterations:3.5 iterationStart:3 duration:0 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test fractional iterations: iterations:3.5 iterationStart:3 duration:100 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test fractional iterations: iterations:3.5 iterationStart:3 duration:Infinity delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test infinity iterations: iterations:Infinity iterationStart:0 duration:0 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test infinity iterations: iterations:Infinity iterationStart:0 duration:100 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test infinity iterations: iterations:Infinity iterationStart:0 duration:Infinity delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:0 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:100 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:Infinity delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test infinity iterations: iterations:Infinity iterationStart:3 duration:0 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test infinity iterations: iterations:Infinity iterationStart:3 duration:100 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test infinity iterations: iterations:Infinity iterationStart:3 duration:Infinity delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test integer iterations: iterations:3 iterationStart:0 duration:0 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test integer iterations: iterations:3 iterationStart:0 duration:100 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test integer iterations: iterations:3 iterationStart:0 duration:Infinity delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test integer iterations: iterations:3 iterationStart:2.5 duration:0 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test integer iterations: iterations:3 iterationStart:2.5 duration:100 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test integer iterations: iterations:3 iterationStart:2.5 duration:Infinity delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test integer iterations: iterations:3 iterationStart:3 duration:0 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test integer iterations: iterations:3 iterationStart:3 duration:100 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test integer iterations: iterations:3 iterationStart:3 duration:Infinity delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test zero iterations: iterations:0 iterationStart:0 duration:0 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test zero iterations: iterations:0 iterationStart:0 duration:100 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test zero iterations: iterations:0 iterationStart:0 duration:Infinity delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test zero iterations: iterations:0 iterationStart:2.5 duration:0 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test zero iterations: iterations:0 iterationStart:2.5 duration:100 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test zero iterations: iterations:0 iterationStart:2.5 duration:Infinity delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test zero iterations: iterations:0 iterationStart:3 duration:0 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test zero iterations: iterations:0 iterationStart:3 duration:100 delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',

      'Test zero iterations: iterations:0 iterationStart:3 duration:Infinity delay:1 fill:both':
          'anim.effect.getComputedTiming is not a function',
    },

    'test/web-platform-tests/web-animations/timing-model/animations/set-the-animation-start-time.html': {
      'Setting an unresolved start time an animation without an active timeline does not clear the current time':
          'Animation with null timeline is not supported',

      'Setting an unresolved start time sets the hold time':
          'assert_equals: expected "running" but got "idle"',

      'Setting the start time clears the hold time':
          'assert_approx_equals: The current time is calculated from the start time, not the hold time expected 2000 +/- 0.0005 but got 1000',

      'Setting the start time of an animation without an active timeline':
          'Animation with null timeline is not supported',

      'Setting the start time resolves a pending pause task':
          'assert_equals: Animation is in pause-pending state expected "pending" but got "paused"',

      'Setting the start time updates the finished state':
          'assert_equals: Seeked to finished state using the startTime expected "finished" but got "idle"',
    },
  },
};
