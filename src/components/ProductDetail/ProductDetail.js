import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import loader from '../../images/loader.gif';
import { useEffect } from 'react';

const ProductDetail = () => {
    const{productkey}= useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('https://agile-stream-21503.herokuapp.com/product/' + productkey)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
            setLoading(false)
        })
    }, [productkey])

    return (
        <div>
            <h1>{productkey} Details ...</h1>
            {
                loading ? <img style={{width:'100%'}} src={loader} alt=""/>: 
                <Product showaddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;