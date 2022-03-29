import axios from 'axios'

/**
 * Check for the correct format of the url
 * @returns boolean true if correct format
 */
export function checkUrlFormat(longUrl, alert) {
  const regex = /^https?:\/\/[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}/
  if (longUrl === '') {
    alert.error('Please, fill with an URL')
    return false
  } else if (longUrl !== '' && !regex.test(longUrl)) {
    alert.error('Please, verify your URL')
    return false
  }
  return true
}
/**
 * Check for the correct format of the alias
 * @returns boolean true if correct format
 */
export function checkAliasFormat(alias, alert) {
  const regex = /[A-Za-z0-9-_]+$/gm
  if (alias !== '') {
    if (!regex.test(alias)) {
      alert.error('Alias must only contain alpha numeric caracter and _ or -')
      return false
    }
  }
  return true
}

/**
 * Check if alias already exist in database
 * @returns boolean true if exist
 */
export function checkAliasAlreadyExist(alias, alert) {
  return new Promise((resolve) => {
    axios
      .post(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/aliasExist`,
        { alias: alias }
      )
      .then(function (response) {
        if (response.data) alert.error('This alias is already in use.')
        resolve(response.data)
      })
      .catch(function (error) {
        console.log(error)
        alert.error(
          'An error occured while cheking alias, please contact administrator.'
        )
        return false
      })
  })
}
