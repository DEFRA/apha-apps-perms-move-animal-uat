const merge = require('deepmerge')
const wdioConf = require('./wdio.conf')

exports.config = merge(wdioConf.config, {
  specs: ['./test/specs/parishHolding.spec.js'],
  exclude: ['./test/specs/noJavascript/**/*.js'],
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'stable',
      'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
      }
    }
  ]
})
