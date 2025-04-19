"use client";

// pages/index.tsx
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'motion/react'; // Correct import
import {
    IconTriangle,
    IconSquare,
    IconCircle,
    IconDiamond
} from '@tabler/icons-react';
import { Button } from "@/components/ui/button";

export default function Home() {
    // Refs for the floating shapes
    const triangleRef = useRef<HTMLDivElement>(null);
    const square1Ref = useRef<HTMLDivElement>(null);
    const square2Ref = useRef<HTMLDivElement>(null);
    const diamond1Ref = useRef<HTMLDivElement>(null);
    const diamond2Ref = useRef<HTMLDivElement>(null);

    // Animation for floating shapes
    useEffect(() => {
        const triangle = triangleRef.current;
        const square1 = square1Ref.current;
        const square2 = square2Ref.current;
        const diamond1 = diamond1Ref.current;
        const diamond2 = diamond2Ref.current;

        if (!triangle || !square1 || !square2 || !diamond1 || !diamond2) return;

        // Triangle animation
        let triangleTime = 0;
        const animateTriangle = () => {
            triangleTime += 0.01;
            const x = Math.sin(triangleTime) * 15;
            const y = Math.cos(triangleTime) * 10;
            triangle.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(animateTriangle);
        };

        // Square 1 animation
        let square1Time = Math.PI / 4;
        const animateSquare1 = () => {
            square1Time += 0.008;
            const x = Math.sin(square1Time) * 20;
            const y = Math.cos(square1Time) * 15;
            square1.style.transform = `translate(${x}px, ${y}px) rotate(${square1Time * 5}deg)`;
            requestAnimationFrame(animateSquare1);
        };

        // Square 2 animation
        let square2Time = Math.PI / 2;
        const animateSquare2 = () => {
            square2Time += 0.01;
            const x = Math.sin(square2Time) * 25;
            const y = Math.cos(square2Time) * 20;
            square2.style.transform = `translate(${x}px, ${y}px) rotate(${square2Time * 3}deg)`;
            requestAnimationFrame(animateSquare2);
        };

        // Diamond 1 animation
        let diamond1Time = Math.PI / 3;
        const animateDiamond1 = () => {
            diamond1Time += 0.012;
            const x = Math.sin(diamond1Time) * 30;
            const y = Math.cos(diamond1Time) * 25;
            diamond1.style.transform = `translate(${x}px, ${y}px) rotate(${diamond1Time * 4}deg)`;
            requestAnimationFrame(animateDiamond1);
        };

        // Diamond 2 animation
        let diamond2Time = Math.PI / 6;
        const animateDiamond2 = () => {
            diamond2Time += 0.009;
            const x = Math.sin(diamond2Time) * 20;
            const y = Math.cos(diamond2Time) * 15;
            diamond2.style.transform = `translate(${x}px, ${y}px) rotate(${diamond2Time * 6}deg)`;
            requestAnimationFrame(animateDiamond2);
        };

        // Start animations
        animateTriangle();
        animateSquare1();
        animateSquare2();
        animateDiamond1();
        animateDiamond2();
    }, []);

    const handleScrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };

    // Animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="bg-background dark:bg-gray-900 overflow-y-auto">
            <Head>
                <title>AI - foreseen</title>
                <meta name="description" content="Professional AI Forecasting Service" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="relative w-full">
                {/* Hero Section */}
                <section className="relative px-4 md:px-12 lg:px-24 min-h-[80vh] mt-32 overflow-x-hidden">
                    {/* Floating shapes */}
                    <div
                        ref={triangleRef}
                        className="absolute left-20 top-40 text-secondary-light-2 dark:text-secondary-dark-2 opacity-70 z-10 will-change-transform"
                        style={{ willChange: 'transform' }}
                    >
                        <IconTriangle size={30} stroke={1.5} />
                    </div>

                    <div
                        ref={square1Ref}
                        className="absolute right-1/3 top-12 text-primary dark:text-primary-dark opacity-70 z-10 will-change-transform"
                        style={{ willChange: 'transform' }}
                    >
                        <IconSquare size={24} stroke={1.5} />
                    </div>

                    <div
                        ref={diamond1Ref}
                        className="absolute right-1/4 bottom-1/3 text-primary-light-1 dark:text-primary-dark-1 opacity-70 z-10 will-change-transform"
                        style={{ willChange: 'transform' }}
                    >
                        <IconDiamond size={20} stroke={1.5} />
                    </div>

                    <div
                        ref={square2Ref}
                        className="absolute bottom-1/4 left-1/2 text-secondary dark:text-secondary-dark opacity-70 z-10 will-change-transform"
                        style={{ willChange: 'transform' }}
                    >
                        <IconSquare size={18} stroke={1.5} transform="rotate(45)" />
                    </div>

                    <div
                        ref={diamond2Ref}
                        className="absolute bottom-24 left-24 text-tertiary-light-1 dark:text-tertiary-dark-1 opacity-70 z-10 will-change-transform"
                        style={{ willChange: 'transform' }}
                    >
                        <IconDiamond size={24} stroke={1.5} />
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-8xl mx-auto lg:-mr-40 overflow-x-hidden">
                        {/* Left content with staggered animations */}
                        <motion.div
                            className="lg:w-1/2 relative z-20 lg:max-w-xl h-full flex justify-center flex-col"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h3
                                variants={itemVariants}
                                className="text-primary font-medium tracking-wide mb-4"
                            >
                                Stop Guessing, Start Planning!
                            </motion.h3>

                            <motion.h2
                                variants={itemVariants}
                                className="text-black dark:text-white text-6xl md:text-7xl lg:text-8xl font-black text-tertiary dark:text-tertiary-dark leading-tight"
                            >
                                FORSEEN<br className="mb-4" />
                                AI<span className="text-primary dark:text-primary-dark">.</span>
                            </motion.h2>

                            <motion.p
                                variants={itemVariants}
                                className="text-neutral-dark-1 dark:text-neutral-light-1 mt-6 mb-8 max-w-lg leading-relaxed"
                            >
                                Stop relying on intuition, start predicting success. FORSEEN - AI empowers modern DTC brands with cutting-edge AI, transforming data into actionable intelligence. Optimize everything from inventory to marketing, unlock customer insights, and gain a decisive edge. Ready to foresee your future?
                            </motion.p>

                            <Button
                                onClick={handleScrollToNextSection}
                                className="inline-block bg-secondary dark:bg-secondary-dark hover:bg-secondary-dark-1 dark:hover:bg-secondary-dark-2 text-white w-max rounded-md px-8 py-3 font-medium transition-colors duration-300"
                            >
                                READ MORE
                            </Button>
                        </motion.div>

                        {/* Right side grid gallery with fade-in animation */}
                        <motion.div
                            className="lg:w-1/2 mt-12 lg:mt-0 justify-self-right xl:-mr-16"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <div className="grid grid-cols-3 gap-2 pt-16 max-h-[70vh] w-[min(100%,500px)] mx-auto">
                                {/* Row 1 */}
                                <div className="rounded-xl aspect-square relative overflow-hidden">
                                    <Image src="/hero/circle-mid.svg" alt="Decorative SVG" fill className="object-cover" />
                                </div>
                                <div className="rounded-xl aspect-square relative overflow-hidden">
                                    <Image src="/hero/mid-circle.svg" alt="Decorative SVG" fill className="object-cover" />
                                </div>
                                <div className="rounded-xl aspect-square relative overflow-hidden">
                                    <Image src="/hero/mid-div.svg" alt="Decorative SVG" fill className="object-cover" />
                                </div>

                                {/* Row 2 */}
                                <div className="rounded-xl aspect-square relative overflow-hidden">
                                    <Image src="/hero/rounded-lef.svg" alt="Decorative SVG" fill className="object-cover" />
                                </div>
                                <div className="rounded-xl aspect-square relative overflow-hidden">
                                </div>
                                <div className="rounded-xl aspect-square relative overflow-hidden">
                                    <Image src="/hero/circle-mid.svg" alt="Decorative SVG" fill className="object-cover" />
                                </div>

                                {/* Row 3 */}
                                <div className="rounded-xl aspect-square relative overflow-hidden">
                                </div>
                                <div className="rounded-xl aspect-square relative overflow-hidden">
                                    <Image src="/hero/mid-div.svg" alt="Decorative SVG" fill className="object-cover" />
                                </div>
                                <div className="rounded-xl aspect-square relative overflow-hidden">
                                    <div className="rounded-xl h-full w-full aspect-square relative bg-gradient-to-br from-primary to-primary-dark-1 flex items-center justify-center text-white">
                                        <span className="text-lg font-medium"></span>
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="rounded-xl aspect-square relative overflow-hidden">
                                </div>
                                <div className="rounded-xl aspect-square relative overflow-hidden">
                                </div>
                                <div className="rounded-xl aspect-square relative overflow-hidden">
                                    <Image src="/hero/rounded-top-right.svg" alt="Decorative SVG" fill className="object-cover" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

        </div>
    );
}