import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class ToFroFarmPage extends Page {
  get onThefarmRadio() {
    return $('#on-farm-radio')
  }

  get offThefarmRadio() {
    return $('#on-farm-radio')
  }

  get pageError() {
    return $('#onOffFarm-error')
  }

  async selectOnFarmAndContinue() {
    await super.selectElement(this.onThefarmRadio, true)
    await super.selectContinue()
  }

  async selectOffFarmAndContinue() {
    await super.selectElement(this.offThefarmRadio, true)
    await super.selectContinue()
  }
}

export default new ToFroFarmPage()
