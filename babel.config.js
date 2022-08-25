// Changes to this file requires a `expo start -c` to clear the cache and take effect.
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '~': './',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
