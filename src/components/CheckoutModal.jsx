import {useContext, useRef, useState, useActionState } from 'react'
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
// import {placeOrder} from '../request'
import checkoutAction from '../form-actions/Checkout.action'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// yup schema

const formValidationSchema = yup.object({
    email: yup.string().required('Email is required').email('Please Enter Email address'),
    name: yup.string().required('Full name is required')
        .min(5, 'Please Type at least 5 characters')
        .max(255,'Please Type less than 255 characters')
    ,
    street:yup.string().required('Street is required')
        .min(3,'Please Type at least 3 characters')
        .max(255,'Please Type less than 255 characters'),
    'postal-code': yup.string().required('Postal Code is required')
        .min(3,'Please Type at least 2 characters')
        .max(255,'Please Type less than 255 characters'),
    city:yup.string().required('City is required')
        .min(3,'Please Type at least 2 characters')
        .max(255,'Please Type less than 255 characters')
})
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
    // const [placeOrderError, setPlaceOrderError] = useState()
    const [openSnackBar, setOpenSnackBar] = useState(false)
    // const [isLoading , setLoading] = useState(false)

    const [checkoutFormState, checkoutFormAction, isPending] = useActionState(
        (prevState, formData) => checkoutAction(prevState, formData, items, closeModal), 
        {error:null})
    const {
        register,
        formState:{errors, touchedFields, isValid:isValidForm},
    } = useForm({
        defaultValues: {
            email:'',
            name: '',
            street:'',
            city:'',
            // 'address': ''
        },
        mode: "onBlur",
        resolver: yupResolver(formValidationSchema)
    })
    console.log(errors);

    const onPlaceOrder = () => {
        buttonRef.current.click()
    }
    return (
    <>
    <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={checkoutFormState.errors}
        autoHideDuration={6000}
        onClose={() => {
            setOpenSnackBar(false);
        }}
        message={checkoutFormState.error}
      />
          <Modal
                isOpen={section == 'checkout'}
                actionTitle={'Place Order'}
                onDoAction={onPlaceOrder}
                isLoading={isPending}
                isActionDisable={!isValidForm}
                className="checkout">
                    <form action={checkoutFormAction}>
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

                        
                            <Input 
                            id='email' 
                            type="email" 
                            label="Email" 
                            errorMessage={(touchedFields.email && errors.email) ? errors.email.message: ''}
                                {...register('email')}
                            /> 
                            {/* {touchedFields.email && errors.email && <p className="error-message">{errors.email.message}</p>} */}
                            <Input 
                            id='name' 
                            type="text" 
                            label="Full Name"
                            errorMessage={(touchedFields.name && errors.name) ? errors.name.message: ''}
                            {...register('name')}/>
                            <Input 
                            id='street' 
                            type="text" 
                            label="Street" 
                            errorMessage={(touchedFields.street && errors.street) ? errors.street.message: ''}
                            {...register('street')}/>
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
                                max: {
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
                                max: {
                                    value: 16,
                                    message: 'Please Type less then 16 characters'
                                },
                            })}/>
                        </div>
                        <button style={{display: 'none'}} ref={buttonRef} type='submit'></button>
                    </form>
            </Modal>
    </>
)
}

export default CheckoutModal