const Button = ({children, isTextButton, className, ...rest}) => {
    const cssClass = `${className} ${isTextButton ? 'text-button' : 'button'}`
    return (
    <button className={cssClass} {...rest}>
        {children}
    </button>
    )
}
export default Button