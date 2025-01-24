import { useContext } from "react";
import SnackBarContext from "../state/SnackBarContext";
import { Snackbar } from '@mui/material'
const SnackBarWraper = () => {
    const {value, isOpen, status, handleCloseSnackBar} = useContext(SnackBarContext)
    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={isOpen}
            autoHideDuration={6000}
            onClose={() => {
                handleCloseSnackBar();
            }}
            sx={{
                "& .MuiSnackbarContent-root": {
                  backgroundColor: status == 'error' ? '#A88' : 'transparent'
                }
            }}
            message={value}
        />
    )
}

export default SnackBarWraper