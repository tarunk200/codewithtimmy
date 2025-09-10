import React, { useState, useEffect, useRef, useMemo } from 'react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('3583OdxcBw0d-ZG3N');

// SVG Icon Components
const SunIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const MenuIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const TwitterIcon = () => (
    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
);

const GithubIcon = () => (
    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const CodeLogoIcon = () => (
    <svg className="h-8 w-8 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);


// Custom hook for scroll animations
const useScrollAnimation = () => {
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return elementRef;
};


// Header Component
const Header = ({ theme, toggleTheme, isMenuOpen, toggleMenu }) => {
    const handleMobileLinkClick = () => {
        if(isMenuOpen) {
            toggleMenu();
        }
    }

    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md sticky top-0 z-50 transition-colors">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" className="flex items-center text-2xl font-bold text-gray-800 dark:text-gray-200">
                    <CodeLogoIcon />
                    <span>CodewithTimmy</span>
                </a>
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#home" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a>
                    <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a>
                    <a href="#courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Courses</a>
                    <a href="#tutorials" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Tutorials</a>
                    <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
                </div>
                <div className="flex items-center">
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </button>
                    <button onClick={toggleMenu} className="md:hidden ml-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                        <MenuIcon />
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="md:hidden px-6 pb-4">
                    <a href="#home" onClick={handleMobileLinkClick} className="block py-2 hover:text-indigo-600 dark:hover:text-indigo-400">Home</a>
                    <a href="#about" onClick={handleMobileLinkClick} className="block py-2 hover:text-indigo-600 dark:hover:text-indigo-400">About</a>
                    <a href="#courses" onClick={handleMobileLinkClick} className="block py-2 hover:text-indigo-600 dark:hover:text-indigo-400">Courses</a>
                    <a href="#tutorials" onClick={handleMobileLinkClick} className="block py-2 hover:text-indigo-600 dark:hover:text-indigo-400">Tutorials</a>
                    <a href="#contact" onClick={handleMobileLinkClick} className="block py-2 hover:text-indigo-600 dark:hover:text-indigo-400">Contact</a>
                </div>
            )}
        </header>
    );
};

// Home Section Component
const HomeSection = () => {
    const [subjectIndex, setSubjectIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const subjects = useMemo(() => ['Java', 'Python', 'C', 'C++', 'Web Development'], []);
    
    useEffect(() => {
        const typingSpeed = 150;
        const deletingSpeed = 75;
        const pauseDuration = 2000;
        const currentSubject = subjects[subjectIndex];

        const handleTyping = () => {
            if (isDeleting) {
                if (charIndex > 0) {
                    setDisplayedText(currentSubject.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setSubjectIndex((prev) => (prev + 1) % subjects.length);
                }
            } else {
                if (charIndex < currentSubject.length) {
                    setDisplayedText(currentSubject.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), pauseDuration);
                }
            }
        };

        const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, subjectIndex, displayedText, subjects]);


    return (
        <section id="home" className="text-center min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-text" style={{animationDelay: '0.2s'}}>Welcome to <span className="text-indigo-600 dark:text-indigo-400">CodewithTimmy</span></h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl animate-fade-in-text" style={{animationDelay: '0.4s'}}>
                Your one-stop destination for learning web development. From beginner tutorials to advanced courses, we have everything you need to become a coding pro.
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mt-6 h-12 animate-fade-in-text" style={{animationDelay: '0.6s'}}>
                Learn{' '}
                <span className="text-indigo-500 dark:text-indigo-400">
                    {displayedText}
                </span>
                <span className="typing-cursor">|</span>
            </h2>
            <a href="#courses" className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 animate-fade-in-text" style={{animationDelay: '0.8s'}}>Explore Courses</a>
        </section>
    );
};

// About Section Component
const AboutSection = () => {
    const sectionRef = useScrollAnimation();
    return (
        <section id="about" className="py-20 scroll-reveal" ref={sectionRef}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <img src="/images/workspace_about.png" alt="Timmy's Workspace" className="rounded-full shadow-2xl w-96 h-96 object-cover" />
                </div>
                <div>
                    <h2 className="text-4xl font-bold mb-4">About Me</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Hi, I'm Timmy! I'm a passionate web developer and instructor dedicated to making coding accessible and fun for everyone. My goal is to break down complex topics into easy-to-understand lessons.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        With years of experience in the industry, I've created "CodewithTimmy" to share my knowledge and help you build amazing websites and applications. Join me on this exciting journey!
                    </p>
                </div>
            </div>
        </section>
    );
};

// Course Card Component
const CourseCard = ({ imgSrc, title, description, delay }) => {
    const cardRef = useScrollAnimation();
    return (
        <div ref={cardRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 scroll-reveal" style={{transitionDelay: delay}}>
            <img src={imgSrc} className="w-full h-48 object-cover" alt={title} />
            <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
                <a href="#" className="text-indigo-600 dark:text-indigo-400 font-semibold">Learn More &rarr;</a>
            </div>
        </div>
    );
};

// Courses Section Component
const CoursesSection = () => {
    const titleRef = useScrollAnimation();
    return(
        <section id="courses" className="py-20">
            <h2 ref={titleRef} className="text-4xl font-bold text-center mb-12 scroll-reveal">Our Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CourseCard 
                    imgSrc="https://placehold.co/400x250/34d399/ffffff?text=Frontend+Mastery"
                    title="Frontend Mastery"
                    description="Learn HTML, CSS, and JavaScript from scratch. Build beautiful and responsive websites."
                    delay="100ms"
                />
                <CourseCard 
                    imgSrc="https://placehold.co/400x250/fbbf24/ffffff?text=React+For+Beginners"
                    title="React For Beginners"
                    description="Dive into the most popular JavaScript library for building user interfaces."
                    delay="200ms"
                />
                <CourseCard 
                    imgSrc="https://placehold.co/400x250/f87171/ffffff?text=Full-Stack+Node.js"
                    title="Full-Stack Node.js"
                    description="Become a full-stack developer by mastering Node.js, Express, and MongoDB."
                    delay="300ms"
                />
            </div>
        </section>
    );
};

// Tutorial Item Component
const TutorialItem = ({ title, description, delay }) => {
    const itemRef = useScrollAnimation();
    return (
        <a href="#" ref={itemRef} className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:shadow-indigo-500/20 scroll-reveal" style={{transitionDelay: delay}}>
            <h3 className="text-2xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </a>
    );
};

// Tutorials Section Component
const TutorialsSection = () => {
    const titleRef = useScrollAnimation();
    return (
        <section id="tutorials" className="py-20">
            <h2 ref={titleRef} className="text-4xl font-bold text-center mb-12 scroll-reveal">Latest Tutorials</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
                <TutorialItem 
                    title="CSS Flexbox in 10 Minutes"
                    description="A quick and practical guide to mastering Flexbox for modern layouts."
                    delay="100ms"
                />
                <TutorialItem 
                    title="Understanding JavaScript Promises"
                    description="Demystify asynchronous JavaScript with this clear explanation of Promises."
                    delay="200ms"
                />
                <TutorialItem 
                    title="Getting Started with Tailwind CSS"
                    description="Learn how to set up and use the utility-first CSS framework that's taking over."
                    delay="300ms"
                />
            </div>
        </section>
    );
};

// Contact Section Component
const ContactSection = () => {
    const titleRef = useScrollAnimation();
    const formRef = useScrollAnimation();
    const socialRef = useScrollAnimation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await emailjs.sendForm(
                'service_oowkrf4',
                'template_contact',
                e.target,
                '3583OdxcBw0d-ZG3N'
            );
            
            alert('Message sent successfully!');
            e.target.reset();
        } catch (error) {
            console.error('Full error object:', error);
            console.error('Error message:', error.message);
            console.error('Error text:', error.text);
            console.error('Error status:', error.status);
            alert('Failed to send message. Check console for details.');
        }
    };

    return (
        <section id="contact" className="py-20">
            <h2 ref={titleRef} className="text-4xl font-bold text-center mb-12 scroll-reveal">Get In Touch</h2>
            
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
                <div ref={formRef} className="scroll-reveal" style={{ transitionDelay: '100ms' }}>
                    <h3 className="text-2xl font-bold mb-4">Send me a message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" name="name" id="name" required className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input type="email" name="email" id="email" required className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea id="message" name="message" rows="4" required className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                <div ref={socialRef} className="scroll-reveal" style={{ transitionDelay: '200ms' }}>
                    <h3 className="text-2xl font-bold mb-4">...or find me on social media</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Have a question or want to work together? Feel free to reach out on my social channels!
                    </p>
                    <div className="flex justify-start space-x-6">
                        <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-transform transform hover:scale-110"><TwitterIcon /></a>
                        <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-transform transform hover:scale-110"><GithubIcon /></a>
                        <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-transform transform hover:scale-110"><LinkedInIcon /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};


// Footer Component
const Footer = () => (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4 text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CodewithTimmy. All Rights Reserved.
        </div>
    </footer>
);

// Back to Top Button Component
const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
        >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};


// Main App Component
export default function App() {
    // State to manage the theme (light/dark)
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                return 'dark';
            }
        }
        return 'light';
    });

    // State to manage mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Effect to apply the theme class to the root element
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    // Effect for one-time setup
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.fontFamily = "'Inter', sans-serif";
    }, []);

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes blink {
                        50% { opacity: 0; }
                    }
                    .animate-fade-in-text {
                        animation: fadeIn 0.5s ease-out forwards;
                    }
                    .typing-cursor {
                        animation: blink 0.7s infinite;
                        color: inherit;
                    }
                    .scroll-reveal {
                        opacity: 0;
                        transform: translateY(30px);
                        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                    }
                    .scroll-reveal.is-visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                `}
            </style>
            <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                <Header theme={theme} toggleTheme={toggleTheme} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <main className="container mx-auto px-6 py-12">
                    <HomeSection />
                    <AboutSection />
                    <CoursesSection />
                    <TutorialsSection />
                    <ContactSection />
                </main>
                <Footer />
                <BackToTopButton />
            </div>
        </>
    );
}


