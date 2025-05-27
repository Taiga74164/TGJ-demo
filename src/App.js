import React, { useEffect, useState } from 'react';
import { ArrowRight, Mail, MapPin, Menu, Phone, X } from 'lucide-react';

import PlaylistCarousel from './PlaylistCarousel';
import ResponsiveCarousel from './ResponsiveCarousel';

const TypingText = ({text = "", className = "", speed = 50}) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (currentIndex < text.length) {
                setCurrentText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            } else {
                clearInterval(typingInterval);
            }
        }, speed);

        return () => clearInterval(typingInterval);
    }, [currentIndex, text, speed]);

    return <span className={className}>{currentText}</span>;
};

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        service: '',
        venue: '',
        message: ''
    });
    const [errors, setErrors] = useState({});

    const services = [
        {
            title: "Marriage Celebrant Service",
            description: "Perfect for couples who want a quick, no-fuss ceremony — short, sweet, and fully prepared.",
            image: "images/homepage/4.marriage_celebrant_service_.jpg"
        },
        {
            title: "Wedding MC Service",
            description: "Professional hosting to ensure your reception runs smoothly, on time, and full of energy.",
            image: "images/homepage/4.wedding_mc_service.jpg"
        },
        {
            title: "Tea Ceremony Service",
            description: "A professional host to ensure your tea ceremony runs smoothly, on time, and honours every tradition with care and respect.",
            image: "images/homepage/4._tea_cemony_service.jpg"
        }
    ];

    const processSteps = [
        {
            step: "Step 1",
            title: "Let's Connect",
            description: "Book Your free 30-minute consultation"
        },
        {
            step: "Step 2",
            title: "Legal Requirements",
            description: "Lock in the service and let us handle all the legal paperwork"
        },
        {
            step: "Step 3",
            title: "Ceremony Planning",
            description: "Meetup to discuss your program"
        },
        {
            step: "Step 4",
            title: "Your Special Day",
            description: "Enjoy your special day!"
        }
    ];

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Required fields validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.service) {
            newErrors.service = 'Please select a service';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            alert('Thank you for your inquiry! We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                service: '',
                venue: '',
                message: ''
            });
            setErrors({});
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f4f1]">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-[#f5f4f1] backdrop-blur-md z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20 md:h-24 relative">

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
                                        className="text-gray-700 hover:text-[#867e64] transition-colors focus:outline-none">
                                        Services
                                    </button>
                                    <div
                                        className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
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
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen
                                ? <X className="w-8 h-8" color="#867e64"/>
                                : <Menu className="w-8 h-8" color="#867e64"/>}
                        </button>

                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-[#867e64]">Home</a>
                            <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-[#867e64]">About</a>
                            <div className="border-t my-1"></div>
                            <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-[#867e64]">Marriage
                                Celebrant</a>
                            <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-[#867e64]">Wedding
                                MC</a>
                            <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-[#867e64]">Tea
                                Ceremony</a>
                            <div className="border-t my-1"></div>
                            <a href="#vendors"
                               className="block px-3 py-2 text-gray-700 hover:text-[#867e64]">Vendors</a>
                            <a href="#blog" className="block px-3 py-2 text-gray-700 hover:text-[#867e64]">Blog</a>
                            <a href="#contact"
                               className="block px-3 py-2 text-gray-700 hover:text-[#867e64]">Contact</a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative h-screen flex items-center justify-center">
                <div className="absolute inset-0">
                    {/* <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/placeholder.jpg')",
              backgroundAttachment: 'fixed'
            }}
          ></div> */}
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src="videos/intro.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />

                    <div className="absolute inset-0 bg-black/80 "></div>
                </div>

                {/* Foreground Text */}
                <div className="relative z-10 text-center text-[#f5f4f1] max-w-4xl mx-auto px-4">
                    <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
                        Celebrate Your Love with JO
                        <br/>
                        {/* <span className="text-[#867e64]">Your Story, Your Way</span> */}
                        <TypingText text="Your Story, Your Way" className="text-[#867e64]" speed={100}/>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-[#f5f4f1]">
                        Together With Jo — Your Bilingual Celebrant and MC — creates heartfelt, unforgettable weddings
                        that reflect your unique love story, not only just paperwork
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* <a
              href="#contact" 
              className="bg-rose-500 hover:bg-[#867e64] text-[#f5f4f1] px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Book Your Ceremony
            </a> */}
                        <a
                            href="#services"
                            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-[#f5f4f1] px-8 py-4 rounded-full text-lg font-semibold transition-all border border-white/30"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-[#f5f4f1]">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group relative rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 h-[500px] md:h-[70vh]"
                            >
                                {/* Background image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{backgroundImage: `url(${service.image})`}}
                                ></div>
                                {/* Overlay */}
                                <div
                                    className="absolute bottom-0 w-full text-center overflow-hidden transition-all duration-500 group-hover:h-40 h-16 bg-[#f5f4f1] bg-opacity-80 group-hover:bg-[#f5f4f1]-90 group-hover:backdrop-blur-sm">
                                    <div
                                        className="transition-all duration-500 transform group-hover:translate-y-4 translate-y-4">
                                        <h3 className="font-serif text-xl text-gray-800">{service.title}</h3>

                                        <div
                                            className="flex items-center justify-center my-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div
                                                className="flex-grow h-px mx-2 bg-gradient-to-r from-transparent to-[#867e64]"/>
                                            {/* <div className="flex-grow h-px mx-2 bg-gradient-to-r from-transparent via-[#867e64] to-transparent" /> */}
                                            <img src="images/ring.png" alt="Ring"
                                                 className="h-auto max-h-5 w-auto pointer-events-none select-none"/>
                                            <div
                                                className="flex-grow h-px mx-2 bg-gradient-to-r from-[#867e64] to-transparent"/>
                                            {/* <div className="flex-grow h-px mx-2 bg-gradient-to-r from-transparent via-[#867e64] to-transparent" /> */}
                                        </div>

                                        <p className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-6 text-center">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">Just 4 Simple Steps to
                                Get Married</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                We make your wedding planning simple and stress-free
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {processSteps.map((step, index) => (
                                <div key={index} className="text-center relative">
                                    <div className="relative mb-6">
                                        <div
                                            className="w-16 h-16 bg-[#867e64] text-[#f5f4f1] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                            {index + 1}
                                        </div>
                                        {index < processSteps.length - 1 && (
                                            // <div className="hidden lg:block absolute top-1/2 left-[calc(100%+0.5rem)] w-24 h-0.5 bg-[#867e64]"></div>
                                            <div
                                                className="hidden lg:flex absolute top-1/2 left-full transform -translate-y-1/2">
                                                <ArrowRight className="w-8 h-8 text-[#867e64]"/>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-serif text-xl text-gray-800 mb-2">{step.step}</h3>
                                    <h4 className="font-semibold text-lg text-[#867e64] mb-3">{step.title}</h4>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Playlist Section */}
            <section className="py-20 bg-[#f5f4f1]">
                <PlaylistCarousel
                    images={[
                        "images/homepage/6.7.jpg",
                        "images/homepage/6.2.jpg",
                        "images/homepage/6.1.jpg",
                        "images/homepage/6.3.jpg",
                        "images/homepage/6.4.jpg",
                        "images/homepage/6.5.jpg",
                    ]}
                />
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-[#f5f4f1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">Let's Plan Your Special
                            Day</h2>
                        <p className="text-xl text-gray-600">Enquire about our wedding ceremony packages — or have any
                            questions?</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="font-serif text-2xl text-gray-800 mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-[#cdcbbb] p-3 rounded-full">
                                        <Phone className="w-6 h-6 text-[#867e64]"/>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-800">Phone</div>
                                        <div className="text-gray-600">0452 541 021</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-[#cdcbbb] p-3 rounded-full">
                                        <Mail className="w-6 h-6 text-[#867e64]"/>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-800">Email</div>
                                        <div className="text-gray-600">togetherwithjo@gmail.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-[#cdcbbb] p-3 rounded-full">
                                        <MapPin className="w-6 h-6 text-[#867e64]"/>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-800">Location</div>
                                        <div className="text-gray-600">Office 1, Level 1, 65 -67 Scott Street,
                                            Liverpool, NSW 2170
                                        </div>
                                        <div className="text-gray-600">Tuesday - Friday: 10:30 AM - 6:00 PM</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name *"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#605648] focus:border-transparent transition-all ${
                                                errors.name ? 'border-red-500' : 'border-[#b0ac94]'
                                            }`}
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address *"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#605648] focus:border-transparent transition-all ${
                                                errors.email ? 'border-red-500' : 'border-[#b0ac94]'
                                            }`}
                                        />
                                        {errors.email &&
                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-[#b0ac94] rounded-lg focus:ring-2 focus:ring-[#605648] focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-[#b0ac94] rounded-lg focus:ring-2 focus:ring-[#605648] focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#605648] focus:border-transparent transition-all ${
                                                errors.service ? 'border-red-500' : 'border-[#b0ac94]'
                                            }`}
                                        >
                                            <option value="">Select Service Type *</option>
                                            <option value="marriage_celebrant">Marriage Celebrant</option>
                                            <option value="mc">Wedding MC</option>
                                            <option value="tea_ceremony">Tea Ceremony</option>
                                        </select>
                                        {errors.service &&
                                            <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="venue"
                                            placeholder="Venue (optional)"
                                            value={formData.venue}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-[#b0ac94] rounded-lg focus:ring-2 focus:ring-[#605648] focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        placeholder="Tell us about your vision for your special day... *"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#605648] focus:border-transparent transition-all resize-none ${
                                            errors.message ? 'border-red-500' : 'border-[#b0ac94]'
                                        }`}
                                    ></textarea>
                                    {errors.message &&
                                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#867e64] hover:bg-[#605648] text-[#f5f4f1] py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                                    onClick={handleSubmit}
                                >
                                    Send Inquiry
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Default Carousel */}
            <section className="py-20 bg-[#f5f4f1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">My Happily-Ever-Afters</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Recent beautiful ceremonies we've had the honor to celebrate
                        </p>
                    </div>
                </div>

                <ResponsiveCarousel/>

                <div className="text-center mt-12">
                    <a href="#blog"
                       className="inline-flex items-center text-xl md:text-3xl transition text-gray-800 hover:text-[#867e64] underline">
                        View our Blog for more couples
                        <svg xmlns="http://www.w3.org/2000/svg"
                             height="1em"
                             viewBox="0 0 512 512"
                             fill="currentColor"
                             className="ml-2 w-8 h-8 underline">
                            <path
                                d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/>
                        </svg>
                    </a>
                </div>

                <div className="mt-12">
                    <PlaylistCarousel
                        images={[
                            "images/homepage/9.1.jpg",
                            "images/homepage/9.2.jpg",
                            "images/homepage/9.3.jpg",
                            "images/homepage/9.4.jpg",
                            "images/homepage/9.5.jpg",
                            "images/homepage/9.6.jpg",
                        ]}
                    />
                </div>

            </section>

            {/* Vendors */}
            <section id="vendors" className="py-20 bg-[#f5f4f1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="font-serif text-5xl sm:3xl text-gray-800 mb-6">The Vendors</h3>
                            <p className="text-gray-600">
                                To help you find the best services for your big day, I’ve partnered with trusted vendors
                                I’ve personally worked with. After booking with me, you’ll receive a referral code to
                                enjoy 5% OFF
                            </p>

                            <button
                                className="w-[30vh] mt-4 bg-[#867e64] hover:bg-[#605648] text-[#f5f4f1] py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                                Click here to see all vendors
                            </button>
                        </div>

                        <div>
                            <div className="space-y-6">
                                <img src="images/vendors.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#29231f] text-[#f5f4f1] py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {/* Logo & Socials */}
                        <div>
                            <div className="mb-4">
                                <img
                                    src="images/nav_logo_short_4x.png"
                                    alt="Footer Logo"
                                    className="h-auto max-h-32 w-auto pointer-events-none select-none"
                                />
                            </div>
                            <div className="flex space-x-4 items-center justify-center">
                                <a href="https://instagram.com/togetherwith.jo" target="_blank"
                                   rel="noopener noreferrer"
                                   className="hover:text-[#cdcbbb] transition text-[#867e64]">
                                    <svg role="img" className="w-6 h-6 " fill="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg"><title>Instagram</title>
                                        <path
                                            d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>
                                    </svg>
                                </a>
                                <a href="https://www.facebook.com/togetherwithjo" target="_blank"
                                   rel="noopener noreferrer"
                                   className="hover:text-[#cdcbbb] transition text-[#867e64]">
                                    <svg role="img" className="w-6 h-6 " fill="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg"><title>Facebook</title>
                                        <path
                                            d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
                                    </svg>
                                </a>
                                <a href="https://www.youtube.com/@TogetherWithJo" target="_blank"
                                   rel="noopener noreferrer"
                                   className="hover:text-[#cdcbbb] transition text-[#867e64]">
                                    <svg role="img" className="w-6 h-6 " fill="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg"><title>YouTube</title>
                                        <path
                                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                </a>
                                <a href="https://wa.me/+61452541021" target="_blank"
                                   rel="noopener noreferrer"
                                   className="hover:text-[#cdcbbb] transition text-[#867e64]">
                                    <svg role="img" className="w-6 h-6 " fill="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title>
                                        <path
                                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                </a>
                                <a href="https://zalo.me/+61452541021" target="_blank"
                                   rel="noopener noreferrer"
                                   className="hover:text-[#cdcbbb] transition text-[#867e64]">
                                    <svg role="img" className="w-6 h-6 " fill="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg"><title>Zalo</title>
                                        <path
                                            d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold text-lg text-[#b0ac94] mb-4">Quick Links</h4>
                            <div className="space-y-2">
                                <a href="#services"
                                   className="block text-[#f5f4f1] hover:text-[#867e64] transition">Marriage Celebrant
                                    Service</a>
                                <a href="#services"
                                   className="block text-[#f5f4f1] hover:text-[#867e64] transition">Wedding MC
                                    Service</a>
                                <a href="#services"
                                   className="block text-[#f5f4f1] hover:text-[#867e64] transition">Tea Ceremony
                                    Service</a>
                                <a href="#vendors"
                                   className="block text-[#f5f4f1] hover:text-[#867e64] transition">Vendors</a>
                                <a href="#blog"
                                   className="block text-[#f5f4f1] hover:text-[#867e64] transition">Blog</a>
                                <a href="#contact"
                                   className="block text-[#f5f4f1] hover:text-[#867e64] transition">Contact</a>
                                <a href="#contact"
                                   className="block text-[#f5f4f1] hover:text-[#867e64] transition">Terms &
                                    Conditions</a>
                            </div>
                        </div>

                        {/* Get In Touch */}
                        <div>
                            <h4 className="font-semibold text-lg text-[#b0ac94] mb-4">Get In Touch</h4>
                            <div className="space-y-2 text-sm">
                                <div className="text-[#f5f4f1]">Phone: 0452 541 021</div>
                                <div className="text-[#f5f4f1]">Email: togetherwithjo@gmail.com</div>
                                <div className="text-[#f5f4f1]">Office 1, Level 1, 65-67 Scott Street, Liverpool, NSW
                                    2170
                                </div>
                                <div className="text-[#f5f4f1]">Tuesday - Friday: 10:30 AM - 6:00 PM
                                </div>
                            </div>
                        </div>
                        {/* Reviews */}
                        <div>
                            <h4 className="font-semibold text-lg text-[#b0ac94] mb-4">Reviews</h4>
                            <a
                                href="https://www.google.com/search?sca_esv=6675700340da7af0&hl=en&authuser=1&sxsrf=AE3TifNGLqMz70rhssObrrS17jWrXWPeCA:1748305067356&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E8TIBUxs-bK_2Npl_KSaeeQ_K9NgSt3z_LKYamv9S9wb-de_RBm0dioEMGoKHvKm2JguPn_tO1K_LMyC0OSLMs6d0XnRkgqV5e-x2Wka0IFDX1jAdUu55IARP3s0wz0Ekl72KlBWVzwCawYIcgcqKo9iPlvT&q=Together+with+Jo+-+Authorised+Marriage+Celebrant+Reviews&sa=X&ved=2ahUKEwjJuP7zr8KNAxUSETQIHXAuO9gQ0bkNegQILBAE&biw=1278&bih=1312&dpr=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-[#f5f4f1] hover:text-[#867e64] transition"
                            >
                                <img src="images/google_review.png"/>
                            </a>
                            <a
                                href="https://www.easyweddings.com.au/MarriageCelebrant/Sydney/TogetherWithJoBilingualEnglishAndVietnamese/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-[#f5f4f1] hover:text-[#867e64] transition"
                            >
                                <img src="images/easy_weddings.png"/>
                            </a>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; 2025 Celebrate With JO. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
