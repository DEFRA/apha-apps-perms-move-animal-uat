import { browser, expect } from '@wdio/globals'

import landingPage from '~/test/page-objects/landingPage'
import toFromFarmPage from '../page-objects/toFromFarmPage'

const navigateThroughLandingPage = async () => {
  await landingPage.verifyStartNowButton('Start now', true)
  await expect(toFromFarmPage.onThefarmRadio).toBeExisting()
}

describe('Home page', () => {
  beforeEach('Navigate to landing page', async () => {
    await landingPage.open('')
    await landingPage.startNowButton.waitForExist({ timeout: 10000 })
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await navigateThroughLandingPage()
    await toFromFarmPage.selectContinue()
    await expect(toFromFarmPage.pageError).toBeDisplayed()
  })

  it('Should verify that start now navigates you to first question and back link returns you', async () => {
    await navigateThroughLandingPage()
    await expect(browser).toHaveTitle(
      'Are you moving the cattle on or off your farm? | Applications and permissions'
    )
    await toFromFarmPage.verifyPageHeading(
      'Are you moving the cattle on or off your farm?'
    )
    await toFromFarmPage.selectBackLink()

    await landingPage.verifyStartNowButton('Start now')
  })

  it('Should select on the farm radio and continue (currently no where)', async () => {
    await navigateThroughLandingPage()
    await toFromFarmPage.selectOnFarmAndContinue()
  })

  it('Should select off the farm radio and continue and then verify answer is maintained', async () => {
    await navigateThroughLandingPage()

    await toFromFarmPage.selectOnFarmAndContinue()
    await toFromFarmPage.selectBackLink()

    await landingPage.verifyStartNowButton('Start now', true)
    await toFromFarmPage.verifyRadioIsSelected(toFromFarmPage.onThefarmRadio)
  })
})
