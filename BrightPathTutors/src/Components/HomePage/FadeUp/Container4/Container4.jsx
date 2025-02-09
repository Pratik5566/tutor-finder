import React, { useState } from 'react';
import './Container4.css'; // Import your CSS file for styling

const Container4 = () => {
    const slides = [
        { title: "Alex Carter", content: "Success is not the destination, but the journey we embrace. Persistence and vision chart the path, regardless of the venture." },
        { title: "Maimonides", content: "Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime." },
        { title: "Martin Luther King, Jr.", content: "The function of education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education." },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="container4-carousel-container">
            <div className="container4-carousel">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`container4-slide ${index === currentSlide ? 'container4-active' : index < currentSlide ? 'container4-left' : 'container4-right'}`}
                    >
                        <div className="container4-content">{slide.content}</div>
                        <div className="container4-headline">{slide.title}</div>
                    </div>
                ))}
                <button className="container4-prev" onClick={goToPrevSlide}>
                    &#10094;
                </button>
                <button className="container4-next" onClick={goToNextSlide}>
                    &#10095;
                </button>
            </div>
            <div className="container4-dots">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`container4-dot ${index === currentSlide ? 'container4-active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Container4;
