import { useCallback } from 'react'

export function useShare() {
  const share = useCallback(async (score: number) => {
    const data = {
      title: 'حدس بزن!',
      text: `من ${score} امتیاز گرفتم! بیا بازی کنیم`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(data)
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${data.text}\n${data.url}`)
    }
  }, [])

  return share
}
