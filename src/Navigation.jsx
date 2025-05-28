import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    const handleLinkClick = () => setIsMenuOpen(false);

    return (
        <nav className="fixed top-0 w-full bg-[#f5f4f1] backdrop-blur-md z-[9999] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 md:h-24 relative z-[9999]">

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-center w-full">
                        <div className="flex items-center space-x-8">
                            {/* Left */}
                            <a href="#home"
                               className="text-gray-700 hover:text-[#867e64] transition-colors">Home</a>
                            <a href="#about"
                               className="text-gray-700 hover:text-[#867e64] transition-colors">About</a>
                            {/* Services Dropdown */}
                            <div className="relative group">
                                <button
                                    className="inline-flex text-gray-700 hover:text-[#867e64] transition-colors focus:outline-none">
                                    Services
                                    <ChevronDown className="justify-center w-4 h-4 ml-1 mt-1 text-gray-700 group-hover:text-[#867e64] transition-colors"/>
                                </button>
                                <div
                                    className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[9999]">
                                    <a href="#services"
                                       className="block px-4 py-2 text-gray-700 hover:bg-[#867e64] hover:text-gray-100 hover:rounded-t-md">Marriage
                                        Celebrant</a>
                                    <a href="#services"
                                       className="block px-4 py-2 text-gray-700 hover:bg-[#867e64] hover:text-gray-100">Wedding
                                        MC</a>
                                    <a href="#services"
                                       className="block px-4 py-2 text-gray-700 hover:bg-[#867e64] hover:text-gray-100 hover:rounded-b-md">Tea
                                        Ceremony</a>
                                </div>
                            </div>

                            {/* Desktop Logo */}
                            <img src="images/nav_logo_test.png" alt="NavLogo"
                                 className="h-auto max-h-20 w-auto pointer-events-none select-none mx-8"/>

                            {/* Right */}
                            <a href="#vendors"
                               className="text-gray-700 hover:text-[#867e64] transition-colors">Vendors</a>
                            <a href="#blog"
                               className="text-gray-700 hover:text-[#867e64] transition-colors">Blog</a>
                            <a href="#contact"
                               className="text-gray-700 hover:text-[#867e64] transition-colors">Contact</a>
                        </div>
                    </div>

                    {/* Mobile Logo */}
                    <div className="md:hidden">
                        <img
                            src="images/nav_logo_long.png"
                            alt="NavLogo"
                            className="h-auto max-h-16 w-auto max-w-64 pointer-events-none select-none"
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden relative z-[9999] p-2 touch-manipulation"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                        type="button"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen
                            ? <X className="w-8 h-8" color="#867e64"/>
                            : <Menu className="w-8 h-8" color="#867e64"/>}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                ref={mobileMenuRef}
                className={`md:hidden overflow-hidden transition-all duration-300 ease-out bg-[#f5f4f1] relative z-[9999] ${
                    isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
                style={{ 
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                    visibility: isMenuOpen ? 'visible' : 'hidden'
                }}
            >
                <div className="border-t border-b border-[#cdcbbb] px-4 pt-4 pb-6 space-y-2">

                    <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-[#867e64] touch-manipulation"
                       onClick={handleLinkClick}>
                        Home</a>
                    <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-[#867e64] touch-manipulation"
                       onClick={handleLinkClick}>
                        About</a>
                    <div className="border-t my-1"></div>
                    <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-[#867e64] touch-manipulation"
                       onClick={handleLinkClick}>
                        Marriage Celebrant</a>
                    <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-[#867e64] touch-manipulation"
                       onClick={handleLinkClick}>
                        Wedding MC</a>
                    <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-[#867e64] touch-manipulation"
                       onClick={handleLinkClick}>
                        Tea Ceremony</a>
                    <div className="border-t my-1"></div>
                    <a href="#vendors" className="block px-3 py-2 text-gray-700 hover:text-[#867e64] touch-manipulation"
                       onClick={handleLinkClick}>
                        Vendors</a>
                    <a href="#blog" className="block px-3 py-2 text-gray-700 hover:text-[#867e64] touch-manipulation"
                       onClick={handleLinkClick}>
                        Blog</a>
                    <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-[#867e64] touch-manipulation"
                       onClick={handleLinkClick}>
                        Contact</a>
                    <a href="#tc" className="block px-3 py-2 text-gray-700 hover:text-[#867e64] touch-manipulation"
                       onClick={handleLinkClick}>
                        Terms & Conditions</a>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;