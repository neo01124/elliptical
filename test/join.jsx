/** @jsx phrase.createElement */
/* eslint-env mocha */
import es from 'event-stream'
import {expect} from 'chai'
import fulltext from 'lacona-util-fulltext'
import * as lacona from '..'
import * as phrase from 'lacona-phrase'

describe('join', function () {
  var parser
  beforeEach(function () {
    parser = new lacona.Parser()
  })

  it('joins literals onto the suggestion', function (done) {
    function callback (err, data) {
      expect(err).to.not.exist
      expect(data).to.have.length(3)
      expect(fulltext.suggestion(data[1].data)).to.equal('aaabbb')
      done()
    }

    parser.sentences = [
      <sequence>
        <literal text='aaa' />
        <literal text='bbb' join={true} />
      </sequence>
    ]

    es.readArray(['a'])
      .pipe(parser)
      .pipe(es.writeArray(callback))
  })
})
