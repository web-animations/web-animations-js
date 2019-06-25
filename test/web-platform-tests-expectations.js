// Expectations to be used by karma-testharness-adapter.js.
module.exports = {
  skip: {
    'test/web-platform-tests/web-animations/interfaces/Animation/constructor.html':
        'KeyframeEffectReadOnly is not defined causing the test to timeout.',
  },

  flakyTestIndicator: 'FLAKY_TEST_RESULT',

  // Schema for failureConfigurations:
  // failureConfigurations := [ <failureConfiguration> ]
  // failureConfiguration := { configuration: <configuration>?, failures: <failures> }
  // configuration := { target: <string>?, withNativeFallback: <bool>? }
  // failures := { <test URL>: { <test name>: <failure message> } }
  failureConfigurations: [
    {
      configuration: {
        target: 'web-animations',
        withNativeFallback: true,
      },
      failures: {
      },
    },
    {
      configuration: {
        target: 'web-animations',
        withNativeFallback: false,
      },
      failures: {
        'test/web-platform-tests/web-animations/animation-model/keyframe-effects/effect-value-context.html': {
          'Effect values reflect changes to font-size from reparenting':
              'animation.ready is undefined',

          'Effect values reflect changes to font-size when computed style is not immediately flushed':
              'animation.ready is undefined',

          'Effect values reflect changes to target element':
              'animation.effect is undefined',
        },

        'test/web-platform-tests/web-animations/interfaces/Animation/cancel.html': {
          'After cancelling an animation, it can still be re-used':
              'animation.ready is undefined',

          'After cancelling an animation, it can still be seeked':
              'animation.effect is undefined',

          'Animated style is cleared after calling Animation.cancel()':
              'animation.ready is undefined',
        },

        'test/web-platform-tests/web-animations/interfaces/Animation/pause.html': {
          'pause() a running animation':
              'animation.ready is undefined',

          'pause() from idle':
              'assert_true: initially pause-pending expected true got undefined',

          'pause() from idle with a negative playbackRate':
              'animation.ready is undefined',

          'pause() on a finished animation':
              'animation.ready is undefined',
        },

        'test/web-platform-tests/web-animations/interfaces/Animation/play.html': {
          'play() throws when seeking an infinite-duration animation played in reverse':
              'animation.ready is undefined',
        },

        'test/web-platform-tests/web-animations/interfaces/Animation/startTime.html': {
          'startTime is resolved when running':
              'animation.ready is undefined',
        },

        'test/web-platform-tests/web-animations/timing-model/animation-effects/active-time.html': {
          'Active time in active phase and negative start delay is the local time minus the start delay':
              'anim.effect is undefined',

          'Active time in active phase and no start delay is the local time':
              'anim.effect is undefined',

          'Active time in active phase and positive start delay is the local time minus the start delay':
              'anim.effect is undefined',

          'Active time in after phase with \'both\' fill is the active duration':
              'anim.effect is undefined',

          'Active time in after phase with backwards-only fill is unresolved':
              'anim.effect is undefined',

          'Active time in after phase with forwards fill and negative end delay greater in magnitude than the active duration is zero':
              'anim.effect is undefined',

          'Active time in after phase with forwards fill and negative end delay greater in magnitude than the sum of the active duration and start delay is zero':
              'anim.effect is undefined',

          'Active time in after phase with forwards fill and negative end delay is the active duration + end delay':
              'anim.effect is undefined',

          'Active time in after phase with forwards fill and positive end delay is the active duration':
              'anim.effect is undefined',

          'Active time in after phase with forwards fill is the active duration':
              'anim.effect is undefined',

          'Active time in after phase with forwards fill, zero-duration, and  infinite iteration count is the active duration':
              'anim.effect is undefined',

          'Active time in after phase with no fill is unresolved':
              'anim.effect is undefined',

          'Active time in before phase':
              'anim.effect is undefined',
        },

        'test/web-platform-tests/web-animations/timing-model/animation-effects/simple-iteration-progress.html': {
          'Test end delay: duration:100 delay:1 fill:both endDelay:-100':
              'effect is undefined',

          'Test end delay: duration:100 delay:1 fill:both endDelay:-200':
              'effect is undefined',

          'Test end delay: duration:100 delay:1 fill:both endDelay:-50':
              'effect is undefined',

          'Test end delay: duration:100 delay:1 fill:both endDelay:50':
              'effect is undefined',

          'Test end delay: iterationStart:0.5 duration:100 delay:1 fill:both endDelay:-100':
              'effect is undefined',

          'Test end delay: iterationStart:0.5 duration:100 delay:1 fill:both endDelay:-50':
              'effect is undefined',

          'Test end delay: iterationStart:0.5 duration:100 delay:1 fill:both endDelay:50':
              'effect is undefined',

          'Test end delay: iterations:1 iterationStart:2 duration:100 delay:1 fill:both endDelay:-100':
              'effect is undefined',

          'Test end delay: iterations:1 iterationStart:2 duration:100 delay:1 fill:both endDelay:-50':
              'effect is undefined',

          'Test end delay: iterations:2 duration:100 delay:1 fill:both endDelay:-100':
              'effect is undefined',

          'Test fractional iterations: iterations:3.5 iterationStart:0 duration:0 delay:1 fill:both':
              'effect is undefined',

          'Test fractional iterations: iterations:3.5 iterationStart:0 duration:100 delay:1 fill:both':
              'effect is undefined',

          'Test fractional iterations: iterations:3.5 iterationStart:0 duration:Infinity delay:1 fill:both':
              'effect is undefined',

          'Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:0 delay:1 fill:both':
              'effect is undefined',

          'Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:100 delay:1 fill:both':
              'effect is undefined',

          'Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:Infinity delay:1 fill:both':
              'effect is undefined',

          'Test fractional iterations: iterations:3.5 iterationStart:3 duration:0 delay:1 fill:both':
              'effect is undefined',

          'Test fractional iterations: iterations:3.5 iterationStart:3 duration:100 delay:1 fill:both':
              'effect is undefined',

          'Test fractional iterations: iterations:3.5 iterationStart:3 duration:Infinity delay:1 fill:both':
              'effect is undefined',

          'Test infinity iterations: iterations:Infinity iterationStart:0 duration:0 delay:1 fill:both':
              'effect is undefined',

          'Test infinity iterations: iterations:Infinity iterationStart:0 duration:100 delay:1 fill:both':
              'effect is undefined',

          'Test infinity iterations: iterations:Infinity iterationStart:0 duration:Infinity delay:1 fill:both':
              'effect is undefined',

          'Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:0 delay:1 fill:both':
              'effect is undefined',

          'Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:100 delay:1 fill:both':
              'effect is undefined',

          'Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:Infinity delay:1 fill:both':
              'effect is undefined',

          'Test infinity iterations: iterations:Infinity iterationStart:3 duration:0 delay:1 fill:both':
              'effect is undefined',

          'Test infinity iterations: iterations:Infinity iterationStart:3 duration:100 delay:1 fill:both':
              'effect is undefined',

          'Test infinity iterations: iterations:Infinity iterationStart:3 duration:Infinity delay:1 fill:both':
              'effect is undefined',

          'Test integer iterations: iterations:3 iterationStart:0 duration:0 delay:1 fill:both':
              'effect is undefined',

          'Test integer iterations: iterations:3 iterationStart:0 duration:100 delay:1 fill:both':
              'effect is undefined',

          'Test integer iterations: iterations:3 iterationStart:0 duration:Infinity delay:1 fill:both':
              'effect is undefined',

          'Test integer iterations: iterations:3 iterationStart:2.5 duration:0 delay:1 fill:both':
              'effect is undefined',

          'Test integer iterations: iterations:3 iterationStart:2.5 duration:100 delay:1 fill:both':
              'effect is undefined',

          'Test integer iterations: iterations:3 iterationStart:2.5 duration:Infinity delay:1 fill:both':
              'effect is undefined',

          'Test integer iterations: iterations:3 iterationStart:3 duration:0 delay:1 fill:both':
              'effect is undefined',

          'Test integer iterations: iterations:3 iterationStart:3 duration:100 delay:1 fill:both':
              'effect is undefined',

          'Test integer iterations: iterations:3 iterationStart:3 duration:Infinity delay:1 fill:both':
              'effect is undefined',

          'Test negative playback rate: duration:0 delay:1 fill:both playbackRate:-1':
              'effect is undefined',

          'Test negative playback rate: duration:0 iterations:0 delay:1 fill:both playbackRate:-1':
              'effect is undefined',

          'Test negative playback rate: duration:1 delay:1 fill:both playbackRate:-1':
              'effect is undefined',

          'Test zero iterations: iterations:0 iterationStart:0 duration:0 delay:1 fill:both':
              'effect is undefined',

          'Test zero iterations: iterations:0 iterationStart:0 duration:100 delay:1 fill:both':
              'effect is undefined',

          'Test zero iterations: iterations:0 iterationStart:0 duration:Infinity delay:1 fill:both':
              'effect is undefined',

          'Test zero iterations: iterations:0 iterationStart:2.5 duration:0 delay:1 fill:both':
              'effect is undefined',

          'Test zero iterations: iterations:0 iterationStart:2.5 duration:100 delay:1 fill:both':
              'effect is undefined',

          'Test zero iterations: iterations:0 iterationStart:2.5 duration:Infinity delay:1 fill:both':
              'effect is undefined',

          'Test zero iterations: iterations:0 iterationStart:3 duration:0 delay:1 fill:both':
              'effect is undefined',

          'Test zero iterations: iterations:0 iterationStart:3 duration:100 delay:1 fill:both':
              'effect is undefined',

          'Test zero iterations: iterations:0 iterationStart:3 duration:Infinity delay:1 fill:both':
              'effect is undefined',
        },
      },
    },
    {
      configuration: {
        target: 'web-animations-next',
        withNativeFallback: true,
      },
      failures: {
        'test/web-platform-tests/web-animations/animation-model/keyframe-effects/effect-value-context.html': {
          'Effect values reflect changes to target element':
              'assert_equals: Effect value after updating target element expected "300px" but got "0px"',
        },

        'test/web-platform-tests/web-animations/interfaces/Animation/cancel.html': {
          'After cancelling an animation, it can still be seeked':
              'animation.effect.updateTiming is not a function',
        },

        'test/web-platform-tests/web-animations/interfaces/Animation/pause.html': {
          'pause() from idle':
              'assert_true: initially pause-pending expected true got undefined',
        },

        'test/web-platform-tests/web-animations/interfaces/Animation/startTime.html': {
          'startTime is resolved when running':
              'assert_greater_than: startTime when running expected a number but got a "object"',
        },

        'test/web-platform-tests/web-animations/timing-model/animation-effects/active-time.html': {
          'Active time in active phase and negative start delay is the local time minus the start delay':
              'anim.effect.getComputedTiming is not a function',

          'Active time in active phase and no start delay is the local time':
              'anim.effect.getComputedTiming is not a function',

          'Active time in active phase and positive start delay is the local time minus the start delay':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with \'both\' fill is the active duration':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with backwards-only fill is unresolved':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with forwards fill and negative end delay greater in magnitude than the active duration is zero':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with forwards fill and negative end delay greater in magnitude than the sum of the active duration and start delay is zero':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with forwards fill and negative end delay is the active duration + end delay':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with forwards fill and positive end delay is the active duration':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with forwards fill is the active duration':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with forwards fill, zero-duration, and  infinite iteration count is the active duration':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with no fill is unresolved':
              'anim.effect.getComputedTiming is not a function',

          'Active time in before phase':
              'anim.effect.getComputedTiming is not a function',

          'Active time when the local time is unresolved, is unresolved':
              'effect.getComputedTiming is not a function',
        },

        'test/web-platform-tests/web-animations/timing-model/animation-effects/simple-iteration-progress.html': {
          'Test end delay: duration:100 delay:1 fill:both endDelay:-100':
              'effect.getComputedTiming is not a function',

          'Test end delay: duration:100 delay:1 fill:both endDelay:-200':
              'effect.getComputedTiming is not a function',

          'Test end delay: duration:100 delay:1 fill:both endDelay:-50':
              'effect.getComputedTiming is not a function',

          'Test end delay: duration:100 delay:1 fill:both endDelay:50':
              'effect.getComputedTiming is not a function',

          'Test end delay: iterationStart:0.5 duration:100 delay:1 fill:both endDelay:-100':
              'effect.getComputedTiming is not a function',

          'Test end delay: iterationStart:0.5 duration:100 delay:1 fill:both endDelay:-50':
              'effect.getComputedTiming is not a function',

          'Test end delay: iterationStart:0.5 duration:100 delay:1 fill:both endDelay:50':
              'effect.getComputedTiming is not a function',

          'Test end delay: iterations:1 iterationStart:2 duration:100 delay:1 fill:both endDelay:-100':
              'effect.getComputedTiming is not a function',

          'Test end delay: iterations:1 iterationStart:2 duration:100 delay:1 fill:both endDelay:-50':
              'effect.getComputedTiming is not a function',

          'Test end delay: iterations:2 duration:100 delay:1 fill:both endDelay:-100':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:0 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:0 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:0 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:3 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:3 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:3 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:0 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:0 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:0 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:3 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:3 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:3 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:0 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:0 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:0 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:2.5 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:2.5 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:2.5 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:3 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:3 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:3 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test negative playback rate: duration:0 delay:1 fill:both playbackRate:-1':
              'effect.getComputedTiming is not a function',

          'Test negative playback rate: duration:0 iterations:0 delay:1 fill:both playbackRate:-1':
              'effect.getComputedTiming is not a function',

          'Test negative playback rate: duration:1 delay:1 fill:both playbackRate:-1':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:0 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:0 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:0 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:2.5 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:2.5 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:2.5 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:3 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:3 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:3 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',
        },
      },
    },
    {
      configuration: {
        target: 'web-animations-next',
        withNativeFallback: false,
      },
      failures: {
        'test/web-platform-tests/web-animations/animation-model/keyframe-effects/effect-value-context.html': {
          'Effect values reflect changes to target element':
              'assert_equals: Effect value after updating target element expected "300px" but got "0px"',
        },

        'test/web-platform-tests/web-animations/interfaces/Animation/cancel.html': {
          'After cancelling an animation, it can still be seeked':
              'animation.effect.updateTiming is not a function',
        },

        'test/web-platform-tests/web-animations/interfaces/Animation/pause.html': {
          'pause() from idle':
              'assert_true: initially pause-pending expected true got undefined',
        },

        'test/web-platform-tests/web-animations/timing-model/animation-effects/active-time.html': {
          'Active time in active phase and negative start delay is the local time minus the start delay':
              'anim.effect.getComputedTiming is not a function',

          'Active time in active phase and no start delay is the local time':
              'anim.effect.getComputedTiming is not a function',

          'Active time in active phase and positive start delay is the local time minus the start delay':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with \'both\' fill is the active duration':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with backwards-only fill is unresolved':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with forwards fill and negative end delay greater in magnitude than the active duration is zero':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with forwards fill and negative end delay greater in magnitude than the sum of the active duration and start delay is zero':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with forwards fill and negative end delay is the active duration + end delay':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with forwards fill and positive end delay is the active duration':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with forwards fill is the active duration':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with forwards fill, zero-duration, and  infinite iteration count is the active duration':
              'anim.effect.getComputedTiming is not a function',

          'Active time in after phase with no fill is unresolved':
              'anim.effect.getComputedTiming is not a function',

          'Active time in before phase':
              'anim.effect.getComputedTiming is not a function',

          'Active time when the local time is unresolved, is unresolved':
              'effect.getComputedTiming is not a function',
        },

        'test/web-platform-tests/web-animations/timing-model/animation-effects/simple-iteration-progress.html': {
          'Test end delay: duration:100 delay:1 fill:both endDelay:-100':
              'effect.getComputedTiming is not a function',

          'Test end delay: duration:100 delay:1 fill:both endDelay:-200':
              'effect.getComputedTiming is not a function',

          'Test end delay: duration:100 delay:1 fill:both endDelay:-50':
              'effect.getComputedTiming is not a function',

          'Test end delay: duration:100 delay:1 fill:both endDelay:50':
              'effect.getComputedTiming is not a function',

          'Test end delay: iterationStart:0.5 duration:100 delay:1 fill:both endDelay:-100':
              'effect.getComputedTiming is not a function',

          'Test end delay: iterationStart:0.5 duration:100 delay:1 fill:both endDelay:-50':
              'effect.getComputedTiming is not a function',

          'Test end delay: iterationStart:0.5 duration:100 delay:1 fill:both endDelay:50':
              'effect.getComputedTiming is not a function',

          'Test end delay: iterations:1 iterationStart:2 duration:100 delay:1 fill:both endDelay:-100':
              'effect.getComputedTiming is not a function',

          'Test end delay: iterations:1 iterationStart:2 duration:100 delay:1 fill:both endDelay:-50':
              'effect.getComputedTiming is not a function',

          'Test end delay: iterations:2 duration:100 delay:1 fill:both endDelay:-100':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:0 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:0 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:0 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:2.5 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:3 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:3 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test fractional iterations: iterations:3.5 iterationStart:3 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:0 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:0 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:0 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:2.5 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:3 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:3 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test infinity iterations: iterations:Infinity iterationStart:3 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:0 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:0 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:0 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:2.5 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:2.5 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:2.5 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:3 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:3 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test integer iterations: iterations:3 iterationStart:3 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test negative playback rate: duration:0 delay:1 fill:both playbackRate:-1':
              'effect.getComputedTiming is not a function',

          'Test negative playback rate: duration:0 iterations:0 delay:1 fill:both playbackRate:-1':
              'effect.getComputedTiming is not a function',

          'Test negative playback rate: duration:1 delay:1 fill:both playbackRate:-1':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:0 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:0 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:0 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:2.5 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:2.5 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:2.5 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:3 duration:0 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:3 duration:100 delay:1 fill:both':
              'effect.getComputedTiming is not a function',

          'Test zero iterations: iterations:0 iterationStart:3 duration:Infinity delay:1 fill:both':
              'effect.getComputedTiming is not a function',
        },
      },
    },
  ],
};
