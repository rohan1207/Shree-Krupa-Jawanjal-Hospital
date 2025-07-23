import React from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../data/doctors";

const DoctorDetail = () => {
  const { id } = useParams();
  const doctor = doctors.find((doc) => doc.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Doctor not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
          {doctor.name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {doctor.role}
            </h2>
            <p className="text-lg text-gray-600 mb-4">{doctor.experience}</p>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Specialties
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                About
              </h3>
              <p className="text-gray-600 whitespace-pre-line">{doctor.info}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
