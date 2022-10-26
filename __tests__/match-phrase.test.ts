import {matchPhrase} from '../src/match-phrase'
import {expect, test, describe} from '@jest/globals'

describe('matchPhrase', () => {
  describe('mode: starts_line', () => {
    test('doesnt match when phrase not in comment', () => {
      expect(
        matchPhrase({
          comment: 'blach blacj\n ioef',
          phrase: '/preview',
          isCodeIncluded: false,
          mode: 'starts_line'
        }).matchFound
      ).toEqual(false)
    })
    test('doesnt match when phrase not found at any start of line', () => {
      expect(
        matchPhrase({
          comment: 'blach blacj\n ioef /preview',
          phrase: '/preview',
          isCodeIncluded: false,
          mode: 'starts_line'
        }).matchFound
      ).toEqual(false)
    })
    test('match when phrase is found at any start of line', () => {
      expect(
        matchPhrase({
          comment: 'blach blacj\n ioef\n /preview',
          phrase: '/preview',
          isCodeIncluded: false,
          mode: 'starts_line'
        }).matchFound
      ).toEqual(true)
    })
  })

  describe('mode: starts_comment', () => {
    test('doesnt match when phrase not in comment', () => {
      expect(
        matchPhrase({
          comment: 'blach blacj\n ioef',
          phrase: '/preview',
          isCodeIncluded: false,
          mode: 'starts_comment'
        }).matchFound
      ).toEqual(false)
    })
    test('doesnt match when phrase not found at any start of line', () => {
      expect(
        matchPhrase({
          comment: 'blach blacj\n ioef /preview',
          phrase: '/preview',
          isCodeIncluded: false,
          mode: 'starts_comment'
        }).matchFound
      ).toEqual(false)
    })
    test('match when phrase is found at start of comment', () => {
      expect(
        matchPhrase({
          comment: '/preview',
          phrase: '/preview',
          isCodeIncluded: false,
          mode: 'starts_comment'
        }).matchFound
      ).toEqual(true)
    })
  })

  describe('mode: within', () => {
    test('doesnt match when phrase not in comment', () => {
      expect(
        matchPhrase({
          comment: 'blach blacj\n ioef',
          phrase: '/preview',
          isCodeIncluded: false,
          mode: 'within'
        }).matchFound
      ).toEqual(false)
    })
    test('doesnt match when phrase is in comment simple code snippet', () => {
      expect(
        matchPhrase({
          comment: 'blach blacj\n ioef `/preview`',
          phrase: '/preview',
          isCodeIncluded: false,
          mode: 'within'
        }).matchFound
      ).toEqual(false)
    })
    test('doesnt match when phrase is in comment multiline code block', () => {
      expect(
        matchPhrase({
          comment: 'blach blacj\n ioef ```ts /preview```',
          phrase: '/preview',
          isCodeIncluded: false,
          mode: 'within'
        }).matchFound
      ).toEqual(false)
    })
    test('match when phrase is found anywhere in the comment', () => {
      expect(
        matchPhrase({
          comment: 'blach blacj\n ioef /preview',
          phrase: '/preview',
          isCodeIncluded: false,
          mode: 'within'
        }).matchFound
      ).toEqual(true)
    })

    describe('isCodeIncluded: true', () => {
      test('match when phrase is found anywhere in the comment and inside simple code snippet', () => {
        expect(
          matchPhrase({
            comment: 'blach blacj\n ioef`/preview`',
            phrase: '/preview',
            isCodeIncluded: true,
            mode: 'within'
          }).matchFound
        ).toEqual(true)
      })
      test('match when phrase is found anywhere in the comment and inside multiline code snippet', () => {
        expect(
          matchPhrase({
            comment: 'blach blacj\n ioef```ts /preview```',
            phrase: '/preview',
            isCodeIncluded: true,
            mode: 'within'
          }).matchFound
        ).toEqual(true)
      })
    })
  })
})
