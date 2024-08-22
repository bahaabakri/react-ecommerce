import { useState, useEffect } from "react"
const useFetch = ((getData) => {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState()
    const [isLoading , setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            setError(null)
            setLoading(true)
            try {
                const data = await getData()
                console.log(data);
                
                setLoading(false)
                setData(data)
            }
            catch(err) {
                // console.log(error)
                setError(err.message || "Something went wrong !!!")
                setOpen(true)
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return {
        open, error, isLoading, data, setOpen
    }
})
export default useFetch