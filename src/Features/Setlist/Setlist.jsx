/** @jsx jsx */
import { jsx, css, } from '@emotion/core'
import { Box } from './Box'
import { sortByIndex } from '../../appHelper'
import { AddItemForm, AddFormTrigger } from './AddItem'

const Wrapper = props => (
  <div css={css`
  padding: 80px 4px 0;
  display: flex;
  flex-direction: column;
  `} {...props} />
)

export const Setlist = ({ useSetlistContext }) => {
  const { items, addItem, visibility, setVisibility, admin } = useSetlistContext()
  return (
    <Wrapper>
      <AddItemForm onSubmit={addItem} formVisible={visibility.form} />
      {items.sort(sortByIndex).map((item, key) =>
        <Box {...{
          key,
          item,
          rich: visibility.preview === item.id,
          hidden: visibility.preview && visibility.preview !== item.id,
          togglePreview: () => setVisibility({ preview: visibility.preview ? null : item.id }),
        }} />
      )}
      {admin && <AddFormTrigger onClick={() => setVisibility({ form: !visibility.form })} />}
    </Wrapper>
  )
}