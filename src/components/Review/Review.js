import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import loader from '../../images/loader.gif';
import { useHistory } from 'react-router-dom';
const Review = () => {
    const [loading, setLoading] = useState(true);
const [cart,setCart] = useState([]);
const [orderPlace, setOrderPlace] = useState(false);
const history  = useHistory();
const handleProceedCheckout = () => {
  history.push('/shipment');
}

const removeProduct = (productkey) => {
    const newCart = cart.filter(pd => pd.key !== productkey);
    setCart(newCart);
    removeFromDatabaseCart(productkey);

}
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        fetch('https://agile-stream-21503.herokuapp.com/productByKeys', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => {
            setCart(data)
            setLoading(false)
        })     
    },[]);

    
   
    return (
        <div className="shop-container">
          <div className="product-container">
             {
                loading ? <img style={{width:'100%'}} src={loader} alt=""/> : cart.map(pd => <ReviewItem 
                    removeProduct ={removeProduct}
                    key ={pd.key}  
                    product={pd}></ReviewItem>)
             }

            

          </div>
          <div className="cart-container">
              <Cart cart={cart}>
                  <button onClick={handleProceedCheckout} className="main-btn">Proceed Checkout</button>
              </Cart>
          </div>
          
        </div>
    );
};

export default Review;