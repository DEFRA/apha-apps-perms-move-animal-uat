const merge = require('deepmerge')
const wdioConf = require('./wdio.conf')

exports.config = merge(wdioConf.config, {
  specs: ['./test/specs/**/*.js'],
  exclude: ['./test/specs/noJavascript/**/*.js'],
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'stable',
      'goog:chromeOptions': {
        args: ['disable-gpu']
      }
    }
  ]
})
