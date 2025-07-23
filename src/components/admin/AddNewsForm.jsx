import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";

const AddNewsForm = ({ onSuccess, onFormClose, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "",
    excerpt: "",
  });
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!initialData;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: initialData.title || "",
        date: initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : "",
        category: initialData.category || "",
        excerpt: initialData.excerpt || "",
      });
      setContent(initialData.content || "");
      if (initialData.image) {
        setImagePreview(`${API_BASE_URL}${initialData.image}`);
      }
    } else {
      // Reset form for new entry
      setFormData({ title: "", date: "", category: "", excerpt: "" });
      setContent("");
      setImagePreview("");
      setImage(null);
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      toast.error("Content is required.");
      return;
    }
    setIsLoading(true);

    const submissionData = new FormData();
    Object.keys(formData).forEach((key) =>
      submissionData.append(key, formData[key])
    );
    submissionData.append("content", content);
    if (image) {
      submissionData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (isEditing) {
        response = await axios.put(
          `${API_BASE_URL}/api/news/${initialData._id}`,
          submissionData,
          config
        );
      } else {
        response = await axios.post(
          `${API_BASE_URL}/api/news`,
          submissionData,
          config
        );
      }

      if (response.data.success) {
        toast.success(
          `News article ${isEditing ? "updated" : "added"} successfully!`
        );
        onSuccess(response.data.data);
        onFormClose();
      }
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "adding"} news:`, error);
      toast.error(
        error.response?.data?.message ||
          `Failed to ${isEditing ? "update" : "add"} article.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <input
          type="text"
          name="category"
          id="category"
          required
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="e.g., Health, Event, Announcement"
        />
      </div>
      <div>
        <label
          htmlFor="excerpt"
          className="block text-sm font-medium text-gray-700"
        >
          Excerpt
        </label>
        <textarea
          name="excerpt"
          id="excerpt"
          rows="2"
          required
          value={formData.excerpt}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="A short summary of the article..."
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <Editor
          apiKey="zn1sh36buxp3bk7vnrurs6mt9l093amh4agd8bn87xzqndr3" // Replace with your TinyMCE API key
          value={content}
          onEditorChange={handleEditorChange}
          init={{
            height: 300,
            menubar: false,
            plugins:
              "advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount",
            toolbar:
              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/avif,image/webp,image/png,image/jpeg,image/jpg,image/gif"
          onChange={handleImageChange}
          required={!isEditing}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-4 h-32 w-auto rounded-lg"
          />
        )}
      </div>
      <div className="flex justify-end pt-4 space-x-3">
        <button
          type="button"
          onClick={onFormClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
        >
          {isLoading
            ? isEditing
              ? "Updating..."
              : "Adding..."
            : isEditing
            ? "Update News"
            : "Add News"}
        </button>
      </div>
    </form>
  );
};

export default AddNewsForm;
