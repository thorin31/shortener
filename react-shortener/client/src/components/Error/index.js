import styled from 'styled-components'
import colors from '../../style/colors'
import img404 from '../../assets/404.svg'

const ErrorWrapper = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.background};
  align-items: center;
`

const ErrorSubtitle = styled.h2`
  font-weight: 300;
  color: ${colors.secondary};
`

const Illustration = styled.img`
  max-width: 400px;
  height: auto;
`

function Error() {
  return (
    <ErrorWrapper>
      <Illustration src={img404} />
      <ErrorSubtitle>
        It seems that the page you are looking for does not exist
      </ErrorSubtitle>
    </ErrorWrapper>
  )
}

export default Error
