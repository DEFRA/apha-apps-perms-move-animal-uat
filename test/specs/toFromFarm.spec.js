import { browser, expect } from '@wdio/globals'

import toFromFarmPage from '~/test/page-objects/toFromFarmPage'
import pageLoadHelper from '~/test/helpers/loadPageHelper'

describe('Home page', () => {
  beforeEach('Navigate to landing page', async () => {
    await browser.reloadSession()
    await pageLoadHelper(toFromFarmPage.urlPath, toFromFarmPage.pageTitle)
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await toFromFarmPage.selectContinue()
    await expect(toFromFarmPage.errorSummary).toBeDisplayed()
    await expect(toFromFarmPage.pageError).toBeDisplayed()
  })

  it('Should select on the farm radio and continue (currently no where)', async () => {
    await toFromFarmPage.selectOnFarmAndContinue()
  })

  it('Should chose an option and check its maintained', async () => {
    await toFromFarmPage.selectOffFarmAndContinue()
    await browser.refresh()
    await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
  })
})
