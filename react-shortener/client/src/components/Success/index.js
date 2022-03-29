import styled from 'styled-components'
import copyToClipboard from 'copy-to-clipboard'
import imgCopy from '../../assets/copy.svg'
import { useAlert } from 'react-alert'

const SuccessOutput = styled.div`
  max-width: 800px;
  padding: 0 20px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  font-size: 1.3em;
`
const CopyBtn = styled.img`
  width: 100%;
  height: auto;
`
const CopyBtnWrapper = styled.div`
  width: 20px;
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
`
const UrlWrapper = styled.div`
  display: inline-block;
  background-color: #ceceff;
  padding: 5px 10px;
`
const Paragraph = styled.div`
  margin-top: 20px;
`

function Success({ longUrl, shortUrl }) {
  const alert = useAlert()
  const prefix = window.location.origin + '/'
  return (
    <SuccessOutput>
      <Paragraph>
        Your short url for{' '}
        <a href={longUrl} target="_blank" rel="noreferrer">
          {longUrl}
        </a>
      </Paragraph>
      <Paragraph>
        is:{' '}
        <UrlWrapper>
          <a href={prefix + shortUrl} target="_blank" rel="noreferrer">
            {prefix + shortUrl}
          </a>
          <CopyBtnWrapper
            title="Copy to clipboard"
            onClick={() => {
              copyToClipboard(prefix + shortUrl)
              alert.success('Short URL copied to clipboard')
            }}
          >
            <CopyBtn src={imgCopy} />
          </CopyBtnWrapper>
        </UrlWrapper>
      </Paragraph>
    </SuccessOutput>
  )
}

export default Success
