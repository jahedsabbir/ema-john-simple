import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, prd) => total + prd.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;   
    }
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
   
    const tax = (total / 15).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    // const formatNumber = num => {
    //     const precesion = num.toFixed(2);
    //     return Number(precesion);
    // }
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered : {cart.length}</p>
            <p>Product Price : {total}</p>
            <p>Shopping cost : {shipping}</p>
            <p>Tax : {tax}</p>
            <p>Total : {grandTotal} </p><br/>
            {
                props.children
            }
            

            
        </div>
    );
};

export default Cart;