import React, { useState, useEffect } from 'react'
import { useStore } from '../../StateManager/Store'
import { Setlist } from './Setlist'
import { getNextId } from '../../appHelper'

export const useSetlist = ({ DataService }) => {
  const useSetlistContext = () => {
    const { state, actions } = useStore()
    const { setItems } = actions.setlist
    const { setlist, user } = state
    const admin = user?.role === 'admin'
    const [visibility, setVisibility] = useState({
      form: false,
      preview: null
    })

    useEffect(() => {
      const asyncEffect = async () => setItems({ items: await DataService.fetchItems() })
      asyncEffect()
    }, [])

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