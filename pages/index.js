import styled from 'styled-components'
import * as theme from '../theme'
import Header from '../components/Header'

const Title = styled.h1`
  ${theme.textStyles.mainCallout}
`

export default () => (
  <div>
    <Header transparent />
    <Title>oh hai world</Title>
    <Title>oh hai world</Title>
    <Title>oh hai world</Title>
    <Title>oh hai world</Title>
    <Title>oh hai world</Title>
    <Title>oh hai world</Title>
    <Title>oh hai world</Title>
    <Title>oh hai world</Title>
    <Title>oh hai world</Title>
  </div>
)