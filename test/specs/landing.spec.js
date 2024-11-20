import { browser, expect } from '@wdio/globals'

import landingPage from '~/test/page-objects/landingPage'
import toFromFarmPage from '~/test/page-objects/toFromFarmPage'
import loadPageAndVerifyTitle from '~/test/helpers/loadPageHelper'

describe('Home page', () => {
  beforeEach('Navigate to landing page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle('', landingPage.pageTitle)
  })

  it('Should verify start now button visible on landing page', async () => {
    await landingPage.verifyPrivateBetaBanner()
    await landingPage.verifyPageHeading(
      'Apply for a Bovine Tuberculosis (TB) movement licence'
    )
    await landingPage.verifyStartNowButton('Start now')
  })

  it('Should verify that start now navigates you to first question and back link returns you', async () => {
    await landingPage.verifyStartNowButton('Start now', true)
    await expect(browser).toHaveTitle(toFromFarmPage.toFromFarmTitle)
    await toFromFarmPage.verifyPageHeading(
      'Are you moving the cattle on or off your farm or premises?'
    )
    await toFromFarmPage.selectBackLink()

    await landingPage.verifyStartNowButton('Start now')
  })
})
