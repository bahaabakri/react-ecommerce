import {useContext, useRef, useCallback, useEffect} from 'react'
import Modal from "./UI/Modal"
import Input from "./UI/Input"
import CartContext from '../state/CartContext'
import ModalContext from '../state/ModalContext'
import SnackBarContext from '../state/SnackBarContext'
import {getCurrencyFormatter} from '../util'
import { useForm } from 'react-hook-form'
import { Snackbar } from '@mui/material'
import useHttp from '../hooks/useHttp'
const httpConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}
const CheckoutModal = () => {
    const {items, totalCartPrice, totalCartItems, resetCart} = useContext(CartContext)
    const {section, closeModal} = useContext(ModalContext)
    const {showSnackBar} = useContext(SnackBarContext)
    const buttonRef = useRef()
    const {
        error:errorInPLaceOrder,
        sendHttpRequest: placeOrderHttpReq,
        isLoading} 
        = useHttp([], 'http://localhost:3000/orders', httpConfig)
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            email:'',
            name: '',
            street:'',
            city:'',
            // 'address': ''
        }
    })
    console.log(errors);
    useEffect(() => {
        if (errorInPLaceOrder) {
            showSnackBar(errorInPLaceOrder, 'error')
        } else if (errorInPLaceOrder === null) {
            handlePlaceOrderSuccess()
        }
    }, [errorInPLaceOrder])


    const onPlaceOrder = () => {
        buttonRef.current.click()
    }
    const handlePlaceOrder = useCallback(async(customer) => {
        const bodyRequest = JSON.stringify({
            order: {
                customer,
                items
            }
        })
        await placeOrderHttpReq({body: bodyRequest})
    }, [items, placeOrderHttpReq])

    const handlePlaceOrderSuccess = useCallback(() => {
        showSnackBar('Order Placed Successfuly', '')
        closeModal()
        resetCart()
    }, [closeModal, showSnackBar, resetCart])
    return (
    <>
          <Modal
                isOpen={section == 'checkout'}
                actionTitle={'Place Order'}
                onDoAction={onPlaceOrder}
                isLoading={isLoading}
                className="checkout">
                    <form onSubmit={handleSubmit(customer => handlePlaceOrder(customer))}>
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
                        <div className='controls'>
                            <div className="control-row">
                                <Input 
                                id='email' 
                                type="email" 
                                label="Email" 
                                onBlur={() => {
                                    trigger('email');
                                }}
                                errorMessage={( errors.email) ? errors.email.message: ''}
                                    {...register('email', 
                                    {
                                        required: "Email is required", 
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                            message: 'Please enter a valid email address',
                                          },
                                    })}
                                /> 
                                {/* {touchedFields.email && errors.email && <p className="error-message">{errors.email.message}</p>} */}
                                <Input 
                                id='name' 
                                type="text" 
                                label="Full Name"
                                onBlur={() => {
                                    trigger('name');
                                }}
                                errorMessage={(errors.name) ? errors.name.message: ''}
                                {...register('name', {
                                    required: "Full name is required",
                                    minLength: {
                                        value: 5,
                                        message: "Please Type at least 5 characters"
                                    },
                                    maxLength: {
                                        value: 255,
                                        message: 'Please Type less than 255 characters'
                                    },
                                })}/>
                            </div>
                            <div className="control-row">
                                <Input 
                                id='street' 
                                type="text" 
                                label="Street"
                                className={'street-control'} 
                                errorMessage={(errors.street) ? errors.street.message: ''}
                                onBlur={() => {
                                    trigger('street');
                                }}
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
                                onBlur={() => {
                                    trigger('postal-code');
                                }}
                                errorMessage={(errors['postal-code']) ? errors['postal-code'].message: ''}
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
                                onBlur={() => {
                                    trigger('city');
                                }}
                                errorMessage={(errors.city) ? errors.city.message: ''}
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
                        </div>

                        <button style={{display: 'none'}} ref={buttonRef} type='submit'></button>
                    </form>
            </Modal>
    </>
)
}

export default CheckoutModal