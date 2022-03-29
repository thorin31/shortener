import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Loader } from '../../app/app'
import { useAlert } from 'react-alert'
import Success from '../Success'
import {
  checkUrlFormat,
  checkAliasFormat,
  checkAliasAlreadyExist,
} from '../../tools/validation'

const FormWrapper = styled.form`
  max-width: 400px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  position: relative;
`

const FieldWrapper = styled.div`
  width: 100%;
`
const ButtonWrapper = styled.div`
  width: 100%;
  text-align: right;
`
const SInput = styled.input`
  color: #5843e4;
  font-size: 22px;
  font-weight: normal;
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid grey;
  width: 100%;
  margin-bottom: 20px;
`

const SButton = styled.button`
  color: #fff;
  font-size: 22px;
  background-color: #5843e4;
  padding: 5px 15px;
  border: 1px solid grey;
  border-radius: 5px;
  cursor: pointer;
`
const LoaderWrapper = styled.div`
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -16px;
  margin-top: -16px;
`

function ShortenerForm() {
  const [longUrl, setLongUrl] = useState('')
  const [alias, setAlias] = useState('')
  const [isDataLoading, setDataLoading] = useState(false)
  const [shortUrl, setShortUrl] = useState('')

  const alert = useAlert()
  /**
   * Save Url using Post Ajax
   * @param {*} e element
   */
  async function saveUrl(e) {
    e.preventDefault()
    setDataLoading(true)
    // we check if alias or url have a good format
    if (
      checkUrlFormat(longUrl, alert) &&
      (alias === '' ||
        (checkAliasFormat(alias, alert) &&
          !(await checkAliasAlreadyExist(alias, alert))))
    ) {
      axios
        .post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/saveUrl`, {
          longUrl: longUrl,
          alias: alias,
        })
        .then(function (response) {
          setShortUrl(response.data)
          setDataLoading(false)
        })
        .catch(function (error) {
          console.log(error)
          alert.error(
            'An error occured while saving url, please contact administrator.'
          )
          setDataLoading(false)
        })
    }
    setDataLoading(false)
  }

  const handleLongUrl = (e) => {
    setLongUrl(e.target.value)
  }

  const handleAlias = (e) => {
    if (
      e.target.value === '' ||
      (e.target.value.length < 9 && /[A-Za-z0-9-_]+$/gm.test(e.target.value))
    )
      setAlias(e.target.value)
  }

  return (
    <div>
      {shortUrl !== '' ? (
        <Success shortUrl={shortUrl} longUrl={longUrl} />
      ) : (
        <FormWrapper onSubmit={saveUrl}>
          <FieldWrapper>
            <label>
              URL with http:// or https://
              <SInput
                placeholder="URL to shorten"
                onChange={(e) => {
                  handleLongUrl(e)
                }}
                name="longUrl"
                value={longUrl}
                required
              />
            </label>
          </FieldWrapper>
          <FieldWrapper>
            <label>
              Choose your own alias (8 caracteres max, optional)
              <SInput
                placeholder="Alias"
                onChange={(e) => {
                  handleAlias(e)
                }}
                name="alias"
                value={alias}
              />
            </label>
          </FieldWrapper>
          <ButtonWrapper>
            <SButton onClick={saveUrl}>Short It</SButton>
          </ButtonWrapper>
          {isDataLoading ? (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          ) : null}
        </FormWrapper>
      )}
    </div>
  )
}

export default ShortenerForm
