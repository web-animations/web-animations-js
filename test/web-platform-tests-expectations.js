var skippedTestharnessTests = {
  // Skipped test format:
  // "path/to/test.html":
  //   "Reason for skipping.",

  "test/web-platform-tests/web-animations/animation/constructor.html":
    "KeyframeEffectReadOnly is not defined causing the test to timeout.",

  "test/web-platform-tests/web-animations/keyframe-effect/effect-easing.html":
    "It seems to enter an infinite loop and halt the browser.",
};

var testharnessFlakyFailure = {};
var expectedTestharnessFailures = {
  // Failure expectation format:
  // "path/to/test.html": {
  //   "Inner test name":
  //     "Failure message",
  // },

  "test/web-platform-tests/web-animations/animatable/animate.html": {
    "Element.animate() creates an Animation object":
      "assert_equals: Returned object is an Animation expected \"[object Animation]\" but got \"[object Object]\"",

    "Element.animate() creates an Animation object with a KeyframeEffect":
      "assert_equals: Returned Animation has a KeyframeEffect expected \"[object KeyframeEffect]\" but got \"[object Object]\"",

    "Element.animate() accepts a one property two value property-indexed keyframes specification":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset\" but got \"left,offset\"",

    "Element.animate() accepts a one shorthand property two value property-indexed keyframes specification":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,margin,offset\" but got \"marginBottom,marginLeft,marginRight,marginTop,offset\"",

    "Element.animate() accepts a two property (one shorthand and one of its longhand components) two value property-indexed keyframes specification":
      "assert_equals: number of frames expected 2 but got 4",

    "Element.animate() accepts a two property two value property-indexed keyframes specification":
      "assert_equals: number of frames expected 2 but got 4",

    "Element.animate() accepts a two property property-indexed keyframes specification with different numbers of values":
      "assert_equals: number of frames expected 3 but got 5",

    "Element.animate() accepts a property-indexed keyframes specification with an invalid value":
      "assert_equals: number of frames expected 5 but got 10",

    "Element.animate() accepts a one property two value property-indexed keyframes specification that needs to stringify its values":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,offset,opacity\" but got \"offset,opacity\"",

    "Element.animate() accepts a one property one value property-indexed keyframes specification":
      "Partial keyframes are not supported",

    "Element.animate() accepts a one property one non-array value property-indexed keyframes specification":
      "Partial keyframes are not supported",

    "Element.animate() accepts a one property two value property-indexed keyframes specification where the first value is invalid":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset\" but got \"left,offset\"",

    "Element.animate() accepts a one property two value property-indexed keyframes specification where the second value is invalid":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset\" but got \"left,offset\"",

    "Element.animate() accepts a two property property-indexed keyframes specification where one property is missing from the first keyframe":
      "Partial keyframes are not supported",

    "Element.animate() accepts a two property property-indexed keyframes specification where one property is missing from the last keyframe":
      "Partial keyframes are not supported",

    "Element.animate() accepts a property-indexed keyframes specification with repeated values at offset 0 with different easings":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset\" but got \"easing,left,offset\"",

    "Element.animate() accepts a one property one keyframe sequence":
      "Partial keyframes are not supported",

    "Element.animate() accepts a one property two keyframe sequence":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset\" but got \"left,offset\"",

    "Element.animate() accepts a two property two keyframe sequence":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset,top\" but got \"left,offset,top\"",

    "Element.animate() accepts a one shorthand property two keyframe sequence":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,margin,offset\" but got \"marginBottom,marginLeft,marginRight,marginTop,offset\"",

    "Element.animate() accepts a two property (a shorthand and one of its component longhands) two keyframe sequence":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,margin,marginTop,offset\" but got \"marginBottom,marginLeft,marginRight,marginTop,offset\"",

    "Element.animate() accepts a keyframe sequence with duplicate values for a given interior offset":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset\" but got \"left,offset\"",

    "Element.animate() accepts a keyframe sequence with duplicate values for offsets 0 and 1":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset\" but got \"left,offset\"",

    "Element.animate() accepts a two property four keyframe sequence":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset\" but got \"left,offset\"",

    "Element.animate() accepts a single keyframe sequence with omitted offsets":
      "Partial keyframes are not supported",

    "Element.animate() accepts a one property keyframe sequence with some omitted offsets":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset\" but got \"left,offset\"",

    "Element.animate() accepts a two property keyframe sequence with some omitted offsets":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset,top\" but got \"left,offset,top\"",

    "Element.animate() accepts a one property keyframe sequence with all omitted offsets":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset\" but got \"left,offset\"",

    "Element.animate() accepts a keyframe sequence with different easing values, but the same easing value for a given offset":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,left,offset\" but got \"easing,left,offset\"",

    "Element.animate() accepts a keyframe sequence with different composite values, but the same composite value for a given offset":
      "add compositing is not supported",

    "Element.animate() accepts a one property two keyframe sequence that needs to stringify its values":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,offset,opacity\" but got \"offset,opacity\"",

    "Element.animate() accepts a keyframe sequence where shorthand precedes longhand":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,margin,marginRight,offset\" but got \"marginBottom,marginLeft,marginRight,marginTop,offset\"",

    "Element.animate() accepts a keyframe sequence where longhand precedes shorthand":
      "assert_equals: properties on ComputedKeyframe #0 expected \"computedOffset,easing,margin,marginRight,offset\" but got \"marginBottom,marginLeft,marginRight,marginTop,offset\"",

    "Element.animate() accepts a keyframe sequence where lesser shorthand precedes greater shorthand":
      "assert_equals: properties on ComputedKeyframe #0 expected \"border,borderLeft,computedOffset,easing,offset\" but got \"borderBottomColor,borderBottomStyle,borderBottomWidth,borderLeftColor,borderLeftStyle,borderLeftWidth,borderRightColor,borderRightStyle,borderRightWidth,borderTopColor,borderTopStyle,borderTopWidth,offset\"",

    "Element.animate() accepts a keyframe sequence where greater shorthand precedes lesser shorthand":
      "assert_equals: properties on ComputedKeyframe #0 expected \"border,borderLeft,computedOffset,easing,offset\" but got \"borderBottomColor,borderBottomStyle,borderBottomWidth,borderLeftColor,borderLeftStyle,borderLeftWidth,borderRightColor,borderRightStyle,borderRightWidth,borderTopColor,borderTopStyle,borderTopWidth,offset\"",

    "Element.animate() does not accept keyframes with an out-of-bounded positive offset":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      div.animate(subtest.in...\" did not throw",

    "Element.animate() does not accept keyframes with an out-of-bounded negative offset":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      div.animate(subtest.in...\" did not throw",

    "Element.animate() does not accept keyframes not loosely sorted by offset":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      div.animate(subtest.in...\" threw object \"[object Object]\" (\"InvalidModificationError\") expected object \"[object Object]\" (\"TypeError\")",

    "Element.animate() does not accept property-indexed keyframes with an invalid easing value":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      div.animate(subtest.in...\" did not throw",

    "Element.animate() does not accept a keyframe sequence with an invalid easing value":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      div.animate(subtest.in...\" did not throw",

    "Element.animate() does not accept keyframes with an invalid composite value":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      div.animate(subtest.in...\" threw object \"[object Object]\" (\"NotSupportedError\") expected object \"[object Object]\" (\"TypeError\")",

    "Element.animate() accepts a double as an options argument":
      "assert_equals: expected \"auto\" but got \"none\"",

    "Element.animate() accepts an absent options argument":
      "assert_equals: expected (string) \"auto\" but got (number) 0",

    "Element.animate() correctly sets the Animation's timeline when triggered on an element in a different document":
      "div.animate is not a function",

    "CSSPseudoElement.animate() creates an Animation object":
      "document.getAnimations is not a function",

    "CSSPseudoElement.animate() creates an Animation object targeting to the correct CSSPseudoElement object":
      "document.getAnimations is not a function",
  },

  "test/web-platform-tests/web-animations/animation-effect-timing/delay.html": {
    "set delay 100":
      "anim.effect.getComputedTiming is not a function",

    "set delay -100":
      "anim.effect.getComputedTiming is not a function",

    "Test adding a positive delay to an animation without a backwards fill makes it no longer active":
      "anim.effect.getComputedTiming is not a function",

    "Test seeking an animation by setting a negative delay":
      "anim.effect.getComputedTiming is not a function",

    "Test finishing an animation using a large negative delay":
      "anim.effect.getComputedTiming is not a function",
  },

  "test/web-platform-tests/web-animations/animation-effect-timing/duration.html": {
    "set duration 123.45":
      "anim.effect.getComputedTiming is not a function",

    "set duration auto":
      "anim.effect.getComputedTiming is not a function",

    "set auto duration in animate as object":
      "assert_equals: set duration 'auto' expected (string) \"auto\" but got (number) 0",

    "set duration Infinity":
      "anim.effect.getComputedTiming is not a function",

    "set negative duration in animate using a duration parameter":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    div.animate({ opacity: [...\" did not throw",

    "set negative Infinity duration in animate using a duration parameter":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    div.animate({ opacity: [...\" did not throw",

    "set NaN duration in animate using a duration parameter":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    div.animate({ opacity: [...\" did not throw",

    "set negative duration in animate using an options object":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    div.animate({ opacity: [...\" did not throw",

    "set negative Infinity duration in animate using an options object":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    div.animate({ opacity: [...\" did not throw",

    "set NaN duration in animate using an options object":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    div.animate({ opacity: [...\" did not throw",

    "set abc string duration in animate using an options object":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    div.animate({ opacity: [...\" did not throw",

    "set 100 string duration in animate using an options object":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    div.animate({ opacity: [...\" did not throw",

    "set negative duration":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    anim.effect.timing.durat...\" did not throw",

    "set negative Infinity duration":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    anim.effect.timing.durat...\" did not throw",

    "set NaN duration":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    anim.effect.timing.durat...\" did not throw",

    "set duration abc":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    anim.effect.timing.durat...\" did not throw",

    "set duration string 100":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    anim.effect.timing.durat...\" did not throw",
  },

  "test/web-platform-tests/web-animations/animation-effect-timing/easing.html": {
    "steps(start) function":
      "animation.effect.getComputedTiming is not a function",

    "steps(end) function":
      "animation.effect.getComputedTiming is not a function",

    "linear function":
      "animation.effect.getComputedTiming is not a function",

    "ease function":
      "animation.effect.getComputedTiming is not a function",

    "ease-in function":
      "animation.effect.getComputedTiming is not a function",

    "ease-in-out function":
      "animation.effect.getComputedTiming is not a function",

    "ease-out function":
      "animation.effect.getComputedTiming is not a function",

    "easing function which produces values greater than 1":
      "animation.effect.getComputedTiming is not a function",

    "Test invalid easing value":
      "assert_throws: function \"function () {\n\"use strict\";\n\n                  anim.effec...\" did not throw",

    "Change the easing while the animation is running":
      "anim.effect.getComputedTiming is not a function",
  },

  "test/web-platform-tests/web-animations/animation-effect-timing/endDelay.html": {
    "set endDelay 123.45":
      "anim.effect.getComputedTiming is not a function",

    "set endDelay -1000":
      "anim.effect.getComputedTiming is not a function",

    "set endDelay Infinity":
      "assert_throws: we can not assign Infinity to timing.endDelay function \"function () {\n\"use strict\";\n\n    anim.effect.timing.endDe...\" did not throw",

    "set endDelay negative Infinity":
      "assert_throws: we can not assign negative Infinity to timing.endDelay function \"function () {\n\"use strict\";\n\n    anim.effect.timing.endDe...\" did not throw",

    "onfinish event is fired currentTime is after endTime":
      testharnessFlakyFailure,
  },

  "test/web-platform-tests/web-animations/animation-effect-timing/fill.html": {
    "set fill none":
      "anim.effect.getComputedTiming is not a function",

    "set fill forwards":
      "anim.effect.getComputedTiming is not a function",

    "set fill backwards":
      "anim.effect.getComputedTiming is not a function",

    "set fill both":
      "anim.effect.getComputedTiming is not a function",
  },

  "test/web-platform-tests/web-animations/animation-effect-timing/getAnimations.html": {
    "when duration is changed":
      "assert_equals: set duration 102000 expected (object) object \"[object Object]\" but got (undefined) undefined",

    "when endDelay is changed":
      "assert_equals: set negative endDelay so as endTime is less than currentTime expected 0 but got 1",

    "when iterations is changed":
      "assert_equals: set iterations 10 expected (object) object \"[object Object]\" but got (undefined) undefined",

    "when currentTime changed in duration:1000, delay: 500, endDelay: -500":
      "assert_equals: set currentTime 1000 expected 0 but got 1",

    "when currentTime changed in duration:1000, delay: -500, endDelay: -500":
      "assert_equals: when currentTime 0 expected 0 but got 1",
  },

  "test/web-platform-tests/web-animations/animation-effect-timing/getComputedStyle.html": {
    "changed duration immediately updates its computed styles":
      testharnessFlakyFailure,

    "changed iterations immediately updates its computed styles":
      testharnessFlakyFailure,

    "change currentTime when fill forwards and endDelay is positive":
      "assert_equals: set currentTime just a little before duration expected \"0.0001\" but got \"0\"",

    "change currentTime when fill forwards and endDelay is negative":
      "assert_equals: set currentTime same as endTime expected \"0\" but got \"0.5\"",
  },

  "test/web-platform-tests/web-animations/animation-effect-timing/iterationStart.html": {
    "Test that changing the iterationStart affects computed timing when backwards-filling":
      "anim.effect.getComputedTiming is not a function",

    "Test that changing the iterationStart affects computed timing during the active phase":
      "anim.effect.getComputedTiming is not a function",

    "Test that changing the iterationStart affects computed timing when forwards-filling":
      "anim.effect.getComputedTiming is not a function",

    "Test invalid iterationStart value":
      "assert_throws: function \"function () {\n\"use strict\";\n\n                  anim.effec...\" did not throw",
  },

  "test/web-platform-tests/web-animations/animation-effect-timing/iterations.html": {
    "set iterations 2":
      "anim.effect.getComputedTiming is not a function",

    "set iterations Infinity":
      "anim.effect.getComputedTiming is not a function",

    "set negative iterations":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    anim.effect.timing.itera...\" did not throw",

    "set negative infinity iterations ":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    anim.effect.timing.itera...\" did not throw",

    "set NaN iterations":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    anim.effect.timing.itera...\" did not throw",
  },

  "test/web-platform-tests/web-animations/animation-model/animation-types/discrete-animation.html": {
    "Test animating discrete values":
      "anim.effect.getComputedTiming is not a function",

    "Test discrete animation is used when interpolation fails":
      "anim.effect.getComputedTiming is not a function",
    },

  "test/web-platform-tests/web-animations/animation-model/animation-types/not-animatable.html": {
    "'display' property cannot be animated using property-indexed notation":
      "assert_equals: Animation specified using property-indexed notation but consisting of only non-animatable properties should not contain any keyframes expected 0 but got 2",

    "'display' property cannot be animated using a keyframe sequence":
      "assert_false: Initial keyframe should not have the 'display' property expected false got true",

    "CSS animations and CSS transitions properties cannot be animated using property-indexed notation":
      "assert_equals: Animation specified using property-indexed notation but consisting of only non-animatable properties should not contain any keyframes expected 0 but got 26",

    "CSS animations and CSS transitions properties cannot be animated using a sequence of keyframes":
      "assert_array_equals: Initial keyframe should not contain any properties other than the default keyframe properties lengths differ, expected 3 got 14",
  },

  "test/web-platform-tests/web-animations/animation-timeline/document-timeline.html": {
    "document.timeline.currentTime value tests":
      "assert_true: document.timeline.currentTime is positive expected true got false",

    "document.timeline.currentTime liveness tests":
      "assert_true: document.timeline.currentTime increases between script blocks expected true got false",
  },

  "test/web-platform-tests/web-animations/animation-timeline/idlharness.html": {
    "AnimationTimeline interface: existence and properties of interface object":
      "assert_own_property: self does not have own property \"AnimationTimeline\" expected property \"AnimationTimeline\" missing",

    "AnimationTimeline interface object length":
      "assert_own_property: self does not have own property \"AnimationTimeline\" expected property \"AnimationTimeline\" missing",

    "AnimationTimeline interface object name":
      "assert_own_property: self does not have own property \"AnimationTimeline\" expected property \"AnimationTimeline\" missing",

    "AnimationTimeline interface: existence and properties of interface prototype object":
      "assert_own_property: self does not have own property \"AnimationTimeline\" expected property \"AnimationTimeline\" missing",

    "AnimationTimeline interface: existence and properties of interface prototype object's \"constructor\" property":
      "assert_own_property: self does not have own property \"AnimationTimeline\" expected property \"AnimationTimeline\" missing",

    "AnimationTimeline interface: attribute currentTime":
      "assert_own_property: self does not have own property \"AnimationTimeline\" expected property \"AnimationTimeline\" missing",

    "DocumentTimeline interface: existence and properties of interface object":
      "assert_own_property: self does not have own property \"DocumentTimeline\" expected property \"DocumentTimeline\" missing",

    "DocumentTimeline interface object length":
      "assert_own_property: self does not have own property \"DocumentTimeline\" expected property \"DocumentTimeline\" missing",

    "DocumentTimeline interface object name":
      "assert_own_property: self does not have own property \"DocumentTimeline\" expected property \"DocumentTimeline\" missing",

    "DocumentTimeline interface: existence and properties of interface prototype object":
      "assert_own_property: self does not have own property \"DocumentTimeline\" expected property \"DocumentTimeline\" missing",

    "DocumentTimeline interface: existence and properties of interface prototype object's \"constructor\" property":
      "assert_own_property: self does not have own property \"DocumentTimeline\" expected property \"DocumentTimeline\" missing",

    "DocumentTimeline must be primary interface of document.timeline":
      "assert_own_property: self does not have own property \"DocumentTimeline\" expected property \"DocumentTimeline\" missing",

    "Stringification of document.timeline":
      "assert_equals: class string of document.timeline expected \"[object DocumentTimeline]\" but got \"[object Object]\"",

    "AnimationTimeline interface: document.timeline must inherit property \"currentTime\" with the proper type (0)":
      "assert_inherits: property \"currentTime\" found on object expected in prototype chain",
  },

  "test/web-platform-tests/web-animations/animation/cancel.html": {
    "Animated style is cleared after calling Animation.cancel()":
      "assert_not_equals: transform style is animated before cancelling got disallowed value \"none\"",

    "After cancelling an animation, it can still be seeked":
      "assert_equals: margin-left style is updated when cancelled animation is seeked expected \"50px\" but got \"0px\"",
  },

  "test/web-platform-tests/web-animations/animation/finish.html": {
    "Test exceptions when finishing non-running animation":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    animation.finish();\n  }\" did not throw",

    "Test exceptions when finishing infinite animation":
      "assert_throws: function \"function () {\n\"use strict\";\n\n    animation.finish();\n  }\" did not throw",

    "Test finishing of animation with a current time past the effect end":
      "animation.effect.getComputedTiming is not a function",

    "Test finish() while paused":
      "assert_equals: The play state of a paused animation should become \"finished\" after finish() is called expected \"finished\" but got \"paused\"",

    "Test finish() while pause-pending with positive playbackRate":
      "assert_approx_equals: The start time of a pause-pending animation should be set after calling finish() expected NaN +/- 0.0005 but got 0",

    "Test finish() while pause-pending with negative playbackRate":
      "assert_equals: The start time of a pause-pending animation should be set after calling finish() expected (undefined) undefined but got (number) 100000",

    "Test finish() while play-pending":
      "assert_approx_equals: The start time of a play-pending animation should be set after calling finish() expected NaN +/- 0.0005 but got 0",

    "Test finish() resolves finished promise synchronously with an animation without a target":
      "KeyframeEffectReadOnly is not defined",

    "Test normally finished animation resolves finished promise synchronously with an animation without a target":
      "KeyframeEffectReadOnly is not defined",
  },

  "test/web-platform-tests/web-animations/animation/finished.html": {
    "cancelling an already-finished animation replaces the finished promise":
      "assert_not_equals: A new finished promise should be created when cancelling a finished animation got disallowed value object \"[object Promise]\"",

    "cancelling an idle animation still replaces the finished promise":
      "assert_not_equals: A redundant call to cancel() should still generate a new finished promise got disallowed value object \"[object Promise]\"",

    "Test finished promise changes for animation duration changes":
      "assert_equals: currentTime should be unchanged when duration shortened expected 50000 but got 25000",

    "Test finished promise is not resolved when the animation falls out finished state immediately":
      "assert_unreached: Animation.finished should not be resolved Reached unreachable code",

    "Test finished promise is not resolved once the animation falls out finished state even though the current finished promise is generated soon after animation state became finished":
      "assert_unreached: Animation.finished should not be resolved Reached unreachable code",
  },

  "test/web-platform-tests/web-animations/animation/oncancel.html": {
    "oncancel event is fired when animation.cancel() is called.":
      testharnessFlakyFailure,
  },

  "test/web-platform-tests/web-animations/animation/onfinish.html": {
    "onfinish event is fired when animation.finish() is called":
      testharnessFlakyFailure,
  },

  "test/web-platform-tests/web-animations/animation/pause.html": {
    "pause() from idle":
      "assert_equals: currentTime is set to 0 expected (number) 0 but got (object) null",

    "pause() from idle with a negative playbackRate":
      "assert_equals: currentTime is set to the effect end expected (number) 1000000 but got (object) null",

    "pause() from idle with a negative playbackRate and endless effect":
      "assert_throws: Expect InvalidStateError exception on calling pause() from idle with a negative playbackRate and infinite-duration animation function \"function () {\n\"use strict\";\n animation.pause(); }\" did not throw",
  },

  "test/web-platform-tests/web-animations/animation/play.html": {
    "play() throws when seeking an infinite-duration animation played in reverse":
      "assert_throws: Expected InvalidStateError exception on calling play() with a negative playbackRate and infinite-duration animation function \"function () {\n\"use strict\";\n animation.play(); }\" did not throw",
  },

  "test/web-platform-tests/web-animations/animation/playState.html": {
    "Animation.playState is 'paused' after cancelling an animation, seeking it makes it paused":
      "assert_equals: After seeking an idle animation, it is effectively paused expected \"paused\" but got \"idle\"",
  },

  "test/web-platform-tests/web-animations/animation/playbackRate.html": {
    "Test the effect of setting playbackRate while playing animation":
      testharnessFlakyFailure,
  },

  "test/web-platform-tests/web-animations/animation/reverse.html": {
    "reverse() when playbackRate > 0 and currentTime > effect end":
      "assert_equals: reverse() should start playing from the animation effect end if the playbackRate > 0 and the currentTime > effect end expected 100000 but got 200000",

    "reverse() when playbackRate > 0 and currentTime < 0":
      "assert_equals: reverse() should start playing from the animation effect end if the playbackRate > 0 and the currentTime < 0 expected 100000 but got -200000",

    "reverse() when playbackRate < 0 and currentTime < 0":
      "assert_equals: reverse() should start playing from the start of animation time if the playbackRate < 0 and the currentTime < 0 expected 0 but got -200000",

    "reverse() when playbackRate < 0 and currentTime > effect end":
      "assert_equals: reverse() should start playing from the start of animation time if the playbackRate < 0 and the currentTime > effect end expected 0 but got 200000",

    "reverse() when playbackRate > 0 and currentTime < 0 and the target effect end is positive infinity":
      "assert_throws: reverse() should throw InvalidStateError if the playbackRate > 0 and the currentTime < 0 and the target effect is positive infinity function \"function () {\n\"use strict\";\n animation.reverse(); }\" did not throw",

    "reverse() when playbackRate < 0 and currentTime < 0 and the target effect end is positive infinity":
      "assert_equals: reverse() should start playing from the start of animation time if the playbackRate < 0 and the currentTime < 0 and the target effect is positive infinity expected 0 but got -200000",
  },

  "test/web-platform-tests/web-animations/document/getAnimations.html": {
    "Test document.getAnimations for non-animated content":
      "document.getAnimations is not a function",

    "Test document.getAnimations for script-generated animations":
      "document.getAnimations is not a function",

    "Test the order of document.getAnimations with script generated animations":
      "document.getAnimations is not a function",

    "Test document.getAnimations with null target":
      "KeyframeEffectReadOnly is not defined",
  },

  "test/web-platform-tests/web-animations/keyframe-effect/constructor.html": {
    "a KeyframeEffectReadOnly can be constructed with no frames":
      "KeyframeEffectReadOnly is not defined",

    "easing values are parsed correctly when passed to the KeyframeEffectReadOnly constructor in a property-indexed keyframe":
      "KeyframeEffectReadOnly is not defined",

    "easing values are parsed correctly when passed to the KeyframeEffectReadOnly constructor in regular keyframes":
      "KeyframeEffectReadOnly is not defined",

    "easing values are parsed correctly when passed to the KeyframeEffectReadOnly constructor in KeyframeTimingOptions":
      "KeyframeEffectReadOnly is not defined",

    "composite values are parsed correctly when passed to the KeyframeEffectReadOnly constructor in property-indexed keyframes":
      "KeyframeEffectReadOnly is not defined",

    "composite values are parsed correctly when passed to the KeyframeEffectReadOnly constructor in regular keyframes":
      "KeyframeEffectReadOnly is not defined",

    "composite values are parsed correctly when passed to the KeyframeEffectReadOnly constructor in KeyframeTimingOptions":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one property two value property-indexed keyframes specification":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one property two value property-indexed keyframes specification roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one shorthand property two value property-indexed keyframes specification":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one shorthand property two value property-indexed keyframes specification roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a two property (one shorthand and one of its longhand components) two value property-indexed keyframes specification":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a two property (one shorthand and one of its longhand components) two value property-indexed keyframes specification roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a two property two value property-indexed keyframes specification":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a two property two value property-indexed keyframes specification roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a two property property-indexed keyframes specification with different numbers of values":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a two property property-indexed keyframes specification with different numbers of values roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a property-indexed keyframes specification with an invalid value":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a property-indexed keyframes specification with an invalid value roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one property two value property-indexed keyframes specification that needs to stringify its values":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one property two value property-indexed keyframes specification that needs to stringify its values roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one property one value property-indexed keyframes specification":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one property one value property-indexed keyframes specification roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one property one non-array value property-indexed keyframes specification":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one property one non-array value property-indexed keyframes specification roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one property two value property-indexed keyframes specification where the first value is invalid":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one property two value property-indexed keyframes specification where the first value is invalid roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one property two value property-indexed keyframes specification where the second value is invalid":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one property two value property-indexed keyframes specification where the second value is invalid roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a two property property-indexed keyframes specification where one property is missing from the first keyframe":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a two property property-indexed keyframes specification where one property is missing from the first keyframe roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a two property property-indexed keyframes specification where one property is missing from the last keyframe":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a two property property-indexed keyframes specification where one property is missing from the last keyframe roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a property-indexed keyframes specification with repeated values at offset 0 with different easings":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a property-indexed keyframes specification with repeated values at offset 0 with different easings roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "the KeyframeEffectReadOnly constructor reads keyframe properties in the expected order":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one property one keyframe sequence":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one property one keyframe sequence roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one property two keyframe sequence":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one property two keyframe sequence roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a two property two keyframe sequence":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a two property two keyframe sequence roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one shorthand property two keyframe sequence":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one shorthand property two keyframe sequence roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a two property (a shorthand and one of its component longhands) two keyframe sequence":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a two property (a shorthand and one of its component longhands) two keyframe sequence roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a keyframe sequence with duplicate values for a given interior offset":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a keyframe sequence with duplicate values for a given interior offset roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a keyframe sequence with duplicate values for offsets 0 and 1":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a keyframe sequence with duplicate values for offsets 0 and 1 roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a two property four keyframe sequence":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a two property four keyframe sequence roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a single keyframe sequence with omitted offsets":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a single keyframe sequence with omitted offsets roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one property keyframe sequence with some omitted offsets":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one property keyframe sequence with some omitted offsets roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a two property keyframe sequence with some omitted offsets":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a two property keyframe sequence with some omitted offsets roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one property keyframe sequence with all omitted offsets":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one property keyframe sequence with all omitted offsets roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a keyframe sequence with different easing values, but the same easing value for a given offset":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a keyframe sequence with different easing values, but the same easing value for a given offset roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a keyframe sequence with different composite values, but the same composite value for a given offset":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a keyframe sequence with different composite values, but the same composite value for a given offset roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a one property two keyframe sequence that needs to stringify its values":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a one property two keyframe sequence that needs to stringify its values roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a keyframe sequence where shorthand precedes longhand":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a keyframe sequence where shorthand precedes longhand roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a keyframe sequence where longhand precedes shorthand":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a keyframe sequence where longhand precedes shorthand roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a keyframe sequence where lesser shorthand precedes greater shorthand":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a keyframe sequence where lesser shorthand precedes greater shorthand roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly can be constructed with a keyframe sequence where greater shorthand precedes lesser shorthand":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed with a keyframe sequence where greater shorthand precedes lesser shorthand roundtrips":
      "KeyframeEffectReadOnly is not defined",

    "KeyframeEffectReadOnly constructor throws with keyframes with an out-of-bounded positive offset":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "KeyframeEffectReadOnly constructor throws with keyframes with an out-of-bounded negative offset":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "KeyframeEffectReadOnly constructor throws with keyframes not loosely sorted by offset":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "KeyframeEffectReadOnly constructor throws with property-indexed keyframes with an invalid easing value":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "KeyframeEffectReadOnly constructor throws with a keyframe sequence with an invalid easing value":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "KeyframeEffectReadOnly constructor throws with keyframes with an invalid composite value":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid easing [a blank easing] in keyframe sequence should be thrown":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"TypeError\" (\"TypeError\")",

    "Invalid easing [an unrecognized easing] in keyframe sequence should be thrown":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"TypeError\" (\"TypeError\")",

    "Invalid easing [an 'initial' easing] in keyframe sequence should be thrown":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"TypeError\" (\"TypeError\")",

    "Invalid easing [an 'inherit' easing] in keyframe sequence should be thrown":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"TypeError\" (\"TypeError\")",

    "Invalid easing [a variable easing] in keyframe sequence should be thrown":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"TypeError\" (\"TypeError\")",

    "Invalid easing [a multi-value easing] in keyframe sequence should be thrown":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"TypeError\" (\"TypeError\")",

    "a KeyframeEffectReadOnly constructed without any KeyframeEffectOptions object":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed by an empty KeyframeEffectOptions object":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed by a normal KeyframeEffectOptions object":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed by a double value":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed by +Infinity":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed by an Infinity duration":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed by an auto duration":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed by an Infinity iterations":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed by an auto fill":
      "KeyframeEffectReadOnly is not defined",

    "a KeyframeEffectReadOnly constructed by a forwards fill":
      "KeyframeEffectReadOnly is not defined",

    "Invalid KeyframeEffectReadOnly option by -Infinity":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by NaN":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by a negative value":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by a negative Infinity duration":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by a NaN duration":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by a negative duration":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by a string duration":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by a negative Infinity iterations":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by a NaN iterations":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by a negative iterations":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by a blank easing":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by an unrecognized easing":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by an 'initial' easing":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by an 'inherit' easing":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by a variable easing":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "Invalid KeyframeEffectReadOnly option by a multi-value easing":
      "assert_throws: function \"function () {\n\"use strict\";\n\n      new KeyframeEffectRead...\" threw object \"ReferenceError: KeyframeEffectReadOnly is not defined\" (\"ReferenceError\") expected object \"[object Object]\" (\"TypeError\")",

    "a KeyframeEffectReadOnly constructed with null target":
      "KeyframeEffectReadOnly is not defined",

    "KeyframeEffect constructor creates an AnimationEffectTiming timing object":
      "assert_equals: expected \"[object KeyframeEffect]\" but got \"[object Object]\"",
  },

  "test/web-platform-tests/web-animations/keyframe-effect/getComputedTiming.html": {
    "values of getComputedTiming() when a KeyframeEffectReadOnly is constructed without any KeyframeEffectOptions object":
      "KeyframeEffectReadOnly is not defined",

    "values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by an empty KeyframeEffectOptions object":
      "KeyframeEffectReadOnly is not defined",

    "values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by a normal KeyframeEffectOptions object":
      "KeyframeEffectReadOnly is not defined",

    "values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by a double value":
      "KeyframeEffectReadOnly is not defined",

    "values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by +Infinity":
      "KeyframeEffectReadOnly is not defined",

    "values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by an Infinity duration":
      "KeyframeEffectReadOnly is not defined",

    "values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by an auto duration":
      "KeyframeEffectReadOnly is not defined",

    "values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by an Infinity iterations":
      "KeyframeEffectReadOnly is not defined",

    "values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by an auto fill":
      "KeyframeEffectReadOnly is not defined",

    "values of getComputedTiming() when a KeyframeEffectReadOnly is constructed by a forwards fill":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for an empty KeyframeEffectOptions object":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for a non-zero duration and default iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for a non-zero duration and integral iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for a non-zero duration and fractional iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for an non-zero duration and infinite iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for an non-zero duration and zero iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for a zero duration and default iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for a zero duration and fractional iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for a zero duration and infinite iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for a zero duration and zero iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for an infinite duration and default iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for an infinite duration and zero iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for an infinite duration and fractional iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().activeDuration for an infinite duration and infinite iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().endTime for an empty KeyframeEffectOptions object":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().endTime for a non-zero duration and default iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().endTime for a non-zero duration and non-default iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().endTime for a non-zero duration and non-zero delay":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().endTime for a non-zero duration, non-zero delay and non-default iteration":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().endTime for an infinite iteration count":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().endTime for an infinite duration":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().endTime for an infinite duration and delay":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().endTime for an infinite duration and negative delay":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().endTime for an non-zero duration and negative delay":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().endTime for an non-zero duration and negative delay greater than active duration":
      "KeyframeEffectReadOnly is not defined",

    "getComputedTiming().endTime for a zero duration and negative delay":
      "KeyframeEffectReadOnly is not defined",
  },

  "test/web-platform-tests/web-animations/keyframe-effect/keyframe-handling.html": {
    "Overlapping keyframes at 0 and 1 use the appropriate value when the progress is outside the range [0, 1]":
      "assert_equals: When progress is negative, the first keyframe with a 0 offset should be used expected \"0\" but got \"0.151\"",
  },

  "test/web-platform-tests/web-animations/keyframe-effect/setFrames.html": {
    "Keyframes can be replaced with an empty keyframe":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one property two value property-indexed keyframes specification":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one shorthand property two value property-indexed keyframes specification":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a two property (one shorthand and one of its longhand components) two value property-indexed keyframes specification":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a two property two value property-indexed keyframes specification":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a two property property-indexed keyframes specification with different numbers of values":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a property-indexed keyframes specification with an invalid value":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one property two value property-indexed keyframes specification that needs to stringify its values":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one property one value property-indexed keyframes specification":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one property one non-array value property-indexed keyframes specification":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one property two value property-indexed keyframes specification where the first value is invalid":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one property two value property-indexed keyframes specification where the second value is invalid":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a two property property-indexed keyframes specification where one property is missing from the first keyframe":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a two property property-indexed keyframes specification where one property is missing from the last keyframe":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a property-indexed keyframes specification with repeated values at offset 0 with different easings":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one property one keyframe sequence":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one property two keyframe sequence":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a two property two keyframe sequence":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one shorthand property two keyframe sequence":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a two property (a shorthand and one of its component longhands) two keyframe sequence":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a keyframe sequence with duplicate values for a given interior offset":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a keyframe sequence with duplicate values for offsets 0 and 1":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a two property four keyframe sequence":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a single keyframe sequence with omitted offsets":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one property keyframe sequence with some omitted offsets":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a two property keyframe sequence with some omitted offsets":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one property keyframe sequence with all omitted offsets":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a keyframe sequence with different easing values, but the same easing value for a given offset":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a keyframe sequence with different composite values, but the same composite value for a given offset":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a one property two keyframe sequence that needs to stringify its values":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a keyframe sequence where shorthand precedes longhand":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a keyframe sequence where longhand precedes shorthand":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a keyframe sequence where lesser shorthand precedes greater shorthand":
      "effect.setFrames is not a function",

    "Keyframes can be replaced with a keyframe sequence where greater shorthand precedes lesser shorthand":
      "effect.setFrames is not a function",
  },

  "test/web-platform-tests/web-animations/keyframe-effect/setTarget.html": {
    "Test setting target from null to a valid target":
      "assert_equals: Value at 50% progress after setting new target expected \"50px\" but got \"10px\"",

    "Test setting target from a valid target to null":
      "assert_equals: Value after clearing the target expected \"10px\" but got \"50px\"",

    "Test setting target from a valid target to another target":
      "assert_equals: Value of 1st element (currently not targeted) after changing the effect target expected \"10px\" but got \"50px\"",
  },

  "test/web-platform-tests/web-animations/timing-model/animation-effects/active-time.html": {
    "Test progress during before and after phase when fill is none":
      "anim.effect.getComputedTiming is not a function",
  },

  "test/web-platform-tests/web-animations/timing-model/animation-effects/current-iteration.html": {
    "Test currentIteration during before and after phase when fill is none":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:0 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:0 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:0 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:2.5 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:2.5 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:2.5 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:3 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:3 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:3 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:0 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:0 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:0 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:2.5 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:2.5 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:2.5 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:3 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:3 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:3 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:0 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:0 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:0 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:3 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:3 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:3 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:0 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:0 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:0 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:3 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:3 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:3 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",
  },

  "test/web-platform-tests/web-animations/timing-model/animation-effects/simple-iteration-progress.html": {
    "Test zero iterations: iterations:0 iterationStart:0 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:0 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:0 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:2.5 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:2.5 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:2.5 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:3 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:3 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test zero iterations: iterations:0 iterationStart:3 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:0 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:0 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:0 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:2.5 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:2.5 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:2.5 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:3 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:3 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test integer iterations: iterations:3 iterationStart:3 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:0 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:0 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:0 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:3 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:3 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test fractional iterations: iterations:3.5 iterationStart:3 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:0 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:0 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:0 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:3 duration:0 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:3 duration:100 delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",

    "Test infinity iterations: iterations:Infinity iterationStart:3 duration:Infinity delay:1 fill:both":
      "anim.effect.getComputedTiming is not a function",
  },

  "test/web-platform-tests/web-animations/timing-model/animations/set-the-animation-start-time.html": {
    "Setting the start time of an animation without an active timeline":
      "Animation with null timeline is not supported",

    "Setting an unresolved start time an animation without an active timeline does not clear the current time":
      "Animation with null timeline is not supported",

    "Setting the start time clears the hold time":
      "assert_equals: The current time is calculated from the hold time expected (number) 1000 but got (object) null",

    "Setting an unresolved start time sets the hold time":
      "assert_equals: expected \"running\" but got \"idle\"",

    "Setting the start time resolves a pending pause task":
      "assert_equals: Animation is in pause-pending state expected \"pending\" but got \"idle\"",

    "Setting the start time updates the finished state":
      "assert_equals: Seeked to finished state using the startTime expected \"finished\" but got \"idle\"",
  },
};
