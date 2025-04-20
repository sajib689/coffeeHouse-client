"use client";
import toast,{ Toaster } from "react-hot-toast";

import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthProvider";
import { useCreateUserMutation } from "@/features/users/usersApi";
import {  updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

const apiKey = "f5330ca78c6f9960d5308d89956366a7";
const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const RegisterPage = () => {
  const { createUserWithForm, loading } = useContext(AuthContext);
  const [createUser] = useCreateUserMutation();
  const [formError, setFormError] = useState("");
  const navigate = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const form = e.currentTarget;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const imageFile = form.image.files[0];

    if (!name || !email || !password || !imageFile) {
      setFormError("All fields are required.");
      return;
    }

    try {
      // Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = uploadRes?.data?.data?.display_url;
      if (!imageUrl) {
        setFormError("Image upload failed.");
        return;
      }

      // Firebase create user
      const res = await createUserWithForm(email, password);
      if (res?.user) {
        await updateProfile(res.user, {
          displayName: name,
          photoURL: imageUrl,
        });
      
        await createUser({
          name,
          email,
          password,
          image: imageUrl,
          role: "user",
        });

        form.reset();  
        toast.success("Registration successful! 🎉");
        navigate.push('/')

      }
    } catch (err) {
      console.error(err);
      setFormError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                Profile Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {formError && (
            <div className="text-red-500 text-sm mt-2">{formError}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6F4F37] text-white p-3 rounded-lg mt-4 hover:bg-[#8F5F3C] transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-[#6F4F37] hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
