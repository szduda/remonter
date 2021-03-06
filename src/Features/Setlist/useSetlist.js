import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../../StateManager/Store'
import { Setlist } from './Setlist'
import { getNextId } from '../../appHelper'

export const useSetlist = ({ DataService }) => {
  const useSetlistContext = () => {
    const { state, actions } = useStore()
    const { setlist, user } = state
    const admin = user?.role === 'admin'
    const [visibility, setVisibility] = useState({
      form: false,
      preview: null
    })

    const fetchItems = useRef(DataService.fetchItems)
    const setItems = useRef(actions.setlist.setItems)

    useEffect(() => {
      const asyncEffect = async () => setItems.current({ items: await fetchItems.current() })
      asyncEffect()
    }, [fetchItems, setItems])

    const addItem = async item => {
      const tempItem = { ...item, id: getNextId() }
      actions.setlist.addItem({ item: tempItem })
      const id = await DataService.addItem({ item })
      actions.setlist.updateItem({
        id: tempItem.id,
        item: { id }
      })
    }


    const items = Object.keys(setlist).map(key => setlist[key]);
    return { items, addItem, visibility, setVisibility, admin }
  }

  return () => <Setlist {...{ useSetlistContext }} />
}