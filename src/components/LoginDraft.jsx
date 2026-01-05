import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OAuthButtons from "./OAuthButtons";
import "../styles/logindraft.css";

export default function LoginDraft() {
  return (
    <div className="frame-1-5-0">
      <div className="frame-3-2-9">
        <div className="frame-1-0-0-0-0-0-9-2-9-1">
          <p className="text-1">Hello Again!</p>
          <p className="text-2">Welcome Back You’ve Been Missed!</p>
        </div>
        <div className="signinwithgoogle">
          <div className="input">
            <p className="text-3">Email Address</p>
            <button className="google-/-button">
              <div className="frame-3-2-5">
                <p className="text-4">zahi.hamdard@gmail.com</p>
              </div>
            </button>
          </div>
          <div className="input">
            <p className="text-5">Password</p>
            <button className="google-/-button">
              <div className="frame-1-0-0-0-0-0-9-2-9-2">
                <p className="text-6">**********</p>
              </div>
              <img src="" />
            </button>
          </div>
          <p className="text-8">Recovery Password</p>
          <img src="" />
        </div>
        <p className="text-1-0">( Or Continue With )</p>
        <div className="frame-3-2-6">
          <div className="login-options">
            <div className="option-0-9-0-4">
              <div className="frame-3-2-5">
                <img src="" />
              </div>
            </div>
            <div className="option-1-0-0-3">
              <div className="frame-3-2-5">
                <div className="frame-3">
                  <img src="" />
                </div>
              </div>
            </div>
          </div>
          <p className="text-1-2">Don’t have an Account? SIGN UP</p>
        </div>
      </div>
    </div>
  );
}
