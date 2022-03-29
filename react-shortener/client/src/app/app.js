import React from 'react'
import Header from '../components/Header'
import ShortenerForm from '../components/Form'
import { positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import colors from '../style/colors'
import styled, { keyframes } from 'styled-components'

/**
 * Design of the Loader
 */
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 100%;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`

/**
 * Options for create-alert
 */
const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
}

function App() {
  return (
    <Provider template={AlertTemplate} {...options}>
      <Header />
      <ShortenerForm />
    </Provider>
  )
}

export default App
