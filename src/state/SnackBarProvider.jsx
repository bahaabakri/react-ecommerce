import { useState } from "react"
import SnackBarContext from './SnackBarContext'
const SnackBarProvider = ({children}) => {
    const [snackBar, setSnackBar] = useState({
        value: '',
        isOpen: false,
        status: 'error',
    })

    const showSnackBar = (value, status) => {
        setSnackBar({
            value, status, isOpen:true
        })
    }
    const handleCloseSnackBar = () => {
        setSnackBar(prev => ({...prev, isOpen:false}))
    }
    const snackBarCtx = {
        value: snackBar.value,
        isOpen: snackBar.isOpen,
        status: snackBar.status,
        showSnackBar,
        handleCloseSnackBar
    }
    return (
        <SnackBarContext.Provider value={snackBarCtx}>
            {children}
        </SnackBarContext.Provider>
    )

}

export default SnackBarProvider