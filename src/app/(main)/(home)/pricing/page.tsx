"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";

// Types
type FeatureOption = {
    name: string;
    included: boolean;
    highlight?: string;
};

type PlanTier = {
    name: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice: number;
    features: FeatureOption[];
    buttonText: string;
    buttonStyle: string;
    featured?: boolean;
};

const PricingPage: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    // Define features for each plan
    const pricingPlans: PlanTier[] = [
        {
            name: "Starter",
            description: "Perfect for small businesses or startups exploring business intelligence",
            monthlyPrice: 499,
            yearlyPrice: 399,
            buttonText: "Get Started",
            buttonStyle: "border border-tertiary-light-2 text-gray hover:bg-background-dark-1",
            features: [
                { name: "Snowflake Data Warehouse", included: true, highlight: "Basic tier" },
                { name: "Time Series & Deep Learning Models", included: true, highlight: "Limited models" },
                { name: "AI RAG Chatbot", included: false },
                { name: "Large Recommendation Engine", included: false },
                { name: "Test Time Compute", included: true, highlight: "Standard speed" },
                { name: "Data Integration Hub", included: true, highlight: "Up to 3 sources" },
                { name: "24/7 Support", included: false },
                { name: "Custom Analytics Dashboard", included: false },
            ],
        },
        {
            name: "Professional",
            description: "For growing businesses with advanced analytics needs",
            monthlyPrice: 999,
            yearlyPrice: 799,
            buttonText: "Get Started",
            buttonStyle: "bg-secondary text-white hover:bg-secondary-dark-1",
            featured: true,
            features: [
                { name: "Snowflake Data Warehouse", included: true, highlight: "Advanced tier" },
                { name: "Time Series & Deep Learning Models", included: true, highlight: "Full access" },
                { name: "AI RAG Chatbot", included: true, highlight: "Standard capacity" },
                { name: "Large Recommendation Engine", included: true },
                { name: "Test Time Compute", included: true, highlight: "Enhanced speed" },
                { name: "Data Integration Hub", included: true, highlight: "Up to 10 sources" },
                { name: "24/7 Support", included: true },
                { name: "Custom Analytics Dashboard", included: false },
            ],
        },
        {
            name: "Enterprise",
            description: "For organizations requiring custom solutions and dedicated support",
            monthlyPrice: 1999,
            yearlyPrice: 1599,
            buttonText: "Contact Sales",
            buttonStyle: "bg-primary text-gray hover:bg-primary-dark-1",
            features: [
                { name: "Snowflake Data Warehouse", included: true, highlight: "Enterprise tier" },
                { name: "Time Series & Deep Learning Models", included: true, highlight: "Advanced customization" },
                { name: "AI RAG Chatbot", included: true, highlight: "Unlimited capacity" },
                { name: "Large Recommendation Engine", included: true, highlight: "Custom algorithms" },
                { name: "Test Time Compute", included: true, highlight: "Maximum speed" },
                { name: "Data Integration Hub", included: true, highlight: "Unlimited sources" },
                { name: "24/7 Support", included: true, highlight: "Dedicated team" },
                { name: "Custom Analytics Dashboard", included: true, highlight: "Fully customizable" },
            ],
        },
    ];

    return (
        <div className="bg-background text-gray min-h-screen flex justify-center items-center ">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold dark:text-white  mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-lg dark:text-white/70 max-w-2xl mx-auto">
                        Choose the plan that works best for your business needs. All plans include
                        core analytics capabilities.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center items-center my-8 space-x-4">
                    <button
                        onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                        className="relative inline-flex h-10 rounded-full bg-background-dark-1 p-1 focus:outline-none"
                    >
                        <span className="sr-only">Toggle billing cycle</span>
                        <span
                            className={`
                flex items-center justify-center rounded-full px-4 text-sm font-medium transition-colors z-20
                ${billingCycle === "monthly" ? "text-gray" : "text-slate-400"}
              `}
                        >
                            Monthly
                        </span>
                        <span
                            className={`
                flex items-center justify-center rounded-full px-4 text-sm font-medium transition-colors z-20
                ${billingCycle === "yearly" ? "text-gray" : "text-slate-400"}
              `}
                        >
                            Yearly
                        </span>
                        <span
                            className={`
                absolute top-1 h-8 rounded-full bg-card shadow-sm transition-transform 
                ${billingCycle === "monthly" ? "left-3 translate-x-0" : "left-3 translate-x-full"}
              `}
                            style={{ width: "calc(50% - 0.5rem)" }}
                        />
                    </button>
                    <span className="text-sm bg-primary-light-3 text-primary-dark-3 rounded-full px-3 py-1 font-medium">
                        Save 20%
                    </span>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`
                rounded-lg overflow-hidden shadow-md bg-card relative flex flex-col transition-transform hover:-translate-y-1 hover:shadow-lg
                ${plan.featured ? "border-2 border-secondary-light-1 md:scale-105" : ""}
              `}
                        >
                            {plan.featured && (
                                <div className="absolute top-4 right-4 bg-secondary-light-3 text-secondary-dark-3 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                                    Most Popular
                                </div>
                            )}

                            <div className="p-6">
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-gray mb-2">{plan.name}</h3>
                                    <p className="text-sm text-slate-400 mb-6">{plan.description}</p>
                                    <div className="flex items-baseline">
                                        <span className="text-2xl font-semibold">$</span>
                                        <span className="text-4xl font-extrabold">
                                            {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                                        </span>
                                        <span className="ml-2 text-slate-400 font-normal">/month</span>
                                    </div>
                                </div>

                                <div className="my-8 flex-grow">
                                    <ul className="space-y-4">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start">
                                                <span className={`mr-3 flex-shrink-0 mt-1 ${feature.included ? "text-primary-dark-2" : "text-neutral-light-1"}`}>
                                                    {feature.included ? (
                                                        <Check size={16} />
                                                    ) : (
                                                        <X size={16} />
                                                    )}
                                                </span>
                                                <span className="text-sm">
                                                    {feature.name}
                                                    {feature.included && feature.highlight && (
                                                        <span className="text-gray-dark-1 font-medium"> ({feature.highlight})</span>
                                                    )}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto">
                                    <button
                                        className={`w-full py-3 px-6 rounded-md font-semibold text-center transition-colors ${plan.buttonStyle}`}
                                    >
                                        {plan.buttonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;