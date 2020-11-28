/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Auth } from '../../firebase'
import { colors, Link } from '../theme'

const Wrapper = props => (
  <div css={css`
  background: ${colors.black};
  color: ${colors.white};
  padding: 12px 16px;
  box-shadow: 0 0 4px #000;
  `} {...props} />
)

const Title = () => (
  <h1 css={css`
    display: inline-flex;
    flex-direction: column; 
    margin: 0;
    padding: 0;
    line-height: 1;
  `}>
    <span css={css`letter-spacing: 2px;`}>remonter</span>
    <small css={css`
    font-size: 16px;
    font-weight: 700;
    font-variant: all-small-caps;
    letter-spacing: 1px;
    `}>
      <span css={css`color: ${colors.green}`}>Mentalnego</span>
      <span css={css`color: ${colors.red}; margin: 0 4px;`}>Remontu</span>
      <span css={css`color: ${colors.yellow}`}>Plan</span>
    </small>
  </h1>
)

export const Header = ({ useHeaderContext }) => {
  const { user } = useHeaderContext()
  return (
    <Wrapper>
      <Title />
      {user && <Link css={css`margin-left: 32px`} onClick={() => Auth.signOut()}>Logout</Link>}
    </Wrapper>
  )
}