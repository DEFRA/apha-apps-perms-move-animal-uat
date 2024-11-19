import { browser } from '@wdio/globals'

import loadPageAndVerifyTitle from '~/test/helpers/loadPageHelper'
import ParishHoldingNumberPage from '../page-objects/parishHoldingNumberPage'

describe('Home page', () => {
  beforeEach('Parish holding page test', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle(
      ParishHoldingNumberPage.urlPath,
      ParishHoldingNumberPage.parishHoldingTitle
    )
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '',
      'Enter the farm or premises CPH number'
    )
  })

  it('Should verify that page errors when not enough is entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '12/345/678',
      'Enter the CPH number in the correct format, for example, 12/345/6789'
    )
  })

  it('Should verify that page errors when too much is entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '12/345/67891',
      'Enter the CPH number in the correct format, for example, 12/345/6789'
    )
  })

  it('Should verify that page errors when letters are entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      'te/tes/test',
      'Enter the CPH number in the correct format, for example, 12/345/6789'
    )
  })

  it('Should verify that page errors spaces are included', async () => {
    await ParishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      ' 12 / 345 / 6789 '
    )
    await expect(ParishHoldingNumberPage.cphInputFieldError).not.toBeDisplayed()
    await expect(ParishHoldingNumberPage.cphNumberInput).toHaveValue(
      '12/345/6789'
    )
  })

  it('Should verify that page errors when letters and spaces and numbers are included', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '12 / tes / 67dh',
      'Enter the CPH number in the correct format, for example, 12/345/6789'
    )
  })

  it('Should input correct number format and continue without producing an error', async () => {
    await ParishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      '12/345/6789'
    )
    await expect(ParishHoldingNumberPage.cphInputFieldError).not.toBeDisplayed()
    await expect(ParishHoldingNumberPage.errorSummary).not.toBeDisplayed()
  })

  it('Should choose an option and check its maintained', async () => {
    const validInput = '54/321/1234'
    await ParishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      validInput
    )
    await expect(ParishHoldingNumberPage.cphInputFieldError).not.toBeDisplayed()
    await browser.back()
    await expect(ParishHoldingNumberPage.cphNumberInput).toHaveValue(validInput)
  })
})
