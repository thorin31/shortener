import styled from 'styled-components'

const NavContainer = styled.div`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`
const SiteTitle = styled.h1`
  margin: 2vh auto 1vh;
`

function Header() {
  return (
    <NavContainer>
      <SiteTitle>Short your URL</SiteTitle>
    </NavContainer>
  )
}

export default Header
