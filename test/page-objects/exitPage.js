import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class ExitPage extends Page {
  get exitPageHeading() {
    return 'This service is not available for your movement type'
  }

  get exitPageTitle() {
    return 'This service is not available for your movement type'
  }

  get exitPageUrlPath() {
    return 'exit-page'
  }

  get viewApplicationLink() {
    return $('[data-testid="view-application-link"]')
  }

  get govUkLink() {
    return $('[data-testid="gov-uk-link"]')
  }

  async verifyViewApplicationLink() {
    const tbFormTitle =
      'TB restricted cattle: application for movement licence in England - GOV.UK'

    await super.selectElement(this.viewApplicationLink)
    await browser.waitUntil(
      async () => (await browser.getTitle()) === tbFormTitle,
      {
        timeoutMsg: `Expected page title to become ${tbFormTitle}`
      }
    )
  }

  async verifyGovUkLink() {
    const govukTitle = 'Welcome to GOV.UK'

    await super.selectElement(this.govUkLink)
    await browser.waitUntil(
      async () => (await browser.getTitle()) === govukTitle,
      {
        timeoutMsg: `Expected page title to become ${govukTitle}`
      }
    )
  }
}

export default new ExitPage()
