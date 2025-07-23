import React, { useState } from "react";
import { Upload, FileText, X, Eye } from "lucide-react";

const MedicalDocuments = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Blood Test Report - June 2025",
      type: "PDF",
      date: "2025-06-10",
      category: "Blood Test",
      url: "/medical_report1.jpg",
    },
    {
      id: 2,
      name: "X-Ray Report - Chest",
      type: "Image",
      date: "2025-06-08",
      category: "X-Ray",
      url: "/medical_report2.webp",
    },
    {
      id: 3,
      name: "ECG Report",
      type: "PDF",
      date: "2025-06-05",
      category: "ECG",
      url: "/medical_report3.jpg",
    },
  ]);

  const [showUpload, setShowUpload] = useState(false);
  const [viewingDoc, setViewingDoc] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        id: documents.length + 1,
        name: file.name,
        type: file.type.split("/")[1].toUpperCase(),
        date: new Date().toISOString().split("T")[0],
        category: "Other",
        url: URL.createObjectURL(file),
      };
      setDocuments([...documents, newDoc]);
    }
    setShowUpload(false);
  };

  const handleViewDocument = (doc) => {
    setViewingDoc(doc);
  };

  const handleRemoveDocument = (docId) => {
    setDocuments(documents.filter((doc) => doc.id !== docId));
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Blood Test": "bg-red-100 text-red-600",
      "X-Ray": "bg-blue-100 text-blue-600",
      ECG: "bg-green-100 text-green-600",
      Other: "bg-gray-100 text-gray-600",
    };
    return colors[category] || colors["Other"];
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Your Medical Documents
        </h3>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Upload className="mr-2 w-4 h-4" />
          Upload New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-start p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
          >
            <div className="p-3 bg-blue-100 rounded-lg mr-4 flex-shrink-0">
              <FileText className="text-blue-500 w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 mb-2 truncate">
                {doc.name}
              </h4>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                    doc.category
                  )}`}
                >
                  {doc.category}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(doc.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleViewDocument(doc)}
                  className="flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors duration-200"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemoveDocument(doc.id)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {documents.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg mb-2">No documents uploaded yet</p>
          <p className="text-sm">
            Upload your first medical document to get started
          </p>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Upload Medical Document</h4>
              <button
                onClick={() => setShowUpload(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 transition-colors duration-200">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-gray-600 hover:text-orange-500 transition-colors duration-200"
              >
                <Upload className="mx-auto w-12 h-12 mb-4 text-gray-400" />
                <p className="text-lg mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">
                  PDF, JPG, PNG or WEBP (max. 10MB)
                </p>
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowUpload(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {viewingDoc.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {viewingDoc.category} •{" "}
                  {new Date(viewingDoc.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 overflow-auto max-h-[calc(90vh-100px)]">
              <div className="flex justify-center">
                <img
                  src={viewingDoc.url}
                  alt={viewingDoc.name}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  style={{ maxHeight: "calc(90vh - 200px)" }}
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setViewingDoc(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
              <a
                href={viewingDoc.url}
                download={viewingDoc.name}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalDocuments;
