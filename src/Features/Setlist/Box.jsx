/** @jsx jsx */
import { jsx, css, } from '@emotion/core'
import { set } from 'date-fns'
import { colors } from '../theme'

const Wrapper = props => {
  return (
    <div css={css`
      background: ${colors.grayLight};
      color: ${colors.black};
      padding: 16px;
      margin: 0 0 16px 0;
      border-radius: 4px;
      font-size: 12px;
      line-height: 14px;
      box-shadow: 0 2px 4px 0 ${colors.grayDark}44;
    `} {...props} />
  )
}

export const Box = ({ item }) => {
  const { title, description, index, fileName } = item
  const audioTagId = `audio-${item.id}`

  const playAtTime = ({ time }) => {
    const myAudio = document.getElementById(audioTagId);

    const setTime = function () {
      this.currentTime = time
      this.play()
      myAudio.removeEventListener('canplaythrough', setTime)
    }

    console.log('h', myAudio);
    myAudio.addEventListener('canplaythrough', setTime);
    myAudio.load();
  }

  return (
    <Wrapper>
      <h2>{index}. {title}</h2>
      <p>{description}</p>
      <button onClick={() => playAtTime({ time: 4 })}>Corrida</button>
      <button onClick={() => playAtTime({ time: 250 })}>Heavy dub</button>
      <audio controls id={audioTagId} css={css`
        width: 100%;
        margin-top: 16px;
      `}>
        <source src={`audio/${fileName}`} type="audio/mpeg" />
      </audio>
    </Wrapper>
  )
}