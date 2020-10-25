import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from './CheckoutForm'

const stripePromise = loadStripe("pk_test_51H9V9nJtQgRgACLUXZUB70xNH36P2bWA0EQDsOkxHRjUaFwQ8W96vx7QpjLdzFjKaMDRr55QYTyBYnJDqFNCZlhb00Iy8Tv9Zm");

export const Stripe: React.FC<any> = (props) => {
    const { total }: { total: number } = props.location.state
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm total={total} />
            </Elements>
        </div>
    )
}
