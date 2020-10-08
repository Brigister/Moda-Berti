import React, { useState } from 'react'
import axios from 'axios'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'


import styles from './form.module.css'
import { ShippingDetailsFields } from './ShippingDetailsFields'

import { Button, Card } from '@material-ui/core'
import api from '../../../api/axiosIstance'

export const CheckoutForm = () => {
    const id = 2;

    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();

    const stripe = useStripe();
    const elements = useElements();


    const cardElementOptions = {
        style: {
            base: {
                fontSize: '40px',
                width: "500px",
                height: "200px"
            },
            invalid: {
                color: 'red'
            },
        },
        hidePostalCode: true
    }
    const handlePaymentSubmit = async (ev) => {
        ev.preventDefault();

        const { name, surname, email, address, city, postal_code } = ev.target;

        const billingDetails = {
            name: `${name.value} ${surname.value}`,
            email: email.value,
            address: {
                line1: address.value,
                city: city.value,
                postal_code: postal_code.value
            }
        }
        const info = {
            id,
            email: billingDetails.email
        }
        const cardElement = elements.getElement(CardElement);

        //create payment intent on server
        setProcessingTo(true);

        try {


            //client secret of payment intent
            const { data: clientSecret } = await api.post('/api/stripe/create-payment-intent', info);

            console.log(clientSecret);

            //create payment method
            const paymentMethodReq = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingDetails
            })

            if (paymentMethodReq.error) {
                setCheckoutError(paymentMethodReq.error.message);
                setProcessingTo(false);
                return;
            }

            console.log(paymentMethodReq);

            //confirm the card payment
            const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            })

            if (confirmedCardPayment.error) {
                setCheckoutError(confirmedCardPayment.error.message);
                setProcessingTo(false);
                return;
            }
            console.log(confirmedCardPayment.paymentIntent.id);

            /*            const orderData = {
                           orderId: confirmedCardPayment.paymentIntent.id,
                           userId: id,
                           products: products,
                           price: total
                       };
                       console.log(orderData);
           
                       await dispatch(postOrder(orderData));
                       await dispatch(deleteUserCart(cartId)); */
            setProcessingTo(false);

        } catch (err) {
            setCheckoutError(err.message);
            setProcessingTo(false);

        }
        //combine payment method id with client_secret
    }

    return (
        <div>
            <h2>Utente {id}</h2>
            <form onSubmit={handlePaymentSubmit}>

                <ShippingDetailsFields />

                <Card className={styles.cardDetails} raised>
                    <CardElement options={cardElementOptions} />
                </Card>

                {checkoutError ? <h4>{checkoutError}</h4> : <></>}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isProcessing}
                    className={styles.button}
                >{isProcessing ? "Stai pagahndo" : `Pagah ${"total/ 100"}€`}</Button>
            </form>
        </div>
    )
}
