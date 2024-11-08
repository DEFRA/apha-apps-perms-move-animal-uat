import { browser, $ } from '@wdio/globals'

class Page {
  get pageHeading() {
    return $('h1')
  }

  get feedbackLink() {
    return $('[data-testid="feedback-link"]')
  }

  get privateBetaBanner() {
    return $('.govuk-phase-banner__content__tag')
  }

  async validateElementVisibleAndText(element, text) {
    await expect(element).toBeDisplayed()
    await expect(element).toHaveText(text)
  }

  async verifyFeedbackLink(text) {
    await this.validateElementVisibleAndText(this.feedbackLink, text)
  }

  async verifyPrivateBetaBanner(
    feedbackText = 'feedback', 
    bannerText = 'Private beta'
  ) {
    await this.validateElementVisibleAndText(this.feedbackLink, feedbackText)
    await this.validateElementVisibleAndText(this.privateBetaBanner, bannerText)
  }

  async verifyPageHeading(headingText) {
    await this.validateElementVisibleAndText(this.pageHeading, headingText)
  }

  open(path) {
    return browser.url(path)
  }
}

export { Page }
