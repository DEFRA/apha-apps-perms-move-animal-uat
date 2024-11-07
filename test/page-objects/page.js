import { browser, $ } from '@wdio/globals'

class Page {
  get pageHeading() {
    return $('h1')
  }

  async verifyPageHeading(headingText) {
    await expect(this.pageHeading).toBeDisplayed()
    await expect(this.pageHeading).toHaveText(headingText)
  }

  open(path) {
    return browser.url(path)
  }
}

export { Page }
