import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Users,
  Microscope,
  Heart,
  HandHeart,
} from "lucide-react";

import { whyChooseUsData } from "../data/Why_choose_us_data";

const careWhyChooseUs = [
  {
    id: 1,
    title: "Exceptional clinical talent",
    icon: <Users className="w-6 h-6" />,
    position: { top: "-45%", left: "51%", transform: "translateX(-50%)" },
    active: true,
    slug: "exceptional-clinical-talent",
    description: whyChooseUsData.find(
      (item) => item.slug === "exceptional-clinical-talent"
    ).description,
  },
  {
    id: 2,
    title: "Latest high-end technology",
    icon: <Microscope className="w-6 h-6" />,
    position: { bottom: "-10%", right: "-27%" },
    active: false,
    slug: "latest-high-end-technology",
    description: whyChooseUsData.find(
      (item) => item.slug === "latest-high-end-technology"
    ).description,
  },
  {
    id: 3,
    title: "Caring systems and processes",
    icon: <Heart className="w-6 h-6" />,
    position: { bottom: "-85%", left: "51%", transform: "translateX(-50%)" },
    active: false,
    slug: "caring-systems-and-processes",
    description: whyChooseUsData.find(
      (item) => item.slug === "caring-systems-and-processes"
    ).description,
  },
  {
    id: 4,
    title: "Trust-based compassionate care",
    icon: <HandHeart className="w-6 h-6" />,
    position: { top: "29%", left: "2%" },
    active: false,
    slug: "trust-based-compassionate-care",
    description: whyChooseUsData.find(
      (item) => item.slug === "trust-based-compassionate-care"
    ).description,
  },
];

const WhyChooseUs = () => {
  return (
    <div className=" bg-gray-50 py-10 md:py-12 px-4 sm:mb-[100px] mb-[0px] ">
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-50 md:mb-54 lg:mb-[11rem]">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
            Shri Krupa Jawanjal Model of Care
          </h1>
        </div>

        {/* Desktop circular layout - hidden on mobile */}
        <div className="hidden md:block relative w-full max-w-4xl mx-auto overflow-visible">
          {/* Central circle with image */}
          <div className="relative w-80 h-80 mx-auto mb-4">
            {/* Main circle */}
            <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="model.avif"
                alt="Medical professionals in operating room"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Dotted circle border */}
            <div className="absolute inset-0 w-full h-full rounded-full border-2 border-dashed border-gray-300 scale-125 pointer-events-none"></div>
          </div>

          {/* Interactive points around the circle - Desktop only */}
          <div className="absolute inset-0 pointer-events-none">
            {careWhyChooseUs.map((item) => (
              <div
                key={item.id}
                className="absolute pointer-events-auto"
                style={{
                  ...item.position,
                  zIndex: 10,
                }}
              >
                <div className="relative">
                  <div
                    className="bg-white rounded-lg shadow-xl p-6 border w-64"
                    style={{
                      transform: `translate(${
                        item.position.right
                          ? "-100%"
                          : item.position.left === "50%"
                          ? "-50%"
                          : "0"
                      }, ${
                        item.position.bottom
                          ? "-100%"
                          : item.position.top && item.position.top !== "50%"
                          ? "0"
                          : "-50%"
                      })`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    {/* <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                      {item.description}
                    </p> */}
                    <Link
                      to={`/why-us/${item.slug}`}
                      className="flex items-center gap-2 text-amber-600 font-medium text-sm hover:text-amber-700 transition-colors group"
                    >
                      <span>Know More</span>
                      <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center group-hover:bg-amber-700 transition-colors">
                        <ChevronRight className="w-3 h-3 text-white" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile version - only shown on mobile */}
        <div className="md:hidden">
          {/* Mobile center image */}
          <div className="relative w-48 h-48 mx-auto mb-12">
            <div className="w-full h-full rounded-full overflow-hidden shadow-xl border-4 border-white">
              <img
                src="model.avif"
                alt="Medical professionals in operating room"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mobile stacked cards */}
          <div className="space-y-4">
            {careWhyChooseUs.map((item) => (
              <div
                key={`mobile-${item.id}`}
                className="bg-white rounded-lg shadow-md p-6 border"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <Link
                  to={`/why-us/${item.slug}`}
                  className="flex items-center gap-2 text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors group"
                >
                  <span>Know More</span>
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center group-hover:bg-teal-700 transition-colors">
                    <ChevronRight className="w-3 h-3 text-white" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
