import { browser } from '@wdio/globals'

import loadPageAndVerifyTitle from '~/test/helpers/loadPageHelper'
import newAddressPage from '../page-objects/newAddressPage'

const longString = 'a'.repeat(300)
const truncatedString = 'a'.repeat(255)
const longPostcode = 'SW1A2AATEST'
const truncatedPostcode = 'SW1A2AATES'

const lineOne = '37 Made up lane'
const lineTwo = 'Not real avenue'
const townOrCity = 'Gotham'
const county = 'West new york'
const postcodeValid = 'SW1A 2AA'
const postcodeInvalid = 'test'

describe('New address page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle(
      newAddressPage.urlPath,
      newAddressPage.newAddressPageTitle
    )
  })

  it('Should verify all errors when no input', async () => {
    await newAddressPage.verifyPageHeading(newAddressPage.newAddressPageTitle)
    await newAddressPage.selectContinue()
    await newAddressPage.verifyNewAddressErrors([
      'lineOne',
      'townOrCity',
      'noPostcode'
    ])
  })

  it('Should verify just line one error', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      townOrCity,
      postcode: postcodeValid
    })
    await newAddressPage.verifyNewAddressErrors(['lineOne'])
  })

  it('Should verify error when no input in town or city', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      postcode: postcodeValid
    })
    await newAddressPage.verifyNewAddressErrors(['townOrCity'])
  })

  it('Should verify error when no input in postcode', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      townOrCity
    })
    await newAddressPage.verifyNewAddressErrors(['noPostcode'])
  })

  it('Should verify error when postcode is invalid format', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      townOrCity,
      postcode: postcodeInvalid
    })
    await newAddressPage.verifyNewAddressErrors(['invalidPostcode'])
  })

  it('Should truncate input fields to 256 characters on submission', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne: longString,
      lineTwo: longString,
      townOrCity: longString,
      county: longString,
      postcode: longPostcode
    })

    await newAddressPage.verifyNoErrorsVisible()

    await newAddressPage.selectBackLink()

    await newAddressPage.verifyFieldValues({
      lineOne: truncatedString,
      lineTwo: truncatedString,
      townOrCity: truncatedString,
      county: truncatedString,
      postcode: truncatedPostcode
    })
  })

  it('Should verify successful submission and no errors when optional fields ignored', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      townOrCity,
      postcode: postcodeValid
    })
    await newAddressPage.verifyNoErrorsVisible()
  })

  it('Should verify successful submission when all fields entered', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      lineTwo,
      townOrCity,
      county,
      postcode: postcodeValid
    })

    await newAddressPage.verifyNoErrorsVisible()
    await newAddressPage.selectBackLink()

    await newAddressPage.verifyFieldValues({
      lineOne,
      lineTwo,
      townOrCity,
      county,
      postcode: postcodeValid
    })
  })
})
