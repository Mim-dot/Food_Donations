import React from 'react';
import PaymentForm from '../From/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router';
const stripePromise = loadStripe(import.meta.env.VITE_payment_key)
const Payment = () => {
     const { id } = useParams();
    return (
        <div>
         <Elements stripe={stripePromise}>
            <PaymentForm requestId={id}></PaymentForm>
        </Elements>
        </div>
    );
};

export default Payment;