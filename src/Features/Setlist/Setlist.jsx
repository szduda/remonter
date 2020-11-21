/** @jsx jsx */
import { jsx, css, } from '@emotion/core'
import { Box } from './Box'
import { sortByIndex } from '../../appHelper'
import AddItemForm from './AddItem'

const Wrapper = props => (
  <div css={css`
  padding: 76px 4px 64px;
  display: flex;
  flex-direction: column;
  `} {...props} />
)

export const Setlist = ({ useSetlistContext }) => {
  const { items, addItem } = useSetlistContext()
  return (
    <Wrapper>
      {/* <AddItemForm addItem={addItem} /> */}
      {items.sort(sortByIndex).map((item, key) => <Box {...{ key, item }} />)}
    </Wrapper>
  )
}