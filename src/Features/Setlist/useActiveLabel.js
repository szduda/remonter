import { useState, useEffect, useRef } from 'react'

export const useActiveLabel = ({ labels, audioTagId }) => {
  const [activeLabelId, setActiveLabel] = useState()
  const refActiveLabelId = useRef(activeLabelId)
  const activeLabel = labels.find(l => l.id === activeLabelId)

  useEffect(() => {
    console.log('eff')
    const updateLabel = e => {
      const { currentTime } = e.target
      if (currentTime <= 0) return

      const properLabel = [...labels]
        .reverse()
        .find(l => l.time <= currentTime)
      if (!properLabel) {
        setActiveLabel(null)
      } else if (refActiveLabelId.current !== properLabel.id) {
        setActiveLabel(properLabel.id)
      }
    }

    const myAudio = document.getElementById(audioTagId);
    myAudio.addEventListener('timeupdate', updateLabel)
    myAudio.load();
    return () => myAudio.removeEventListener('timeupdate', updateLabel)
  }, [audioTagId, labels, refActiveLabelId])

  return activeLabel
}