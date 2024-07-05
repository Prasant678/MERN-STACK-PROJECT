import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
// import { useNavigate } from 'react-router-dom';

export default function Card(props) {
    let data = useCart();
    // let navigate = useNavigate();
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const dispatch = useDispatchCart();
    const handleAddToCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                return
            }// console.log(data);
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div >
            <div className="card" style={{ "width": "18rem", "maxheight": "360px", border: "2px solid white"}}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "195px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="container w-100">
                        <select className="m-2 h-100 rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(7), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1}</option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100 rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return (
                                    <option key={data} value={data}>{data}</option>
                                )
                            })}
                        </select>
                        <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
                    </div>
                    <hr style={{borderTop: "white"}} />
                    <button className="btn justify-center ms-2" style={{backgroundColor: "#086261", border: "2px solid white"}} onClick={handleAddToCart}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}
