import { createContext } from "react";

const  SnackBarContext = createContext({
    value: '',
    isOpen: false,
    status: 'error',
    showSnackBar: (value, status) => {},
    handleCloseSnackBar: () => {}
})
export default SnackBarContext