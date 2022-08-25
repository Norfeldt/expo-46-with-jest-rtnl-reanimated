// https://github.com/callstack/react-native-testing-library/issues/379#issuecomment-1133038481

const nodePromise = Promise

module.exports = (callback) => nodePromise.resolve().then(callback)
