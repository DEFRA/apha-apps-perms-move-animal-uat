import { browser, expect } from '@wdio/globals'

import toFromFarmPage from '~/test/page-objects/toFromFarmPage'
import loadPageAndVerifyTitle from '~/test/helpers/loadPageHelper'
import parishHoldingNumberPage from '../page-objects/parishHoldingNumberPage'

describe('Home page', () => {
  beforeEach('Navigate to or from farm page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle(
      toFromFarmPage.urlPath,
      toFromFarmPage.toFromFarmTitle
    )
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await toFromFarmPage.selectContinue()
    await toFromFarmPage.validateElementVisibleAndText(
      toFromFarmPage.pageError,
      'Select if you are moving cattle on or off your farm'
    )
    await toFromFarmPage.validateElementVisibleAndText(
      toFromFarmPage.errorSummary,
      'Select if you are moving cattle on or off your farm'
    )
  })

  it('Should select on the farm radio and continue (currently no where)', async () => {
    await toFromFarmPage.selectOnFarmAndContinue()
    await expect(toFromFarmPage.pageError).not.toBeDisplayed()
    await expect(toFromFarmPage.errorSummary).not.toBeDisplayed()
  })

  it('Should choose an option and check its maintained', async () => {
    await toFromFarmPage.selectOffFarmAndContinue()
    await expect(parishHoldingNumberPage.cphNumberInput).toBeDisplayed()
    await browser.back()
    await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
  })
})
