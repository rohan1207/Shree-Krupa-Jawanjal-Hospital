import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaStethoscope,
  FaHeartbeat,
  FaUserMd,
  FaXRay,
  FaBaby,
  FaBone,
  FaHospital,
  FaFlask,
  FaProcedures,
  FaUserNurse,
  FaLinkedin,
  FaEnvelope,
  FaCalendar,
  FaArrowLeft,
  FaArrowRight,
  FaSearch,
  FaEye,
} from "react-icons/fa";

const doctors = [
  {
    name: "Dr. Sumeet Jagtap",
    image: "/sumeet_jagtap.jpeg",
    experience: "8 years of experience",
    specialties: ["General Medicine", "Cardiology"],
    description:
      "Dr. Sumeet Jagtap is a reliable and one of the Best General Physician and Internal Medicine in Chikhli Chikhli. He completed his MBBS from Smt Kashibai Navale Medical College and MD medicine from Bharati Vidyapeeth Medical College. He holds diplomas in critical care medicine (IDCCM), PGCDM, and Evidence-based Diabetes management. Currently practicing as Consultant physician, Dialectologist & Intensivist at Shri Krupa Jawanjal Hospital.",
  },
  {
    name: "Dr. Pallavi Sumeet Jagtap",
    image: "/pallavi.jpeg",
    experience: "6 years of experience",
    specialties: ["Gynecology", "Obstetrics", "Laparoscopic Surgery"],
    description:
      "Dr. Pallavi Jagtap is a reliable and one of the best Gynecologist in Chikhli Chikhli. She completed her MBBS from Smt Kashibai Navale Medical College and post-graduation in obstetrics and gynecology from Krishna Institute of Medical Sciences, Karad. She specializes in high-risk pregnancy and laparoscopic surgeries.",
  },
  {
    name: "Dr. Sunil Jagtap",
    image: "/hero3.jpg",
    experience: "37 years of experience",
    specialties: ["Homeopathy", "General Medicine"],
    description:
      "Dr. Sunil Jagtap is the owner of Shri Krupa Jawanjal Hospital & Diagnostic Centre Pvt Ltd. He practices as a Homeopathy doctor in the Hospital with over three decades of experience in providing comprehensive healthcare.",
    role: "Owner & Senior Consultant",
  },
];

const services = [
  {
    id: 1,
    icon: <FaStethoscope className="w-8 h-8 text-teal-500" />,
    title: "General Medicine",
    description:
      "Comprehensive medical care for adults, treating a wide range of conditions.",
    link: "general-medicine",
  },
  {
    id: 2,
    icon: <FaHeartbeat className="w-8 h-8 text-teal-500" />,
    title: "Cardiology",
    description:
      "Expert care for heart conditions with advanced diagnostic and treatment options.",
    link: "cardiology",
  },
  // ...existing services...
];

const visitingDoctors = [
  {
    id: 1,
    name: "Dr. Vaibhav Lotake",
    image: "/user.png",
    specialty: "General Medicine",
    schedule: "On call (8am-9am)",
    experience: "MD Medicine",
    description: "Specialist in internal medicine and general health care.",
  },
  {
    id: 2,
    name: "Dr. Vrushali Wagh",
    image: "/user.png",
    specialty: "General Medicine",
    schedule: "On call (9pm-8pm)",
    experience: "MD Medicine",
    description: "Expert in comprehensive medical care and patient management.",
  },
  {
    id: 3,
    name: "Dr. Dipti Khadkar",
    image: "/user.png",
    specialty: "Dietetics",
    schedule: "Mon-Sat (12pm-1pm)",
    experience: "B.H.S.C.,PG Diploma in Dietetics",
    description:
      "Certified dietitian specializing in nutritional therapy and diet planning.",
  },
  {
    id: 4,
    name: "Dr. Ashwin Borade",
    image: "/user.png",
    specialty: "Pediatrics",
    schedule: "On call",
    experience: "MBBS DCH DNB",
    description: "Pediatrician specialized in child health and development.",
  },
  {
    id: 5,
    name: "Dr. Mahesh Sinnarkar",
    image: "/user.png",
    specialty: "Laparoscopic Surgery",
    schedule: "On call (6pm-7pm)",
    experience: "MS General Surgeon",
    description:
      "Expert in minimally invasive laparoscopic surgical procedures.",
  },
  {
    id: 6,
    name: "Dr. Rajesh Wagh",
    image: "/user.png",
    specialty: "Cardiology",
    schedule: "On call (7pm-8pm)",
    experience: "D.M Cardiology",
    description:
      "Cardiologist specializing in heart disease diagnosis and treatment.",
  },
  {
    id: 7,
    name: "Dr. Shruti Palasdeokar",
    image: "/user.png",
    specialty: "Gynecology",
    schedule: "On call (11am-12pm)",
    experience: "M.B.B.S.,MS",
    description:
      "Gynecologist expert in women's reproductive health and obstetrics.",
  },
  {
    id: 8,
    name: "Dr. Hemant Welkar",
    image: "/user.png",
    specialty: "Physiotherapy",
    schedule: "Mon-Sat (10am-2pm)",
    experience: "DPT",
    description:
      "Licensed physiotherapist specializing in rehabilitation and physical therapy.",
  },
  {
    id: 9,
    name: "Dr. Ganesh Jagdale",
    image: "/user.png",
    specialty: "Orthopedic Surgery",
    schedule: "On call (6pm-9pm)",
    experience: "D.Ortho",
    description: "Orthopedic surgeon specialized in bone and joint treatments.",
  },
  {
    id: 10,
    name: "Dr. Varsha Nerlekar",
    image: "/user.png",
    specialty: "Ophthalmology",
    schedule: "On call (10am-12pm)",
    experience: "M.B.B.S.,D.O.M.S",
    description:
      "Eye specialist providing comprehensive ophthalmic care and treatments.",
  },
  {
    id: 11,
    name: "Dr. Prakash Patil",
    image: "/user.png",
    specialty: "ENT Surgery",
    schedule: "On call (8am-9:30am)",
    experience: "MS ENT D.L.O",
    description: "ENT surgeon specializing in ear, nose, and throat disorders.",
  },
  {
    id: 12,
    name: "Dr. Sachin Deshpande",
    image: "/user.png",
    specialty: "General Surgery",
    schedule: "On call (10am-2pm)",
    experience: "General Surgeon",
    description:
      "General surgeon with expertise in various surgical procedures.",
  },
  {
    id: 13,
    name: "Dr. Suraj Lunawat",
    image: "/user.png",
    specialty: "Urology",
    schedule: "On call",
    experience: "Urologist",
    description:
      "Urologist specialized in urinary tract and male reproductive system disorders.",
  },
  {
    id: 14,
    name: "Dr. Viraj Shinde",
    image: "/user.png",
    specialty: "Endoscopic & Laparoscopic Surgery",
    schedule: "On call",
    experience: "MBBS,MS(GOLD MEDALIST), FAGE (MAHE)",
    description:
      "Consultant endoscopic & laparoscopic surgeon with gold medal distinction.",
  },
  {
    id: 15,
    name: "Dr. Amol Chavan",
    image: "/user.png",
    specialty: "Ophthalmology",
    schedule: "On call (5pm-7pm)",
    experience: "MS Opthal FPOS",
    description:
      "Ophthalmologist specialized in advanced eye care and surgical procedures.",
  },
  {
    id: 16,
    name: "Dr. Dnyanraj Choudhary",
    image: "/user.png",
    specialty: "Psychiatry",
    schedule: "On call",
    experience: "M.D Psychiatry",
    description:
      "Psychiatrist specializing in mental health and behavioral disorders.",
  },
  {
    id: 17,
    name: "Dr. Prakash Bhambure",
    image: "/user.png",
    specialty: "Psychiatry",
    schedule: "On call",
    experience: "M.B.B.S.,D.P.M",
    description:
      "Psychiatrist with expertise in psychological therapy and mental wellness.",
  },
  {
    id: 18,
    name: "Dr. Prasad Kulkarni",
    image: "/user.png",
    specialty: "Dentistry",
    schedule: "On call (2pm-4pm)",
    experience: "B.D.S",
    description:
      "Dentist providing comprehensive dental care and oral health services.",
  },
  {
    id: 19,
    name: "Dr. Kunal Oswal",
    image: "/user.png",
    specialty: "Laparoscopic Surgery",
    schedule: "On call",
    experience: "MS General surgeon",
    description:
      "General surgeon specialized in advanced laparoscopic techniques.",
  },
  {
    id: 20,
    name: "Dr. Ashish Kale",
    image: "/user.png",
    specialty: "Gynecology",
    schedule: "On call",
    experience: "MD Gynaecology",
    description:
      "Gynecologist and laparoscopic surgeon expert in women's health.",
  },
  {
    id: 21,
    name: "Dr. Shivraj Konde",
    image: "/user.png",
    specialty: "Orthopedic Surgery",
    schedule: "On call",
    experience: "MS Ortho",
    description:
      "Orthopedic surgeon specialized in bone, joint, and musculoskeletal disorders.",
  },
  {
    id: 22,
    name: "Dr. Abhishek Mahajan",
    image: "/user.png",
    specialty: "Orthopedic Surgery",
    schedule: "On call",
    experience: "MS Ortho",
    description:
      "Orthopedic specialist with expertise in surgical and non-surgical treatments.",
  },
  {
    id: 23,
    name: "Dr. Alkesh Oswal",
    image: "/user.png",
    specialty: "ENT Surgery",
    schedule: "On call (12pm-1pm)",
    experience: "MS ENT D.L.O",
    description:
      "ENT surgeon providing comprehensive ear, nose, and throat care.",
  },
  {
    id: 24,
    name: "Dr. Satyen Dobhada",
    image: "/user.png",
    specialty: "Urology",
    schedule: "On call",
    experience: "Urologist",
    description:
      "Urologist specialized in urological disorders and minimally invasive procedures.",
  },
  {
    id: 25,
    name: "Dr. Sachin Ghodaki",
    image: "/user.png",
    specialty: "Anesthesiology",
    schedule: "On call",
    experience: "MBBS,DA",
    description:
      "Anesthetist specialized in perioperative care and pain management.",
  },
  {
    id: 26,
    name: "Dr. Abhay Sancheti",
    image: "/user.png",
    specialty: "Anesthesiology",
    schedule: "On call",
    experience: "M.B.B.S.,MD(ANAES)",
    description: "Anesthetist expert in surgical anesthesia and critical care.",
  },
  {
    id: 27,
    name: "Dr. Abhishchandra Dupargude",
    image: "/user.png",
    specialty: "Anesthesiology",
    schedule: "On call",
    experience: "M.B.B.S.,MD(ANAES),P.D.C.C",
    description:
      "Senior anesthetist with advanced certification in critical care.",
  },
  {
    id: 28,
    name: "Dr. Manoj Gajbhare",
    image: "/user.png",
    specialty: "Anesthesiology",
    schedule: "On call",
    experience: "MD Anaesthesiology",
    description: "Anesthesiologist specialized in complex surgical procedures.",
  },
  {
    id: 29,
    name: "Dr. Mugdha Mahajan",
    image: "/user.png",
    specialty: "Anesthesiology",
    schedule: "On call",
    experience: "MD Anaesthesiology",
    description:
      "Anesthesiologist with expertise in patient safety and pain management.",
  },
  {
    id: 30,
    name: "Dr. Pooja Durve",
    image: "/user.png",
    specialty: "Physiotherapy",
    schedule: "On call",
    experience: "BPT",
    description:
      "Physiotherapist specializing in rehabilitation and physical therapy.",
  },
  {
    id: 31,
    name: "Dr. Satyawan Choure",
    image: "/user.png",
    specialty: "Dermatology",
    schedule: "On call (5pm-6pm)",
    experience: "Diploma in Dermatology",
    description:
      "Dermatologist specialized in skin conditions and cosmetic treatments.",
  },
  {
    id: 32,
    name: "Dr. Vikas Khatpe",
    image: "/user.png",
    specialty: "Homeopathy",
    schedule: "On call (11am-12pm)",
    experience: "BHMS",
    description:
      "Homeopathic consultant providing alternative medicine treatments.",
  },
  {
    id: 33,
    name: "Dr. Rohini Khatpe",
    image: "/user.png",
    specialty: "Anesthesiology",
    schedule: "On call (7pm-8pm)",
    experience: "MD Anaesthesiology",
    description:
      "Anesthesiologist with expertise in surgical and procedural anesthesia.",
  },
  {
    id: 34,
    name: "Dr. Saurabh Chaudhuri",
    image: "/user.png",
    specialty: "Radiology",
    schedule: "On call (11am-1pm)",
    experience: "MD Radiologist",
    description:
      "Radiologist specialized in medical imaging and diagnostic procedures.",
  },
  {
    id: 35,
    name: "Dr. Suhas Kulkarni",
    image: "/user.png",
    specialty: "Chest Medicine",
    schedule: "On call",
    experience: "Chest Physician",
    description:
      "Chest physician specialized in respiratory and pulmonary disorders.",
  },
  {
    id: 36,
    name: "Dr. Abhijeet Pawar",
    image: "/user.png",
    specialty: "Spine Surgery",
    schedule: "On call",
    experience: "Spine Invasive & Scoliosis Surgeon",
    description:
      "Spine specialist expert in invasive spine procedures and scoliosis treatment.",
  },
  {
    id: 37,
    name: "Dr. Sanjay Patil",
    image: "/user.png",
    specialty: "Spine Surgery",
    schedule: "On call",
    experience: "MS Ortho",
    description:
      "Spine specialist with expertise in orthopedic spine procedures.",
  },
  {
    id: 38,
    name: "Dr. Sanjay Pawar",
    image: "/user.png",
    specialty: "Neurosurgery",
    schedule: "On call",
    experience: "MS Nuero Surgery",
    description:
      "Neurosurgeon specialized in brain and nervous system surgeries.",
  },
  {
    id: 39,
    name: "Dr. Vishal Rokade",
    image: "/user.png",
    specialty: "Neurosurgery",
    schedule: "On call",
    experience: "MS Nuero Surgery",
    description: "Neurosurgeon expert in complex neurological procedures.",
  },
  {
    id: 40,
    name: "Dr. Nilesh Palasdeokar",
    image: "/user.png",
    specialty: "Neurology",
    schedule: "On call",
    experience: "MD Neuro",
    description:
      "Neurophysician specialized in neurological disorders and brain health.",
  },
  {
    id: 41,
    name: "Dr. Suyog Doshi",
    image: "/user.png",
    specialty: "Neurology",
    schedule: "On call",
    experience: "MD Neuro",
    description:
      "Neurologist with expertise in diagnosis and treatment of nervous system disorders.",
  },
  {
    id: 42,
    name: "Dr. Shardul Date",
    image: "/user.png",
    specialty: "Vascular Surgery",
    schedule: "On call",
    experience:
      "M.B.B.S.,F.C.P.S.,D.N.B(Peripheral Vascular Surgery) FEVS(Austria)",
    description:
      "Vascular surgeon with international certification in peripheral vascular procedures.",
  },
  {
    id: 43,
    name: "Dr. Janardan Garade",
    image: "/user.png",
    specialty: "Faciomaxillary Surgery",
    schedule: "On call",
    experience: "MDS",
    description:
      "Faciomaxillary surgeon specialized in facial and jaw reconstructive procedures.",
  },
  {
    id: 44,
    name: "Dr. Vikramsingh Deshmukh",
    image: "/user.png",
    specialty: "Faciomaxillary Surgery",
    schedule: "On call",
    experience: "MDS",
    description:
      "Oral and maxillofacial surgeon expert in facial trauma and reconstructive surgery.",
  },
  {
    id: 45,
    name: "Dr. Pankaj Jindal",
    image: "/user.png",
    specialty: "Hand Surgery",
    schedule: "On call",
    experience: "MS DNB",
    description:
      "Hand surgeon specialized in microsurgical procedures and hand reconstruction.",
  },
  {
    id: 46,
    name: "Dr. Pushkar Deshpande",
    image: "/user.png",
    specialty: "Plastic Surgery",
    schedule: "On call",
    experience: "M.ch.(Plastic Surg.)",
    description:
      "Plastic surgeon expert in reconstructive and cosmetic surgical procedures.",
  },
  {
    id: 47,
    name: "Dr. Hasmukh Gujar",
    image: "/user.png",
    specialty: "Cardiology",
    schedule: "On call",
    experience: "MD Cardio",
    description:
      "Cardiologist specialized in heart disease management and cardiac procedures.",
  },
  {
    id: 48,
    name: "Dr. Nilesh Patil",
    image: "/user.png",
    specialty: "Rheumatology",
    schedule: "On call",
    experience: "Rheumatologist",
    description:
      "Rheumatologist specialized in autoimmune and inflammatory joint diseases.",
  },
  {
    id: 49,
    name: "Dr. Nilesh Patil",
    image: "/user.png",
    specialty: "Rheumatology",
    schedule: "On call",
    experience: "Rheumatologist",
    description:
      "Rheumatologist expert in arthritis and musculoskeletal disorders.",
  },
  {
    id: 50,
    name: "Dr. Sudhanshu Takawale",
    image: "/user.png",
    specialty: "Sports Medicine",
    schedule: "On call",
    experience: "Sport Medicine",
    description:
      "Sports medicine specialist focused on athletic injuries and performance optimization.",
  },
  {
    id: 51,
    name: "Dr. Chetan Deshmukh",
    image: "/user.png",
    specialty: "Chemotherapy",
    schedule: "On call",
    experience: "Chemotherapist",
    description:
      "Chemotherapist specialized in cancer treatment and oncological care.",
  },
];

const DoctorsPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPermanentSlide, setCurrentPermanentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [visibleDoctorsCount, setVisibleDoctorsCount] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const autoSlideRef = useRef(null);
  const permanentAutoSlideRef = useRef(null);

  // Toggle description expansion for a specific doctor
  const toggleDescription = (doctorId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [doctorId]: !prev[doctorId],
    }));
  };

  const specialties = [
    "all",
    ...new Set(doctors.flatMap((doctor) => doctor.specialties)),
  ];

  const filterDoctors = (doctor) => {
    if (selectedSpecialty === "all") return true;
    return doctor.specialties.includes(selectedSpecialty);
  };

  const filteredDoctors = doctors.filter(filterDoctors);

  // Filter visiting doctors based on search query
  const filteredVisitingDoctors = visitingDoctors.filter((doctor) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(searchLower) ||
      doctor.specialty.toLowerCase().includes(searchLower)
    );
  });

  // Handle showing more doctors
  const handleShowMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleDoctorsCount((prev) =>
        Math.min(prev + 4, filteredVisitingDoctors.length)
      );
      setIsLoadingMore(false);
    }, 500);
  };

  // Handle mobile detection and auto-sliding
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide for visiting doctors
  useEffect(() => {
    if (isMobile) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % visitingDoctors.length);
      }, 3000);

      return () => clearInterval(autoSlideRef.current);
    }
  }, [isMobile]);

  // Auto-slide for permanent doctors
  useEffect(() => {
    if (isMobile && filteredDoctors.length > 0) {
      permanentAutoSlideRef.current = setInterval(() => {
        setCurrentPermanentSlide((prev) => (prev + 1) % filteredDoctors.length);
      }, 3000);

      return () => clearInterval(permanentAutoSlideRef.current);
    }
  }, [isMobile, filteredDoctors.length]);

  // Reset permanent slide when filter changes
  useEffect(() => {
    setCurrentPermanentSlide(0);
  }, [selectedSpecialty]);

  const nextSlide = () => {
    clearInterval(autoSlideRef.current);
    setCurrentSlide((prev) => (prev + 1) % visitingDoctors.length);
  };

  const prevSlide = () => {
    clearInterval(autoSlideRef.current);
    setCurrentSlide(
      (prev) => (prev - 1 + visitingDoctors.length) % visitingDoctors.length
    );
  };

  const nextPermanentSlide = () => {
    clearInterval(permanentAutoSlideRef.current);
    setCurrentPermanentSlide((prev) => (prev + 1) % filteredDoctors.length);
  };

  const prevPermanentSlide = () => {
    clearInterval(permanentAutoSlideRef.current);
    setCurrentPermanentSlide(
      (prev) => (prev - 1 + filteredDoctors.length) % filteredDoctors.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Doctors</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our team of experienced and dedicated medical professionals
            committed to providing the highest quality healthcare.
          </p>
        </div>

        {/* Permanent Doctors Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            {" "}
            <span className="text-teal-500 text-sm font-medium tracking-wide uppercase">
              Our Permanent Doctors
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
              Expert Care, Always Available
            </h2>
          </motion.div>

          {/* Specialty Filter */}
          <div className="mb-8 -mx-4 px-4 overflow-x-auto">
            <div className="flex space-x-3 min-w-max">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedSpecialty === specialty
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {specialty === "all" ? "All Specialties" : specialty}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            {filteredDoctors.length > 0 && (
              <div className="overflow-hidden">
                <div className="bg-white rounded-xl shadow-lg">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={filteredDoctors[currentPermanentSlide].image}
                      alt={filteredDoctors[currentPermanentSlide].name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {filteredDoctors[currentPermanentSlide].name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {filteredDoctors[currentPermanentSlide].specialties.map(
                        (specialty) => (
                          <span
                            key={specialty}
                            className="px-3 py-1 text-xs bg-teal-500/10 text-teal-500 rounded-full"
                          >
                            {specialty}
                          </span>
                        )
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mb-3">
                      {filteredDoctors[currentPermanentSlide].experience}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {expandedDescriptions[
                        filteredDoctors[currentPermanentSlide].name
                      ]
                        ? filteredDoctors[currentPermanentSlide].description
                        : `${filteredDoctors[
                            currentPermanentSlide
                          ].description.slice(0, 150)}...`}
                    </p>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() =>
                          toggleDescription(
                            filteredDoctors[currentPermanentSlide].name
                          )
                        }
                        className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FaEye className="w-4 h-4" />
                        {expandedDescriptions[
                          filteredDoctors[currentPermanentSlide].name
                        ]
                          ? "Show Less"
                          : "Read More"}
                      </button>
                      <Link to="/book-appointment" className="w-full">
                        <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2.5 rounded-lg text-sm font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-300">
                          Book Appointment
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center mt-4 space-x-2">
                  {filteredDoctors.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPermanentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentPermanentSlide === index
                          ? "bg-teal-500 w-4"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group h-full flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 flex gap-3">
                      <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                        <FaLinkedin className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                        <FaEnvelope className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {doctor.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {doctor.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 text-sm bg-teal-500/10 text-teal-500 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm mb-3">
                    {doctor.experience}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {expandedDescriptions[doctor.name]
                      ? doctor.description
                      : `${doctor.description.slice(0, 150)}...`}
                  </p>
                  <div className="flex flex-col gap-3 mt-auto">
                    <button
                      onClick={() => toggleDescription(doctor.name)}
                      className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaEye className="w-4 h-4" />
                      {expandedDescriptions[doctor.name]
                        ? "Show Less"
                        : "Read More"}
                    </button>
                    <Link to="/book-appointment" className="w-full">
                      <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2.5 rounded-lg text-sm font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-300">
                        Book Appointment
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Visiting Specialists Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visiting Specialists
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert consultants who regularly visit our hospital to provide
              specialized care
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Visiting Doctors Grid - Responsive Layout */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {filteredVisitingDoctors
              .slice(0, visibleDoctorsCount)
              .map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="p-4">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                      <div className="absolute inset-0 rounded-full border-2 border-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">
                      {doctor.name}
                    </h3>
                    <p className="text-teal-500 text-sm font-medium mb-2 text-center">
                      {doctor.specialty}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-3">
                      <FaCalendar className="text-teal-500 w-4 h-4" />
                      <span>{doctor.schedule}</span>
                    </div>
                    <Link to="/book-appointment" className="block">
                      <button className="w-full bg-gray-100 hover:bg-teal-500 hover:text-white text-gray-700 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                        Schedule Consultation
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Show More Button */}
          {filteredVisitingDoctors.length > visibleDoctorsCount && (
            <div className="text-center mt-8">
              <button
                onClick={handleShowMore}
                disabled={isLoadingMore}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-500 border-2 border-teal-500 rounded-xl hover:bg-teal-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    Show More
                    <FaArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DoctorsPage;
