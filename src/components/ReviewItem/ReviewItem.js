import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle={
        borderBottom:'1px solid lightgray',
        marginBottom: '5 px ',
        backgroundColor:'lightblue',
        width:'600px',
        margin:'20px',
        padding:'10px'
    }
    return (
        <div style={reviewItemStyle}>
            <h3>{name}</h3>
            <h2>Quantity : {quantity}</h2>
    <p><small>${price}</small></p>
            <br/>
            <button 
            onClick={() => props.removeProduct(key)}
            className="main-btn">Remove</button>
        </div>
    );
};

export default ReviewItem;