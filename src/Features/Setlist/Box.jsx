/** @jsx jsx */
import { useMemo, Fragment as F } from 'react'
import { jsx, css, } from '@emotion/core'
import { colors, Button, Flex, FAB, Icons } from '../theme'
import { useActiveLabel } from './useActiveLabel'

const Wrapper = ({ collapsed, fullHeight, ...rest }) => {
  return (
    <Flex.Col valign="space-between" css={css`
      background: ${colors.grayLight};
      color: ${colors.black};
      padding: ${(collapsed || fullHeight) ? '0 16px' : '0 16px 8px'};
      margin: ${collapsed || fullHeight ? 0 : '0 0 8px 0'};
      border-radius: 4px;
      font-size: 12px;
      line-height: 14px;
      box-shadow: 0 2px 4px 0 ${colors.grayDark}44;
      position: relative;
      min-height: ${collapsed ? 0 : fullHeight ? 'calc(100vh - 84px)' : '134px;'};
      max-height: ${collapsed ? 0 : fullHeight ? 'unset' : '268px;'};
      overflow: hidden;
      transition: all 400ms ease-out;
      opacity: ${collapsed ? 0 : 1};

      > * {
        ${fullHeight ? 'transition: all 400ms cubic-bezier(0.42,0,0.58,1) 300ms;'
        : 'transition: all 400ms cubic-bezier(.55,.13,.7,1);'}
        flex-shrink: 0;
      }
    `} {...rest} />
  )
}

const PreviewToggle = ({ togglePreview, rich }) => (
  <FAB
    top
    onClick={togglePreview}
    css={css`
    box-shadow: none; 
    background: ${colors.grayLighter}; 
    border: none; 
    right: 8px; 
    top: 8px;
    z-index: 100;
  `}>
    {rich ? <Icons.Close /> : <Icons.Unfold />}
  </FAB>
)

const Title = ({ text, index, rich }) => (
  <h2 css={css`
    margin: 8px 0;
    width: calc(100% - 48px);
    font-size: ${rich ? 24 : 32}px;
    line-height: 1;
    max-height: 96px;
    color: ${rich ? colors.grayLighter : colors.white};
    font-variant: all-small-caps;
  `}>
    <span css={css`width: 16px; margin-right: 8px;`}>{index}.</span>
    {text}
  </h2>
)

const Description = ({ activeLabel, description, rich }) => {
  const text = ((activeLabel ? activeLabel.description : description) || '')
    .split('<br />').map((p, key) => <F {...{ key }}>{p} {rich && <br />}</F>)
  return (
    <p css={css`
    color: ${rich ? colors.white : colors.grayLighter} !important;
    padding: 0 48px 16px 0;
    width: calc(100% - 48px);
    ${rich ? 'overflow-y: auto' : 'overflow: hidden'};
    ${rich ? 'min-height: 60%' : 'min-height: 24px'};
    ${rich && 'flex-grow: 1;'}
    ${!rich && 'text-overflow: ellipsis;'}
    white-space: ${rich ? 'pre-line' : 'nowrap'};
  `}>
      {text}
    </p>
  )
}

const Labels = ({ onLabelClick, labels, activeLabel, rich }) => (
  <Flex.Row align="flex-start" wrap css={css`overflow-x: auto; overflow-y: hidden;`}>
    {labels.map((l, key) =>
      <Button
        filled
        key={key}
        css={css`
          margin: 0 8px 8px 0;
          flex-wrap: nowrap;
          flex-shrink: 0;
          ${activeLabel?.id === l.id && `background: ${colors.yellow};`}
        `}
        onClick={() => onLabelClick(l)}
      >
        {l.title}
      </Button>
    )}
  </Flex.Row>
)

const AudioPanel = ({ audioTagId, fileName, rich }) => (
  <audio
    preload="auto"
    controls
    id={audioTagId}
    css={css`
      height: ${rich ? 54 : 0};
      width: 100%;
      ${rich && 'margin: 8px 0;'}
  `}>
    <source src={fileName} type="audio/mpeg" />
  </audio>
)

const playAtTime = ({ time, audioTagId }) => {
  const myAudio = document.getElementById(audioTagId);
  const setTime = () => {
    myAudio.play()
    myAudio.removeEventListener('canplay', setTime)
  }

  myAudio.currentTime = time
  myAudio.addEventListener('canplay', setTime);
}

const useLabels = labels => useMemo(() => Object
  .keys(labels || {})
  .map(id => ({ ...labels[id], id }))
  .sort((l1, l2) => l1.time - l2.time)
  , [labels])

export const Box = ({ item, togglePreview, rich, hidden }) => {
  const { title, description, index, fileName } = item
  const audioTagId = `audio-${item.id}`
  const labels = useLabels(item.labels)
  const activeLabel = useActiveLabel({ labels, audioTagId })

  const onLabelClick = label => {
    if (!rich) togglePreview()
    playAtTime({ time: label.time, audioTagId })
  }

  return (
    <Wrapper collapsed={hidden} fullHeight={rich}>
      <Title {...{ index, rich, text: title }} />
      <Description {...{ activeLabel, description, rich }} />
      <Labels {...{ onLabelClick, activeLabel, labels, rich }} />
      <AudioPanel {...{ audioTagId, fileName, rich }} />
      <PreviewToggle {...{ togglePreview, rich }} />
    </Wrapper>
  )
}