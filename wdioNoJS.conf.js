const merge = require('deepmerge')
const wdioConf = require('./wdio.conf')

exports.config = merge(wdioConf.config, {
  specs: ['./test/specs/noJavascript/**/*.js'],
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'stable',
      'goog:chromeOptions': {
        prefs: { 'profile.managed_default_content_settings.javascript': 2 },
        args: ['headless', 'disable-gpu']
      }
    }
  ]
})
