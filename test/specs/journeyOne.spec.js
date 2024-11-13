import landingPage from '~/test/page-objects/landingPage'
import toFromFarmPage from '~/test/page-objects/toFromFarmPage'
import loadPageAndVerifyTitle from '~/test/helpers/loadPageHelper'

describe('Full journey test 1', () => {
  beforeEach('Navigate to the landing page', async () => {
    await loadPageAndVerifyTitle('', landingPage.pageTitle)
  })

  it('Should navigate you through the first journey happy path', async () => {
    await landingPage.verifyStartNowButton('Start now', true)
    await toFromFarmPage.selectOnFarmAndContinue()
  })
})