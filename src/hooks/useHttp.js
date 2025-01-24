import { useEffect, useState, useCallback } from "react"

const useHttp = (
    defaultData = [],
    url, 
    config = {}) => {
    const [error, setError] = useState()
    const [isLoading , setLoading] = useState(false)
    const [data, setData] = useState(defaultData)

    const sendHttpRequest = useCallback(async (bodyRequest = {}) => {
        setLoading(true)  
        try {
            const res = await fetch(url, {
                ...config, ...bodyRequest
            })
            const response = await res.json()
            if (!res.ok) {
                throw new Error('Something went wrong')
            }
            setData(response)
            setError(null)
        } catch (err) {
            setError(err.message || 'something went wromg !!')
        }
        setLoading(false)
    }, [url, config])
    return {
        error, isLoading, data, sendHttpRequest
    }

}
export default useHttp