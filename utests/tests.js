const {describe, it} = require('mocha')
const {expect} = require('chai')
const {Record, Person, Phoneme} = require('.././server/src/model.js')
const {addRecord, addPhonemes, notabs} = require('.././server/src/query.js')


describe('model', function () {
  it('should be an array', () => {
    expect(Record('name', ['1', '2']).tags).to.be.a('array')
  })

  it('should be an object', () => {
    expect(Record('name', ['1', '2'])).to.be.a('object')
  })

  it('should fill null by default', () => {
    expect(Phoneme('1', '2', '3', '4').dialect).to.equal(null)
  })
});

describe('query', function () {
  it('should return string', () => {
    expect(addRecord({}, 1)).to.be.a('string')
  })

});
