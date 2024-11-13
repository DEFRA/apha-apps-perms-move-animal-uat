import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class LandingPage extends Page {
  get startNowButton() {
    return $('[data-testid="start-now-btn"]')
  }

  get pageTitle() {
    return 'Apply for an animal disease movement licence'
  }

  async verifyStartNowButton(text, click = false) {
    await super.validateElementVisibleAndText(this.startNowButton, text)
    if (click) {
      await super.selectElement(this.startNowButton)
    }
  }
}

export default new LandingPage()
