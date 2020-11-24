/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState } from 'react';
import { colors, Icons, Button, Flex, FAB } from '../theme'

export const AddFormTrigger = props => (
  <div css={css`
    align-self: flex-end;
    margin-right: 64px;
  `}>
    <FAB top css={css`position: fixed; right: unset;`} {...props}>
      <Icons.Add color={colors.yellow} />
    </FAB>
  </div>
)

const Textbox = ({ label = '', wide = false, ...props }) => (
  <label css={css`
    position: relative;
    width: ${wide ? '100%' : 'auto'};
  `}>
    {/* <input type="text" {...props} /> */}
    <textarea
      placeholder={label}
      css={css`
        height: 24px;
      `} {...props} />
  </label>
)

const validate = ({ title, index }, setValid) => {
  const isValid = !!(title && index)
  setValid(isValid)
  return isValid
}

export const AddItemForm = ({ onSubmit, formVisible }) => {
  const [item, setItem] = useState({
    title: '',
    description: '',
    fileName: '',
    index: '',
  })
  const [isValid, setValid] = useState(true)

  const submit = e => {
    e.preventDefault();
    return validate(item, setValid) && onSubmit(item)
  }

  return (
    <div css={css`
      background: ${colors.white};
      width: 100%;
      color: ${colors.grayLight};
      padding: 0 16px;
      position: relative;
      transition: all 400ms ease-out;
      height: ${formVisible ? '244px' : 0};
      overflow: hidden;
      margin-top: ${formVisible ? 24 : 0}px;
      margin-bottom: ${formVisible ? 32 : 0}px;
    `}>
      <form>
        <Flex.Col css={css`margin-top: 12px;`}>
          <Flex.Row wide>
            <Textbox
              css={css`width: 24px; text-align: center;`}
              label="Lp."
              value={item.index}
              onChange={event => setItem({ ...item, index: event.target.value })} />
            <Textbox
              wide
              label="Tytuł"
              value={item.title}
              onChange={event => setItem({ ...item, title: event.target.value })} />
          </Flex.Row>
          <Textbox
            wide
            label="Opis"
            value={item.description}
            css={css`height: 56px;`}
            onChange={event => setItem({ ...item, description: event.target.value })} />
          <Textbox
            wide
            label="Nazwa pliku"
            value={item.fileName}
            onChange={event => setItem({ ...item, fileName: Number(event.target.value) })} />
        </Flex.Col>
        <div css={css`display: flex; justify-content: flex-end;`}>
          <Icons.Exclamation
            color={colors.red}
            css={css`
            visibility: ${isValid ? 'hidden' : 'visible'};
            margin-right: 8px;
          `} />
          <Button onClick={submit} role="submit">
            <Icons.Add color={colors.green} />
            <span css={css`
            margin: 0 4px 0 2px;
            align-self: center;
            font-size: 14px;
            line-height: 1;
          `}>Zapisz</span>
          </Button>
        </div>
      </form>
    </div>
  )
}