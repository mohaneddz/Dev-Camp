import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-[--color-tertiary-dark-3] text-[--color-neutral-light-2]">
            <div className="relative p-8 sm:p-12 flex flex-col items-center justify-center gap-4 w-full overflow-hidden bg-primary-dark-3">

                {/*  Abstract shape (SVG or similar) */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1000 100"
                        preserveAspectRatio="none"
                        className="fill-[--color-background]"
                    >
                        <path d="M0,0 L0,100 C150,80 350,20 500,20 C650,20 850,80 1000,100 L1000,0 Z" />
                    </svg>
                </div>

                <h3 className="font-bold text-2xl text-center relative z-10 text-[--color-primary-light-1]">
                    FORSEEN - AI
                </h3>

                <p className="text-sm text-center relative z-10">
                    Built by the{" "}
                    <a
                        href="#" // Replace with actual link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[--color-primary-light-2]"
                    >
                        Data Wizards Team
                    </a>.
                    © {new Date().getFullYear()} All rights reserved.
                </p>

                {/* Subtle line separator */}
                <div className="w-24 h-px bg-[--color-primary-dark-2] relative z-10"></div>

                {/* Additional small text (e.g., terms of service) */}
                <p className="text-xs text-center relative z-10">
                    <a href="#" className="hover:underline hover:text-[--color-primary-light-2]">Terms of Service</a> | <a href="#" className="hover:underline hover:text-[--color-primary-light-2]">Privacy Policy</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;