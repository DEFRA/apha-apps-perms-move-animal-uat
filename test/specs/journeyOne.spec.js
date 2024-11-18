import landingPage from '~/test/page-objects/landingPage'
import toFromFarmPage from '~/test/page-objects/toFromFarmPage'
import loadPageAndVerifyTitle from '~/test/helpers/loadPageHelper'
import parishHoldingNumberPage from '../page-objects/parishHoldingNumberPage'

describe('Full journey test 1', () => {
  beforeEach('Navigate to the landing page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle('', landingPage.pageTitle)
  })

  it('Should navigate you through the first journey happy path', async () => {
    await landingPage.verifyStartNowButton('Start now', true)
    await toFromFarmPage.selectOffFarmAndContinue()
    await parishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      '12/345/6789'
    )
  })
})
