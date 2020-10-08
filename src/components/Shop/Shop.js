import React, { useState, useEffect } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import loader from '../../images/loader.gif'
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager'
const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts]= useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    //dynamic dataload
    useEffect(() => {
        fetch('https://agile-stream-21503.herokuapp.com/products?search='+search)
        .then(res => res.json())
        .then(data => setProducts(data))
    },[search]);


    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://agile-stream-21503.herokuapp.com/productByKeys', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))  
    },[])

    //searchbar
    const handleSearch = event => {
        setSearch(event.target.value);
    }

    const addProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
             count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart =[...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">   
                         {
                             products.length === 0 && <img src={loader} alt=""/>
                         }
                         <input type="text" onBlur={handleSearch} className="product-search"/>
                    {
                        products.map(pd =><Product 
                            key={pd.key}
                            showAddToCart={true}
                            addProduct = {addProduct}
                            product={pd}></Product>)
                    }
            </div>
            <div className="cart-container">
                    <Cart cart = {cart}>
                    <Link to="/review"> 
                    <button className="main-btn">Review Order</button>
                    </Link>
                    </Cart>
            </div>
           
        </div>
    );
};

export default Shop;