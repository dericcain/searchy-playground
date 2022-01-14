import { useEffect, useState } from 'react';

const toggleOpenCommand = (setCount: Function) => (e: KeyboardEvent) => {
  if (e.key === 'k' || e.metaKey) {
    setCount((c: number) => c + 1)
  } else if (e.key === 'Escape') {
    setCount(0)
  }
}

export const useOpenSearchy = (): boolean => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.addEventListener('keydown', toggleOpenCommand(setCount), false)
    return () => {
      document.removeEventListener('keydown', toggleOpenCommand(setCount), false)
    }
  }, [])

  return count >= 2
}
