import React, { useState } from "react";

const PlaylistCarousel = ({images}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    const nextIndex = (activeIndex + 1) % images.length;

    return (
        <div className="max-w-8xl mx-auto">
            <div className="relative h-96 md:h-[75vh] mb-8 overflow-hidden md:overflow-visible rounded-lg">
                <div className="relative w-full h-full flex items-center justify-center">
                    {images.map((image, index) => {
                        let position = 'translate-x-full opacity-0 pointer-events-none';
                        let scale = 'scale-75';
                        let zIndex = 'z-0';

                        const isPrev = index === prevIndex;
                        const isNext = index === nextIndex;
                        const isActive = index === activeIndex;

                        if (isActive) {
                            position = 'translate-x-0 opacity-100';
                            scale = 'scale-100';
                            zIndex = 'z-10';
                        } else if (isPrev) {
                            position = '-translate-x-2/3 opacity-40';
                            scale = 'scale-75';
                            zIndex = 'z-5';
                        } else if (isNext) {
                            position = 'translate-x-2/3 opacity-40';
                            scale = 'scale-75';
                            zIndex = 'z-5';
                        }

                        return (
                            <div
                                key={index}
                                className={`absolute w-3/5 h-full transition-all duration-500 ease-in-out cursor-pointer ${position} ${scale} ${zIndex}`}
                                onClick={() => {
                                    if (isPrev) {
                                        setActiveIndex(prevIndex);
                                    } else if (isNext) {
                                        setActiveIndex(nextIndex);
                                    }
                                }}
                            >
                                <img
                                    src={typeof image === 'string' ? image : image.image}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === activeIndex
                                    ? 'bg-[#867e64] scale-125'
                                    : 'bg-[#e5e4dc] hover:bg-[#cdcbbb]'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlaylistCarousel;
