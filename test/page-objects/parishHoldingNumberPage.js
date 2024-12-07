import { Page } from 'page-objects/page'
import * as page from '../helpers/page'

const cphId = 'cph-number'

class ParishHoldingNumberPage extends Page {
  get urlPath() {
    return 'cph-number'
  }

  get parishHoldingTitle() {
    return 'What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?'
  }

  cphNumberInput() {
    return super.getInputField(cphId)
  }

  cphInputFieldError() {
    return super.getErrorElement(cphId)
  }

  cphSummaryErrorLink() {
    return super.getErrorLink(cphId)
  }

  get invalidFormatError() {
    return 'Enter the CPH number in the correct format, for example, 12/345/6789'
  }

  get noInputError() {
    return 'Enter the farm or premises CPH number'
  }

  async inputParishHoldingNumberAndContinue(text) {
    await page.typeIntoElement(this.cphNumberInput(), text)
    await super.selectContinue()
  }

  async parishHoldingErrorTest(textInput, errorMessage) {
    await this.inputParishHoldingNumberAndContinue(textInput)
    await super.verifyErrorsOnPage(this.cphInputFieldError(), errorMessage)
    await super.verifySummaryErrorLink(
      this.cphSummaryErrorLink(),
      this.cphNumberInput()
    )
  }
}

export default new ParishHoldingNumberPage()
