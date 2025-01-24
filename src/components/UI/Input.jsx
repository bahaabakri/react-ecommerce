import { forwardRef } from "react"

const Input = forwardRef(({label, id, errorMessage,className, ...inputProps}, ref) => {
    if (id == 'email') {
        console.log(errorMessage);
    }

    
    return (
    <div className={`control ${className}`}>
        <label htmlFor={id}>{label}</label>
        <input ref={ref} id={id} name={id} {...inputProps} />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    ) 
})
export default Input