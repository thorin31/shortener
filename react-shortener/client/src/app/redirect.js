import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Error from '../components/Error'
import { Loader } from './app'
import styled from 'styled-components'

const LoaderWrapper = styled.div`
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -16px;
  margin-top: -16px;
`
/**
 * set longUrl with Url if found or set NoUrl to true if not found
 * @returns
 */
function Redirect() {
  const { shortUrl } = useParams()
  const [noUrl, setNoUrl] = useState(false)
  const [longUrl, setUrl] = useState('')
  axios
    .post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/getUrl`, {
      shortUrl: shortUrl,
    })
    .then((response) => {
      if (response.data.length > 0) {
        setUrl(response.data[0].longUrl)
      } else {
        setNoUrl(true)
      }
    })
    .catch(function (error) {
      console.log(error)
    })

  /**
   * If we find a Url using react effect, we redirect
   */
  useEffect(() => {
    if (longUrl) window.location.href = longUrl
  }, [longUrl])

  return (
    <div>
      {noUrl ? (
        <Error />
      ) : (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </div>
  )
}

export default Redirect
