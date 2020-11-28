/** @jsx jsx */
import { jsx, css, } from '@emotion/core'
import { Button } from '../theme'
import { Redirect } from 'react-router-dom';

const Wrapper = props => (
  <div css={css`
  padding: 80px 4px 0;
  display: flex;
  flex-direction: column;
  `} {...props} />
)

export const Login = ({ useLoginContext }) => {
  const { submit, isLoggedIn } = useLoginContext()
  const RedirectGuard = () => isLoggedIn ? <Redirect to="/" /> : null
  return (
    <Wrapper>
      <RedirectGuard />
      <h2>Login</h2>
      <Button onClick={submit}>
        Login with google
      </Button>
    </Wrapper>
  )
}