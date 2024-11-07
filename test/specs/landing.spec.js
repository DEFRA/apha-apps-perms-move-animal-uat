import { browser, expect } from '@wdio/globals'

import landingPage from '~/test/page-objects/landingPage'

describe('Home page', () => {
  it('Should verify start now button visible on landing page', async () => {
    await landingPage.open('')

    await expect(browser).toHaveTitle('Home | Applications and permissions')
    await landingPage.verifyPageHeading(
      'Apply for an animal disease movement licence'
    )
    await landingPage.verifyStartNowButton('Start now')
  })
})
