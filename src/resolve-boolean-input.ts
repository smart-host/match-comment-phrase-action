export const resolveBooleanInput = (value = ''): boolean => {
  return value?.toString()?.toLowerCase() === 'true'
}
