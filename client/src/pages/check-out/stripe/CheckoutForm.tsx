import React, { ReactEventHandler, useContext, useState } from 'react'
import axios from 'axios'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'


import styles from './form.module.css'
import { ShippingDetailsFields } from './ShippingDetailsFields'

import { Button, Card } from '@material-ui/core'
import api from '../../../api/axiosIstance'
import { StripeError } from '@stripe/stripe-js'
import { StripeProps } from "../../../interfaces/interfaces"
import { useMutation } from 'react-query'
import Axios from 'axios'
import { UserContext } from '../../../context/UserContext'

export const CheckoutForm: React.FC<StripeProps> = ({ total }) => {
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState<StripeError>();

    const { user } = useContext(UserContext);

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

    const createPayment = async () => {
        const res = await api.post('stripe/create-payment-intent');
        console.log(res);
        return res.data
    }

    const [mutate, { isLoading }] = useMutation(createPayment)
    const handlePaymentSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        const { name, surname, email, address, city, postal_code }: any = ev.target;

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
            email: billingDetails.email
        }

        if (stripe === null) {
            throw new Error("bug");
        }
        if (elements === null) {
            throw new Error("bug");
        }
        const cardElement = elements.getElement(CardElement);

        if (cardElement === null) {
            throw new Error("bug");
        }
        //create payment intent on server
        setProcessingTo(true);

        try {


            //client secret of payment intent
            const { data: clientSecret } = await axios.post('http://localhost:4000/api/stripe/create-payment-intent', info, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });

            console.log(clientSecret);

            //create payment method
            const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingDetails
            });

            if (pmError) {
                setCheckoutError(pmError);
                setProcessingTo(false);
                return;
            }

            console.log(paymentMethod);

            //confirm the card payment
            const { paymentIntent, error: piError } = await stripe?.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod?.id
            })

            if (piError) {
                setCheckoutError(piError);
                setProcessingTo(false);
                return;
            }
            console.log(paymentIntent?.id);

            const orderData = {
                orderId: paymentIntent?.id,
                price: total
            };
            console.log(orderData);

            await mutate();
            setProcessingTo(false);

        } catch (err) {
            setCheckoutError(err.message);
            setProcessingTo(false);

        }
        //combine payment method id with client_secret
    }

    return (
        <div>
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
                >{isProcessing ? "Stai pagahndo" : `Pagah ${total / 100}€`}</Button>
            </form>
        </div>
    )
}
