"use client";

import React, { useState } from "react";
import * as CSS from "csstype";

interface LoginFromProps {
  title: string;
}

const LoginForm: React.FC<LoginFromProps> = ({ title }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showEmailValidation, setShowEmailValidation] = useState(false);

  const formatPhoneNumber = (input: any) => {
    const cleaned = input.replace(/\D/g, "");
    let formatted = "";
    if (cleaned.length > 0) {
      formatted = "(" + cleaned.substring(0, 4);
      if (cleaned.length > 4) {
        formatted += ") " + cleaned.substring(4, 7);
        if (cleaned.length > 7) {
          formatted += "-" + cleaned.substring(7, 11);
        }
      }
    }
    return formatted;
  };

  const bounced: CSS.Properties = {
    animationName: "bounce",
    animationDuration: "0.2s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: 1.5,
    color: "#b00020",
  };

  const handleEmailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setEmailAddress(input);
    checkFormEmptiness(input, phoneNumber);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(input);
    setIsValidEmail(input.trim() === "" || isValidEmail);
    setShowEmailValidation(!isEmailFocused && !isValidEmail);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(input);
    setPhoneNumber(formattedPhoneNumber);
    checkFormEmptiness(emailAddress, formattedPhoneNumber);
  };

  const checkFormEmptiness = (email: string, phone: string) => {
    setIsFormEmpty(email.trim() === "" && phone.trim() === "");
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
    setShowEmailValidation(!isValidEmail);
  };

  return (
    <div className="bg-white w-[700px] h-[490px] flex items-center justify-center rounded-md shadow-md text-[16px]">
      <form className="flex flex-col items-start justify-start p-10 gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="capitalize text-[26.4px] font-bold ">{title}</h1>
          <h2 className="text-green-500 capitalize text-[20.4px] font-bold">
            email verification
          </h2>
          <p>
            A validation key will be sent to your email or mobile phone. Please
            make sure your email is valid and you have access to it.
          </p>
        </div>
        <div className="relative flex flex-col w-full gap-6">
          <label htmlFor="email" className="relative">
            <p
              className={`capitalize absolute transition-all duration-200 
               ${isEmailFocused ? "text-[#6200EE]" : "text-gray-400"} ${
                isEmailFocused || emailAddress
                  ? "text-xs -top-4 font-medium"
                  : "top-2 -translate-y-2 text-gray-400"
              }`}
              style={showEmailValidation ? bounced : {}}
            >
              Email Address
            </p>
            <input
              id="email"
              type="email"
              className={`w-full border-b border-gray-400 ${
                isEmailFocused ? "focus:border-b-[#6200EE]" : ""
              } ${
                showEmailValidation ? "focus:border-b-[#b00020] " : ""
              } focus:outline-none py-[3px] hover:border-b-black`}
              placeholder=""
              value={emailAddress}
              onChange={handleEmailAddressChange}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              required
            />
          </label>
          {showEmailValidation && (
            <span className="text-red-500 absolute top-8 text-sm">
              Invalid email address
            </span>
          )}
          <label htmlFor="">
            <p className="capitalize font-medium text-gray-500">mobile no.</p>
            <input
              type="text"
              className="w-full border-b  border-gray-400 focus:border-b-blue-500 focus:outline-none py-[3px] hover:border-b-black"
              placeholder="(0000) 000-0000"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
          </label>
        </div>
        <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
        <div className="flex items-center justify-between px-5 w-full ">
          <button className="font-bold text-[#6200EE] rounded p-2 px-5 hover:bg-[#b898e626] uppercase">
            Back
          </button>
          <button
            className={`font-semibold rounded p-2 px-5 uppercase ${
              isFormEmpty
                ? "bg-gray-200 text-gray-500"
                : "bg-[#6200EE] hover:bg-[#7319f0] text-white hover:shadow-[0_3px_6px_0_rgba(0,0,0,0.3)] duration-200"
            }`}
            disabled={isFormEmpty || !isValidEmail}
          >
            Next
          </button>
        </div>
      </form>
      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateX(-2px);
          }
          50% {
            transform: translateX(2px);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
