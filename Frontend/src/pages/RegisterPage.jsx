import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import oria from "../assets/oria.png";

function RegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use state variables directly, no need for this.state
    const signupData = {
      companyName,
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData), // Remove the wrapping object here
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful", data);
      } else {
        const errorData = await response.json();
        console.error("Registration failed", errorData.error);
        setRegistrationError(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-blue-200">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-center items-center">
            <div className="text-center">
              <img src={oria} alt="Logo" className="mb-4" />
            </div>
          </div>
          <h2 className="text-2xl text-center font-semibold text-gray-700 mb-6">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company Name
              </label>
              <input
                type="text"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Enter your company name"
                value={companyName}
                onChange={handleCompanyNameChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Enter your first name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Enter your last name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className="px-3 py-2 border rounded-lg w-full"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Register
              </button>
            </div>
            {registrationError && (
              <p className="text-red-600 text-sm mt-2">{registrationError}</p>
            )}
          </form>
          <p className="text-gray-600 text-center mt-4">
            Already registered?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;
