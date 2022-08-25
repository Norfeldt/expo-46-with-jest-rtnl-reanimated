expect.extend({
  // should be replacable once this PR gets merged https://github.com/testing-library/jest-native/pull/73
  toHaveZeroOpacity(element) {
    let pass = element.props.style?.opacity === 0
    let parent = element.parent
    while (parent && pass === false) {
      if (parent.props.style?.opacity === 0) pass = true
      parent = parent?.parent
    }

    return {
      message: () => 'expected element to be hidden',
      pass,
    }
  },
})
