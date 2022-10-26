import {Mode} from './common-types'

interface MatchPhraseOptions {
  comment: string
  phrase: string
  mode: Mode
  isCodeIncluded: boolean
}
interface MatchPhraseResult {
  matchFound: boolean
}

export function maskCodeSnippets(comment: string): string {
  const mask = '******'

  return comment
    .trim()
    .replace(/(```.+?```)/gms, mask) // mask code blocks first
    .replace(/(`.+?`)/gms, mask)
}

export function matchPhrase({
  comment: originalComment = '',
  phrase,
  mode = 'starts_line',
  isCodeIncluded
}: MatchPhraseOptions): MatchPhraseResult {
  const sanitizedComment = originalComment.trim()
  if (!sanitizedComment || !phrase) return {matchFound: false}

  const comment = isCodeIncluded
    ? sanitizedComment
    : maskCodeSnippets(sanitizedComment)

  switch (mode) {
    /**
     * Checks if phrase starts any line of the comment
     */
    case 'starts_line': {
      const commentLines: string[] = comment.split('\n').filter(Boolean)

      return {
        matchFound: commentLines.some(line => line.trim().startsWith(phrase))
      }
    }

    /**
     * Checks if phrase is at the beginning of the comment
     */
    case 'starts_comment': {
      return {matchFound: comment.startsWith(phrase)}
    }

    /**
     * Checks if phrase is anywhere within the comment
     */
    case 'within': {
      return {matchFound: comment.includes(phrase)}
    }

    default: {
      return {matchFound: false}
    }
  }
}
