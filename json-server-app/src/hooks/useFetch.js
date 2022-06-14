import { useState, useEffect } from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()


        const fetchData = async () => {
            setIsPending(true)

            try {
                const res = await fetch(url, {signal: controller.signal})
                console.log(res)
                const json = await res.json()
                if (!res.ok) {
                    throw new Error(res.status)
                }
                setIsPending(false)
                setData(json)
                setError(null)
            } catch (err) {
                if(err.name === "AbortError") {
                    console.log('the fetch was aborted')
                } else {
                    setError('could not fetch data')
                    console.log(err.message)
                    setIsPending(false)
                }
            }
           
        }
        
        fetchData()
        return () => {
            controller.abort()
        }
    }, [url])

    return { data, isPending, error }
    

}


