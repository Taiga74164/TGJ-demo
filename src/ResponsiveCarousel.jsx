import React, { createRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    "images/homepage/8.happy/9.jpg",
    "images/homepage/8.happy/10.jpg",
    "images/homepage/8.happy/11.jpg",
    "images/homepage/8.happy/12.jpg",
    "images/homepage/8.happy/13.jpg",
    "images/homepage/8.happy/14.jpg",
    "images/homepage/8.happy/15.jpg",
    "images/homepage/8.happy/16.jpg",
    "images/homepage/8.happy/17.jpg",
    "images/homepage/8.happy/18.jpg",
    "images/homepage/8.happy/19.jpg",
    "images/homepage/8.happy/20.jpg",
];

const items = images.map((src, index) => (
    <div className="px-1 md:px-2" key={index}>
        <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="rounded-lg shadow-md w-full h-40 md:h-60 object-cover"
        />
    </div>
));

const ResponsiveCarousel = () => {
    const carouselRef = createRef();

    return (
        <div className="relative max-w-7xl mx-auto px-4">
            <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-[#e5e4dc] transition hover:scale-105"
                onClick={() => carouselRef.current?.slidePrev()}
            >
                <ChevronLeft className="w-6 h-6 text-[#867e64]"/>
            </button>

            <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-[#e5e4dc] transition hover:scale-105"
                onClick={() => carouselRef.current?.slideNext()}
            >
                <ChevronRight className="w-6 h-6 text-[#867e64]"/>
            </button>

            <AliceCarousel
                ref={carouselRef}
                items={items}
                responsive={{
                    0: {items: 4},
                    768: {items: 8},
                }}
                disableDotsControls
                disableButtonsControls
                infinite
                animationDuration={800}
                autoPlay={true}
                autoPlayStrategy="all"
                controlsStrategy="default"
            />
        </div>
    );
};

export default ResponsiveCarousel;