import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class ToFromFarmPage extends Page {
  get onThefarmRadio() {
    return $('#on-farm-radio')
  }

  get offThefarmRadio() {
    return $('#off-farm-radio')
  }

  get pageError() {
    return $('#onOffFarm-error')
  }

  get toFromFarmTitle() {
    return 'Are you moving the cattle on or off your farm or premises?'
  }

  get urlPath() {
    return 'to-or-from-own-premises'
  }

  async selectOnFarmAndContinue() {
    await super.selectElement(this.onThefarmRadio, true)
    await super.selectContinue()
  }

  async selectOffFarmAndContinue() {
    await super.selectElement(this.offThefarmRadio, true)
    await super.selectContinue()
  }

  async toFromFarmErrorTest(errorMessage) {
    await super.selectContinue()
    await super.verifyErrorsOnPage(this.pageError, errorMessage)
  }
}

export default new ToFromFarmPage()
