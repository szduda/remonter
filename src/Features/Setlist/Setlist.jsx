/** @jsx jsx */
import { jsx, css, } from '@emotion/core'
import { Box } from './Box'
import { sortByIndex } from '../../appHelper'
import { AddItemForm, AddThingTrigger } from './AddItem'

const Wrapper = props => (
  <div css={css`
  padding: 76px 4px 64px;
  display: flex;
  flex-direction: column;
  `} {...props} />
)

export const Setlist = ({ useSetlistContext }) => {
  const { items, addItem, formVisible, setFormVisible } = useSetlistContext()
  return (
    <Wrapper>
      <AddItemForm onSubmit={addItem} formVisible={formVisible} />
      {items.sort(sortByIndex).map((item, key) => <Box {...{ key, item }} />)}
      <AddThingTrigger onClick={() => setFormVisible(!formVisible)} />
    </Wrapper>
  )
}