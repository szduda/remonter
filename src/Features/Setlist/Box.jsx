/** @jsx jsx */
import { useState, useEffect } from 'react'
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
      opacity: ${collapsed ? 0 : 1};

      > * {
        transition: all 400ms ease-in 100ms;
      }
    `} {...rest} />
  )
}

const Labels = ({ onLabelClick, labels, activeLabelId }) => (
  <Flex.Row align="flex-start">
    {labels.map((l, key) =>
      <Button
        filled
        key={key}
        css={css`
          margin-right: 8px;
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

const Description = ({ activeLabel, description, rich }) => (
  <p css={css`
    color: ${rich ? colors.white : colors.grayLighter} !important;
    padding: 0 48px 16px 0;
    height: ${rich ? 'calc(100% - 172px)' : '24px'};
    ${rich ? 'overflow-y: auto' : 'overflow: hidden'};
    ${!rich && 'text-overflow: ellipsis;'}
    ${!rich && 'white-space: nowrap'};
  `}>
    {activeLabel ? activeLabel.description : description}
  </p>
)

const Title = ({ text, index, rich }) => (
  <h2 css={css`
    margin: 0;
    padding-right: 56px;
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
      margin-top: 16px;
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
      <Labels {...{ onLabelClick, activeLabelId, labels }} />
      <AudioPanel {...{ audioTagId, fileName }} />
      <PreviewToggle {...{ togglePreview, rich }} />
    </Wrapper>
  )
}