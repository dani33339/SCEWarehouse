import React, { useState, useEffect } from 'react';
import './ScrollToButton.css'; // Create a CSS file to style the button


const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show/hide the button based on the scroll position
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;

            if (scrollTop > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) {
        return null; // Render nothing if the button is not visible
    }

    return (
        <button className="scroll-to-top" onClick={scrollToTop}>
            🔝
        </button>
    );
};

export default ScrollToTopButton;