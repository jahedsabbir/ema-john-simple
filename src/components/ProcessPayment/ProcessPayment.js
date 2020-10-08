import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';


const stripePromise = loadStripe('pk_test_51HZpM5HAWXY7dhOQ3Qn3Cr3pzm2sVAKm6oASFe6lH0GvKOKDdjOmDJtu2bL2MDm3l1Do0JtHKoUiAYof6pf9jkYw00ENou5DgP');
const ProcessPayment = ({handlePayment}) => {
    return (
      
             <Elements stripe={stripePromise}>
                   <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
             </Elements>
       
    );
};

export default ProcessPayment;