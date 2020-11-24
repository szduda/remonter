/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { ReactComponent as HamburgerIcon } from '../assets/icons/hamburger.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { ReactComponent as ExclamationIcon } from '../assets/icons/exclamation.svg';

export const colors = {
  red: '#ED3C19',

  orange: '#D95D39',
  orangeDark: '#AB3F21',
  orangeLight: '#DE7254',

  yellow: '#F9C926',
  yellowDark: '#DBA906',
  yellowLight: '#FBD760',

  green: '#2E8269',
  greenDark: '#205A4A',
  greenLight: '#35977A',

  white: '#F1FAEA',
  black: '#243230',

  grayLighter: '#AFBCBC',
  grayLight: '#808E88',
  gray: '#334746',
  grayDark: '#2B3B3A',
  darken: color => colors[`${Object.keys(colors).find(key => colors[key] === color)}Dark`] || color,
  lighten: color => colors[`${Object.keys(colors).find(key => colors[key] === color)}Light`] || color
}

export const Icons = {
  Hamburger: ({ color = colors.white, ...rest }) =>
    <HamburgerIcon css={css`fill: ${color}`} {...rest} />,
  Search: ({ color = colors.white, ...rest }) =>
    <SearchIcon css={css`fill: ${color}`} {...rest} />,
  Add: ({ color = colors.white, ...rest }) =>
    <AddIcon css={css`fill: ${color}`} {...rest} />,
  Close: () => <CloseIcon css={css`fill: ${colors.white}`} />,
  Exclamation: ({ color = colors.red, ...rest }) =>
    <ExclamationIcon css={css`fill: ${color}`} {...rest} />,
}

export const themeProps = {
  headerHeight: '56px'
}

export const BottomContent = ({ visible, onClose, children, ...props }) => (
  <section css={css`
    position: fixed;
    bottom: ${visible ? 0 : '-100px'};
    opacity: ${visible ? 1 : 0};
    visibility ${visible ? 'visible' : 'hidden'};
    transition: bottom 200ms ease-out, opacity 100ms ease-out, visibility 200ms linear;
    left: 0;
    right: 0;
  `} {...props}>
    <Button onClick={onClose} css={css`
      border-bottom: 2px solid #000;
      position: absolute;
      right: 0;
      left: 0;
      transition: backdrop-filter 200ms ease-out 150ms;
      backdrop-filter: brightness(${visible ? 0.5 : 0}) grayscale(${visible ? 0.4 : 0}) blur(${visible ? 4 : 0}px) opacity(${visible ? 1 : 0});
      bottom: 100%;
      height: 100vh;
      width: 100%;
    `} />
    {children}
  </section>
)

const Row = ({ align, valign, wide, ...props }) => (
  <div css={css`
    display: flex;
    justify-content: ${align || 'space-between'};
    align-items: ${valign || 'flex-start'};
    width: ${wide ? '100%' : 'auto'};
    >:last-of-type {
      margin-right: 0 !important;
    }
  `} {...props} />
)

const Col = ({ align, valign, ...props }) => (
  <div css={css`
    display: flex;
    flex-direction: column;
    justify-content: ${valign || 'flex-start'};
    align-items: ${align || 'flex-start'}
  `} {...props} />
)

export const Flex = {
  Row,
  Col
}

export const Theme = props => (
  <div css={css`
    font-family: 'Consolas';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${colors.white};
    color: ${colors.black};
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    
    header {
      position: fixed;
      top: 0;
      z-index: 1000;
      width: 100%;
      max-width: 800px;
    }
    
    div {
      box-sizing: border-box;
    }

    label {
      display: inline-flex;
      flex-direction: column;
      color: ${colors.grayLight};
      margin: 0 16px 0 0;

      span:first-of-type {
        min-height: 19px;
      }
    }

    textarea, input {
      background: ${colors.white};
      color: ${colors.black};
      margin: 4px 0 16px;
      border-radius: 4px;
      border: 1px solid ${colors.grayLight};
      padding: 6px 4px 0;
      min-width: 24px;
      font-size: 12px;
      line-height: 16px;
      font-weight: 700;

      &::placeholder {
        color: ${colors.gray};
        font-weight: 400;
      }

      &:focus {
        outline: ${colors.yellowDark} auto 1px;
      }
    }

    input {
      height: 24px;
    }

    input:disabled {
      color: ${colors.grayLight};
    }

    .InputDisabled {
      background: ${colors.gray};
      opacity: 0.8;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }

    input[type="checkbox"] {
      margin: 8px 16px 20px 0;
    }

    p {
      font-size: 16px;
      line-height: 24px;
      font-weight: 300;
      margin: 0 0 8px 0;
      color: ${colors.white};
    }
  `} {...props} />
)

export const Button = ({filled, ...rest}) => (
  <button css={css`      
    border-radius: 4px;
    border: ${filled ? 'none' :  `1px solid ${colors.grayLight}`};
    font: 500 12px Consolas;
    background: ${filled ? colors.grayLighter : 'none'};
    outline: none;
    display: flex;
    justify-content: center;
    transition: transform 100ms ease-out;
    padding: 8px;
    
    *:active, :active {
      transform: scaleX(0.97);
    }
  `} {...rest} />
)

export const Link = props => (
  // eslint-disable-next-line
  <a css={css`
    display: inline-block;
    color: ${colors.white};
    transition: transform 100ms ease-out;
    text-decoration: none;
    padding: 0 0 2px;
    border-bottom: 2px solid ${colors.red};
    
    *:active, :active {
      transform: scaleX(0.97);
    }
  `} {...props} />
)

export const FAB = ({ top, ...rest }) => (
  <Button css={css`
    z-index: 1000;
    border-radius: 50%;
    position: absolute;
    ${top ? 'top' : 'bottom'}: 12px;
    right: 20px;
    display: flex;
    padding: 8px;
    margin: 0;
    background: ${colors.black};
    border: 1px solid ${colors.gray};
    box-shadow: 0 0 4px 0 ${colors.grayDark};
    transition: transform 100ms ease-out, background 100ms ease-out;

    > svg {
      width: 32px;
      height: 32px;
    }

    :hover {
      background: ${colors.greenDark};
    }

    > {
    transition: transform 100ms ease-out;
    }

    :active, >:active {
      transform: scale(0.97);
    }
  `} {...rest} />
)