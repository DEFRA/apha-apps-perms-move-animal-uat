import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class ParishHoldingNumberPage extends Page {
  get cphNumberInput() {
    return $('#cph-number')
  }

  get cphInputFieldError() {
    return $('#cph-number-error')
  }

  get urlPath() {
    return 'cph-number'
  }

  get parishHoldingTitle() {
    return 'What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?'
  }

  async inputParishHoldingHNumberAndContinue(text) {
    await super.typeIntoElement(this.cphNumberInput, text)
    await super.selectContinue()
  }

  async parishHoldingErrorTest(textInput, errorMessage) {
    await this.inputParishHoldingHNumberAndContinue(textInput)
    await this.validateElementVisibleAndText(
      this.cphInputFieldError,
      errorMessage
    )
    await this.validateElementVisibleAndText(this.errorSummary, errorMessage)
  }
}

export default new ParishHoldingNumberPage()
