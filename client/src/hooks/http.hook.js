import {useCallback, useState} from 'react'

export const useHttp = (callback, deps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}, json = true) => {

    setLoading(true)

    try {

      if (body && json) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, {method, body, headers})

      const data = await response.json()

      if (!response.ok) {
        throw new Error('useHttp: ' + data.message || 'Что-то пошло не так')
      }

      setLoading(false)

      return data

    } catch (e) {
      setLoading(false)
      setError('useHttp catch: ' + e.message)
      throw e
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return {loading, request, error, clearError}
}