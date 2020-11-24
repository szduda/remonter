/** @jsx jsx */
import { jsx, css, } from '@emotion/core'
import { colors, Button, Flex, FAB, Icons } from '../theme'

const Wrapper = ({ collapsed, fullHeight, ...rest }) => {
  return (
    <div css={css`
      background: ${colors.grayLight};
      color: ${colors.black};
      padding: ${collapsed ? '0 16px' : '16px'};
      margin: ${collapsed || fullHeight ? 0 : '0 0 8px 0'};
      border-radius: 4px;
      font-size: 12px;
      line-height: 14px;
      box-shadow: 0 2px 4px 0 ${colors.grayDark}44;
      position: relative;
      height: ${collapsed ? 0 : fullHeight ? 'calc(100vh - 84px)' : '232px;'};
      overflow: hidden;
      transition: all 400ms ease-out;
      opacity: ${collapsed ? 0 : 1}
    `} {...rest} />
  )
}

export const Box = ({ item, togglePreview, rich, hidden }) => {
  const { title, description, index, fileName } = item
  const audioTagId = `audio-${item.id}`

  const playAtTime = ({ time }) => {
    const myAudio = document.getElementById(audioTagId);

    const setTime = function () {
      this.currentTime = time
      this.play()
      myAudio.removeEventListener('canplaythrough', setTime)
    }

    myAudio.addEventListener('canplaythrough', setTime);
    myAudio.load();
  }

  const Title = () => (
    <h2 css={css`
      margin: 0;
      padding-right: 56px;
      font-size: 32px;
      line-height: 48px;
      color: ${colors.white};
      font-variant: all-small-caps;
      height: 48px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `}>
      <span css={css`width: 16px; margin-right: 8px;`}>{index}.</span>
      {title}
    </h2>
  )

  const Description = () => (
    <p css={css`
      color: ${colors.grayLighter} !important;
      padding: 0 48px 16px 0;
      height: ${rich ? 'calc(100% - 172px)' : '24px'};
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `}>
      {description}
    </p>
  )

  const PreviewToggle = () =>  (
    <FAB 
    top
    onClick={togglePreview}
    css={css`
      box-shadow: none; 
      background: ${colors.grayLighter}; 
      border: none; 
      right: 16px; 
      top: 16px;
      z-index: 100;
    `}>
      {rich ? <Icons.Close /> : <Icons.Search />}
    </FAB>
  )

  return (
    <Wrapper collapsed={hidden} fullHeight={rich}>
      <Title/>
      <Description />
      <Flex.Row align="flex-start">
      <Button filled css={css`margin-right: 8px;`} onClick={() => playAtTime({ time: 4 })}>Corrida</Button>
      <Button filled onClick={() => playAtTime({ time: 250 })}>Heavy dub</Button>
      </Flex.Row>
      <audio controls id={audioTagId} css={css`
        width: 100%;
        margin-top: 16px;
      `}>
        <source src={`audio/${fileName}`} type="audio/mpeg" />
      </audio>
      <PreviewToggle />
    </Wrapper>
  )
}