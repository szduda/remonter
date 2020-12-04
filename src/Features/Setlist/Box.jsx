/** @jsx jsx */
import { useState, useEffect, Fragment as F } from 'react'
import { jsx, css, } from '@emotion/core'
import { colors, Button, Flex, FAB, Icons } from '../theme'

const Wrapper = ({ collapsed, fullHeight, rich, ...rest }) => {
  return (
    <Flex.Col valign="space-between" css={css`
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
      opacity: ${collapsed ? 0 : 1};

      > * {
        ${fullHeight ? 'transition: all 800ms cubic-bezier(0.42,0,0.58,1) 200ms;'
        : 'transition: all 400ms cubic-bezier(.55,.13,.7,1);'}
      }
    `} {...rest} />
  )
}

const Labels = ({ onLabelClick, labels, activeLabelId, rich }) => (
  <Flex.Row align="flex-start" wrap={rich} css={css`overflow-x: auto; overflow-y: hidden;`}>
    {labels.map((l, key) =>
      <Button
        filled
        key={key}
        css={css`
          margin: 0 8px 8px 0;
          flex-wrap: nowrap;
          flex-shrink: 0;
          ${activeLabelId === l.id && `background: ${colors.yellow};`}
        `}
        onClick={() => onLabelClick(l)}
      >
        {l.title}
      </Button>
    )}
  </Flex.Row>
)

const playAtTime = ({ time, audioTagId }) => {
  const myAudio = document.getElementById(audioTagId);
  const setTime = () => {
    myAudio.currentTime = time
    myAudio.play()
    myAudio.removeEventListener('canplaythrough', setTime)
  }

  myAudio.addEventListener('canplaythrough', setTime);
  myAudio.load();
}

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
    ${rich && 'flex-grow: 5;'}
    ${!rich && 'text-overflow: ellipsis;'}
    white-space: ${rich ? 'pre-line' : 'nowrap'};
  `}>
      {text}
    </p>
  )
}

const Title = ({ text, index, rich }) => (
  <h2 css={css`
    margin: 0;
    width: calc(100% - 56px);
    font-size: 32px;
    line-height: 48px;
    color: ${rich ? colors.grayLighter : colors.white};
    font-variant: all-small-caps;
    height: 48px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `}>
    <span css={css`width: 16px; margin-right: 8px;`}>{index}.</span>
    {text}
  </h2>
)

const PreviewToggle = ({ togglePreview, rich }) => (
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
    {rich ? <Icons.Close /> : <Icons.Unfold />}
  </FAB>
)

const AudioPanel = ({ audioTagId, fileName }) => (
  <audio
    controls
    id={audioTagId}
    css={css`
      width: 100%;
      margin-top: 8px;
  `}>
    <source src={`audio/${fileName}`} type="audio/mpeg" />
  </audio>
)

export const Box = ({ item, togglePreview, rich, hidden }) => {
  const { title, description, index, fileName } = item
  const audioTagId = `audio-${item.id}`
  const labels = Object
    .keys(item.labels || {})
    .map(id => ({ ...item.labels[id], id }))
    .sort((l1, l2) => l1.time - l2.time)
  const [activeLabelId, setActiveLabel] = useState()
  const activeLabel = labels.find(l => l.id === activeLabelId)

  useEffect(() => {
    const myAudio = document.getElementById(audioTagId)
    const labelsFromEnd = [...labels].reverse()
    const updateLabel = e => {
      const properLabel = labelsFromEnd.find(l => l.time <= e.target.currentTime)
      if (!properLabel) {
        setActiveLabel(null)
      } else if (activeLabelId !== properLabel.id) {
        setActiveLabel(properLabel.id)
      }
    }

    myAudio.addEventListener('timeupdate', updateLabel)
    return () => myAudio.removeEventListener('timeupdate', updateLabel)
  }, [activeLabelId])

  const onLabelClick = label => playAtTime({ time: label.time, audioTagId })

  return (
    <Wrapper collapsed={hidden} fullHeight={rich}>
      <Title {...{ index, rich, text: title }} />
      <Description {...{ activeLabel, description, rich }} />
      <Labels {...{ onLabelClick, activeLabelId, labels, rich }} />
      <AudioPanel {...{ audioTagId, fileName }} />
      <PreviewToggle {...{ togglePreview, rich }} />
    </Wrapper>
  )
}