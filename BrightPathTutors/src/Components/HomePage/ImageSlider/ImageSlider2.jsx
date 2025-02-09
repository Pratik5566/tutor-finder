import React, { useState } from 'react';
import './ImageSlider2.css'
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { useAuth } from '../../../AuthContext';
const ImageSlider2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { isLoggedIn,authUser} = useAuth();
    const navigate = useNavigate();

    const slides = [
        {
            image: 'https://images.pexels.com/photos/4778424/pexels-photo-4778424.jpeg',
            heading: 'Get ready for the future',
            text: 'Make sure you are ahead of the curve! Invest in yourself and your education to ensure youre keeping up with innovation. Put yourself on a path to greater success through learning and knowledge - start today! With the right teacher by your side, you can equip yourself for success in a rapidly changing world.'

        },
        {
            image: 'https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            heading: 'Get what you want',
            text: 'Don\'t just dream it - Achieve it! Private tutors help make learning straightforward and intuitive, so you have the tools to get what you want. Our dedicated instructors can provide personalized, one-on-one instruction tailored to your individual needs. With our guidance and support, success is within reach — no matter where you\'re starting from or where you\'d like to go.'
        },
        {
            image: 'https://images.pexels.com/photos/5212338/pexels-photo-5212338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            heading: 'The knowledge that pays off',
            text: 'Unlock your full potential and advance your skills with private tuition - knowledge that pays off now and for the future.'
        },
    ]

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="slider-container">
            <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="slide" >
                        <img src={slide.image} alt={slide.heading} style={{ opacity: index === currentIndex ? 0.5 : 0.5 }} />
                        <div className="content">
                            <Typography id="slider-heading" sx={{fontFamily:"Quicksand",fontWeight:"600",fontSize:'3.0rem',marginBottom:"2%"}}>{slide.heading}</Typography>
                            <Typography sx={{fontFamily:"Quicksand",fontWeight:"400",fontSize:'1.2rem'}}>{slide.text}</Typography>
                            <div className='button'>
                                <br />
                                {!isLoggedIn ? (<> <Button variant="contained" sx={{
                                    margin: 2, backgroundColor: "black", color: "white",fontFamily:"Quicksand",fontWeight:"700",
                                    ":hover": {
                                        bgcolor: "#C0C0C0",
                                        color: "black"
                                    }, border: "1px solid black"
                                }} >Learn More</Button>
                                <Button variant="contained" sx={{
                                    backgroundColor: "white", color: "black", border: "1px solid black",fontFamily:"Quicksand",fontWeight:"700",
                                    ":hover": {
                                        bgcolor: "#585858",
                                        color: "white"
                                    }
                                }}>Get Started</Button> </>):(<Button variant="contained" sx={{
                                    backgroundColor: "white", color: "black", border: "1px solid black",fontFamily:"Quicksand",fontWeight:"700",
                                    ":hover": {
                                        bgcolor: "#585858",
                                        color: "white"
                                    }
                                }}
                                onClick={() => {navigate('/tutorfind')}} >Find Tutor</Button>)
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="prev-btn" onClick={prevSlide}>
                &#10094;
            </button>
            <button className="next-btn" onClick={nextSlide}>
                &#10095;
            </button>
            <div className="indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider2;
