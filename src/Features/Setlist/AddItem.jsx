/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState } from 'react';
import { colors, Icons, Button, Flex } from '../theme'

const FAB = props => (
  <Button css={css`
    border-radius: 50%;
    background: ${colors.green};
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    padding: 8px;
    margin: 0;
    box-shadow: 0 0 8px 4px ${colors.gray};
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
  `} {...props} />
)

export const AddThingTrigger = props => (
  <FAB {...props}>
    <Icons.Add color={colors.yellow} />
  </FAB>
)

const TimePicker = ({ label = '', ...props }) => (
  <label css={css`position: relative;`}>
    <span>{label}</span>
    <input type="time" {...props} css={css`max-width: 72px;`} />
    {props.disabled && <div className="InputDisabled" />}
  </label>
)

const Checkbox = ({ label = '', ...props }) => (
  <label>
    <span>{label}</span>
    <Flex.Row valign="center">
      <input type="checkbox" {...props} />
    </Flex.Row>
  </label>
)

const Textbox = ({ label = '', ...props }) => (
  <label>
    <span>{label}</span>
    {/* <input type="text" {...props} /> */}
    <textarea css={css`height: 24px; width: 240px;`} {...props} />
  </label>
)

const validate = ({ type, start, end, current, title }, setValid) => {
  const isValid = !!(type && start && (end || current) && title)
  setValid(isValid)
  return isValid
}

const getTimeNumber = timeStr => {
  const timeArr = timeStr.split(':')
  let timeNum = Number(timeArr[0])
  return timeArr[1] === '00' ? timeNum : timeNum + 0.5
}

const getTimeString = timeNum => timeNum % Math.floor(timeNum) === 0
  ? `${Math.floor(timeNum)}:00`
  : `${Math.floor(timeNum)}:30`

export const AddThingForm = ({ onSubmit }) => {
  const [thing, setThing] = useState({
    type: 'activity',
    start: 10.5,
    end: 11.5,
    ongoing: false
  })
  const [isValid, setValid] = useState(true)

  const RadioInput = ({ color, checked, label, setThingType, ...props }) => (
    <div css={css`
      background: ${checked ? color : colors.gray};
      display: inline-flex;
      padding: 6px 8px;
      width: 80px;
      border-radius: 4px;
      color: ${checked ? '#000' : colors.grayLight};
      backdrop-filter: brightness(50%);
      font-size: 12px;
      justify-content: center;
      font-weight: 700;
      box-shadow: 0 4px 8px 0 #00000066;
    `} onClick={() => setThing({ ...thing, type: label })} {...props}>
      {label}
    </div>
  )

  const submit = () => validate(thing, setValid) && onSubmit(thing)

  return (
    <div css={css`
      background: ${colors.black};
      width: 100%;
      height: 282px;
      color: ${colors.grayLight};
      padding: 32px 16px;
      position: relative;
    `}>
      <form>
        <Flex.Row css={css`
          position: absolute;
          width: 100%;
          left: 0;
          top: 0;
          padding: 0 32px;
          margin-top: -8px;
        `}>
          <RadioInput color={colors.yellow} label="activity" checked={thing.type === 'activity'} />
          <RadioInput color={colors.orange} label="feeling" checked={thing.type === 'feeling'} />
          <RadioInput color={colors.green} label="thought" checked={thing.type === 'thought'} />
        </Flex.Row>
        <Flex.Col css={css`margin-top: 12px;`}>
          <Flex.Row>
            <TimePicker
              label="begin"
              value={getTimeString(thing.start)}
              onChange={event => setThing({
                ...thing,
                start: getTimeNumber(event.target.value)
              })}
            />
            <TimePicker
              label="end"
              disabled={thing.ongoing}
              value={getTimeString(thing.end)}
              onChange={event => setThing({
                ...thing,
                end: getTimeNumber(event.target.value)
              })} />
            <Checkbox
              label="ongoing"
              checked={thing.ongoing}
              onChange={() => setThing({
                ...thing,
                ongoing: !thing.ongoing
              })}
            />
          </Flex.Row>
          <Textbox
            label="title"
            value={thing.title}
            onChange={event => setThing({ ...thing, title: event.target.value })} />
          <Textbox
            label="tags"
            value={thing.tags}
            css={css`height: 48px;`}
            onChange={event => setThing({ ...thing, description: event.target.value })} />
        </Flex.Col>
        <Icons.Exclamation
          color={colors.red}
          css={css`
            visibility: ${isValid ? 'hidden' : 'visible'};
            position: absolute;
            bottom: 64px;
            right: 16px;
          `} />
        <FAB
          onClick={event => {
            event.preventDefault()
            submit()
          }}
          role="submit">
          <Icons.Add color={colors.yellow} />
        </FAB>
      </form>
    </div>
  )
}