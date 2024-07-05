import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Img1 from '../images/pizza.jpg'
import Img2 from '../images/chichken.jpg'
import Img3 from '../images/paneer.jpeg'


export default function Home() {
    const [Search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let Response = await fetch("http://localhost:5000/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        Response = await Response.json();
        setFoodItem(Response[0]);
        setFoodCat(Response[1]);
        // console.log(Response[0],Response[1]);
    }
    useEffect(() => {
        loadData()
    }, [])



    return (
        <div>

            <div> <Navbar /> </div>
            <div>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !Important" }}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{backgroundColor: "#620808", color: "white"}} value={Search} onChange={(e)=>{setSearch(e.target.value)}} />
                            {/* <button className="btn btn-outline-success" type="submit" onClick={() => { setSearch('') }}>Search</button> */}
                            <button className="btn btn-outline-danger" onClick={() => { setSearch('') }}>X</button>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={Img1} className="d-block w-100" style={{ filter: "brightness(30px)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={Img2} className="d-block w-100" style={{ filter: "brightness(30px)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={Img3} className="d-block w-100" style={{ filter: "brightness(30px)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
            </div>
            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        foodItem !== []
                                            ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(Search.toLocaleLowerCase())))
                                                .map(filterItems => {
                                                    return (
                                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mb-3'>
                                                            <Card foodItem={filterItems}
                                                                options={filterItems.options[0]}>
                                                            </Card>
                                                        </div>
                                                    )
                                                })
                                            : <div>No Such Data Found</div>
                                    }
                                </div>
                            )
                        })
                        : <div>"server error"</div>
                }
            </div>
            <div> <Footer /> </div>
        </div>
    )
}