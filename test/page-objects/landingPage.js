import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class LandingPage extends Page {
  get startNowButton() {
    return $('[data-testid="start-now-btn"]')
  }

  async verifyStartNowButton(text) {
    await expect(this.startNowButton).toBeDisplayed()
    await expect(this.startNowButton).toHaveText(text)
  }
}

export default new LandingPage()
