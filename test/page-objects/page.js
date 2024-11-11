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

  get backLink() {
    return $('.govuk-back-link')
  }

  get continueButton() {
    return $('#continue-button')
  }

  async validateElementVisibleAndText(element, text) {
    await element.waitForExist({ timeout: 10000 })
    await expect(element).toBeDisplayed()
    await expect(element).toHaveText(text)
  }

  async selectElement(element, hidden = false) {
    if (!hidden) {
      await expect(element).toBeDisplayed()
    } else {
      await expect(element).toBeExisting()
    }
    await element.click()
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

  async selectBackLink() {
    await this.selectElement(this.backLink)
  }

  async selectContinue() {
    await this.selectElement(this.continueButton)
  }

  async verifyRadioIsSelected(element) {
    await expect(element).toBeExisting()
    await expect(element).toBeSelected()
  }

  async open(path) {
    await browser.url(path)
  }
}

export { Page }
