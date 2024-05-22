import {useCallback, useState} from 'react'
import {BASE_URL} from "../config/constants";

export const useHttp = (callback, deps) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = {}, headers = {}, json = true) => {

        setLoading(true)

        try {
            headers = {...headers, Authorization: localStorage.getItem("authToken")}

            if (body && json) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(BASE_URL + url, {method, body, headers})

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
