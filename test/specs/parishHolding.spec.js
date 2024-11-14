import { browser } from '@wdio/globals'

import loadPageAndVerifyTitle from '~/test/helpers/loadPageHelper'
import ParishHoldingNumberPage from '../page-objects/parishHoldingNumberPage'

const parishHoldingErrorTest = async (textInput, errorMessage) => {
  await ParishHoldingNumberPage.inputParishHoldingHNumberAndContinue(textInput)
  await ParishHoldingNumberPage.validateElementVisibleAndText(
    ParishHoldingNumberPage.cphInputFieldError,
    errorMessage
  )
  await ParishHoldingNumberPage.validateElementVisibleAndText(
    ParishHoldingNumberPage.errorSummary,
    errorMessage
  )
}

describe('Home page', () => {
  beforeEach('Parish holding page test', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle(
      ParishHoldingNumberPage.urlPath,
      ParishHoldingNumberPage.parishHoldingTitle
    )
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await parishHoldingErrorTest('', 'Enter the farm or premises CPH number')
  })

  it('Should verify that page errors when not enough is entered', async () => {
    await parishHoldingErrorTest(
      '12/345/678',
      'Enter the CPH number in the correct format, for example, 12/345/6789'
    )
  })

  it('Should verify that page errors when too much is entered', async () => {
    await parishHoldingErrorTest(
      '12/345/67891',
      'Enter the CPH number in the correct format, for example, 12/345/6789'
    )
  })

  it('Should input correct number format and continue without producing an error', async () => {
    await ParishHoldingNumberPage.inputParishHoldingHNumberAndContinue(
      '12/345/6789'
    )
    await expect(ParishHoldingNumberPage.cphInputFieldError).not.toBeDisplayed()
    await expect(ParishHoldingNumberPage.errorSummary).not.toBeDisplayed()
  })
})
