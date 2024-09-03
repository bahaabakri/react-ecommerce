import {useContext, useRef} from 'react'
import Modal from "./UI/Modal"
import Input from "./UI/Input"
import CartContext from '../state/CartContext'
import ModalContext from '../state/ModalContext'
import {getCurrencyFormatter} from '../util'
import { useForm } from 'react-hook-form'
const CheckoutModal = () => {
    const {items, totalCartPrice, totalCartItems} = useContext(CartContext)
    const {section} = useContext(ModalContext)
    const buttonRef = useRef()
    const {
        register,
        handleSubmit,
        formState:{errors, touchedFields},
        watch,
    } = useForm({
        defaultValues: {
            'email':'',
            'name': '',
            'street':'',
            'postal-code':'',
            'city':'',
            // 'address': ''
        }
    })
    console.log(errors);
    
    const onPlaceOrder = () => {
        buttonRef.current.click()
    }
    return (<Modal
                isOpen={section == 'checkout'}
                actionTitle={'Place Order'}
                onDoAction={onPlaceOrder}
                className="checkout">
                    <form onSubmit={handleSubmit(data => {
                        console.log(data);
                    })}>
                        <h2>Checkout:</h2>
                        <div className="cart-total">Cart Total: 
                            <span className="text-bold">&nbsp; ({totalCartItems}) &nbsp;</span> Item{totalCartItems > 1 && 's'}, 
                            <span className="text-bold"> &nbsp; ({items.length}) &nbsp;</span> Product{items.length > 1 && 's'}
                            <span className="text-bold">&nbsp; ({getCurrencyFormatter.format(totalCartPrice)}) &nbsp;</span> 
                        </div>
                        {/* <input type="text"
                            {...register('address', 
                                {
                                    required: "Address is required"
                                })}
                        />
                        {errors.address && <p className="error-message">{errors.address.message}</p>} */}

                        <div className="control-row">
                            <Input 
                            id='email' 
                            type="email" 
                            label="Email" 
                            errorMessage={(touchedFields.email && errors.email) ? errors.email.message: ''}
                                {...register('email', 
                                {
                                    required: "Email is required", 
                                    email: "Please Enter Email address"
                                })}
                            /> 
                            {/* {touchedFields.email && errors.email && <p className="error-message">{errors.email.message}</p>} */}
                            <Input 
                            id='name' 
                            type="text" 
                            label="Full Name"
                            errorMessage={(touchedFields.name && errors.name) ? errors.name.message: ''}
                            {...register('name', {
                                required: "Full name is required",
                                minLength: {
                                    value: 5,
                                    message: "Please Type at least 5 characters"
                                },
                                maxLength: {
                                    value: 255,
                                    message: 'Please Type less then 255 characters'
                                },
                            })}/>
                        </div>
                        <div className="control-row">
                            <Input 
                            id='street' 
                            type="text" 
                            label="Street" 
                            errorMessage={(touchedFields.street && errors.street) ? errors.street.message: ''}
                            {...register('street',{
                                required: "Street is required",
                                minLength: {
                                    value: 2,
                                    message: "Please Type at least 2 characters"
                                },
                                maxLength: {
                                    value: 255,
                                    message: 'Please Type less then 255 characters'
                                },
                            })}/>
                        </div>
                        <div className="control-row">
                            <Input 
                            id='postal-code' 
                            type="text" 
                            label="Postal Code" 
                            errorMessage={(touchedFields['postal-code'] && errors['postal-code']) ? errors['postal-code'].message: ''}
                            {...register('postal-code', {
                                required: "Postal Code is required",
                                minLength: {
                                    value: 2,
                                    message: "Please Type at least 2 characters"
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'Please Type less then 16 characters'
                                },
                            })}/>
                            <Input 
                            id='city' 
                            type="text" 
                            label="City" 
                            errorMessage={(touchedFields.city && errors.city) ? errors.city.message: ''}
                            {...register('city', {
                                required: "City is required",
                                minLength: {
                                    value: 2,
                                    message: "Please Type at least 2 characters"
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'Please Type less then 16 characters'
                                },
                            })}/>
                        </div>
                        <button style={{display: 'none'}} ref={buttonRef} type='submit'></button>
                    </form>
            </Modal>)
}

export default CheckoutModal