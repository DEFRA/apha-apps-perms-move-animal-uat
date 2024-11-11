import { browser, expect } from '@wdio/globals'

import landingPage from '~/test/page-objects/landingPage'

describe('Home page', () => {
  beforeEach('Navigate to landing page', async () => {
    await landingPage.open('')
  })

  it('Should verify start now button visible on landing page', async () => {
    await expect(browser).toHaveTitle(
      'Apply for an animal disease movement licence | Applications and permissions'
    )
    await landingPage.verifyPrivateBetaBanner()
    await landingPage.verifyPageHeading(
      'Apply for an animal disease movement licence'
    )
    await landingPage.verifyStartNowButton('Start now')
  })
})
