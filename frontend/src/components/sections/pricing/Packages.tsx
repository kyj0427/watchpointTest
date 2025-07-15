"use client";

import { useState } from "react";
import Link from "next/link";

const Packages = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    { name: "Basic Plan", monthly: 25, yearly: 240 },
    { name: "Optimal Plan", monthly: 75, yearly: 720 },
    { name: "Ultimate Plan", monthly: 100, yearly: 999 },
  ];

  const handleToggleChange = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="3xl:col-start-2 3xl:col-end-12 col-span-12 bg-b-neutral-3 rounded-24 px-40p py-60p pricing-section">
            <div className="flex-col-c text-center mb-40p">
              <h3 className="heading-3 text-w-neutral-1 mb-16p text-split-bottom">
                Choose Your Best Pricing Plan
              </h3>
              <p className="text-l-regular text-w-neutral-4 mb-32p">
                Choose a plan tailored to your needs
              </p>
              <div className="flex justify-center items-center gap-3 text-l-regular">
                <span className="pricing-plan">Monthly</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isYearly}
                    onChange={handleToggleChange}
                    className="sr-only peer togglePricing"
                  />
                  <span className="relative w-[42px] h-5 bg-w-neutral-1 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[130%] peer-checked:after:bg-w-neutral-1 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-b-neutral-3 after:rounded-full after:size-4 after:transition-all peer-checked:bg-secondary"></span>
                </label>
                <span className="pricing-plan">Yearly</span>
              </div>
            </div>

            <div className="pricing grid xxl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-30p">
              {plans.map((plan, idx) => (
                <div key={idx}>
                  <div className="tilt-card p-32p border border-shap hover:border-secondary rounded-12 group transition-1">
                    <div className="flex items-center justify-between pb-16p border-b border-shap">
                      <div>
                        <span className="period-text text-sm text-w-neutral-4 uppercase group-hover:text-w-neutral-1 mb-2 transition-1">
                          {isYearly ? "PER YEAR" : "PER MONTH"}
                        </span>
                        <h4 className="heading-4 text-w-neutral-1 group-hover:text-secondary transition-1">
                          {plan.name}
                        </h4>
                      </div>
                      <div className="flex-y">
                        <h2 className="header-2 text-w-neutral-1 group-hover:text-secondary transition-1">
                          $
                        </h2>
                        <h2 className="price span heading-2 group-hover:text-secondary transition-1">
                          {isYearly ? plan.yearly : plan.monthly}
                        </h2>
                      </div>
                    </div>

                    <ul className="list-none text-l-regular grid grid-cols-1 gap-y-24p mt-24p mb-40p *:flex-y *:gap-2">
                      {[
                        "Business documents",
                        "Access to all main profile",
                        "Edit your main profile",
                        "Access to all groups",
                        "Access to community",
                        "Access to all courses",
                      ].map((feature, i) => (
                        <li key={i}>
                          <i className="ti ti-circle-check text-w-neutral-4 group-hover:text-w-neutral-1 icon-24 transition-1"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/checkout"
                      className="btn btn-lg bg-b-neutral-1 group-hover:bg-secondary text-w-neutral-1 group-hover:text-b-neutral-4 rounded-12 w-full"
                    >
                      Choose a Plan
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
