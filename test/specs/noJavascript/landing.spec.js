import { browser } from '@wdio/globals'

import landingPage from '~/test/page-objects/landingPage'
import toFromFarmPage from '~/test/page-objects/toFromFarmPage'
import loadPageAndVerifyTitle from '~/test/helpers/loadPageHelper'

describe('Home page', () => {
  beforeEach('Navigate to landing page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle('', landingPage.pageTitle)
  })

  it('Should verify that the back link isnt visble when javascript is disabled', async () => {
    await landingPage.verifyStartNowButton('Start now', true)
    await expect(browser).toHaveTitle(toFromFarmPage.pageTitle)
    await toFromFarmPage.verifyPageHeading(
      'Are you moving the cattle on or off your farm?'
    )
    await expect(await toFromFarmPage.backLink.isDisplayed()).toBe(false)
  })
})
