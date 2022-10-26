import * as core from '@actions/core'
import {Mode} from './common-types'
import {resolveBooleanInput} from './resolve-boolean-input'

interface Inputs {
  reactions: string
  githubToken: string
  isPrOnly: boolean
  phrase: string
  mode: Mode
  isCodeIncluded: boolean
}

export function getInputs(): Inputs {
  const {GITHUB_TOKEN} = process.env

  const phrase = core.getInput('phrase', {
    required: true,
    trimWhitespace: true
  })
  const isCodeIncluded = resolveBooleanInput(
    core.getInput('include_code', {trimWhitespace: true})
  )
  const isPrOnly = resolveBooleanInput(
    core.getInput('pr_only', {trimWhitespace: true})
  )
  const mode = core.getInput('mode', {trimWhitespace: true}) as Mode
  const reactions = core.getInput('reactions', {trimWhitespace: true})
  const providedToken = core.getInput('GITHUB_TOKEN', {trimWhitespace: true})

  const githubToken = providedToken || GITHUB_TOKEN || ''

  return {
    reactions,
    githubToken,
    isPrOnly,
    phrase,
    isCodeIncluded,
    mode: mode || 'starts_line'
  }
}
