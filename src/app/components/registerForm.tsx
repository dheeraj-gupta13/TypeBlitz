"use client";

import { useState } from "react";
import { registerUserApi } from "../service/api";

export default function RegisterForm({ setIsRegisterPageVisible }: any) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();


    const userData = {
      username: formData.username,
      password: formData.password,
    };

    const resp = await registerUserApi(userData);
    console.log("resp", resp);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="text-white text-center">REGISTER</p>
      <div>
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="px-6 py-2 w-[250px] rounded-sm text-black"
          placeholder="Username"
        />
      </div>
      <div>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="px-6 py-2 w-[250px] rounded-sm text-black"
          placeholder="Email"
        />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="px-6 py-2 w-[250px]  rounded-sm text-black"
          placeholder="Password"
        />
      </div>
      <button className="px-6 py-2 rounded-sm bg-blue-500 text-white" type="submit">CREATE</button>
      <p className="text-white text-sm text-center">Already have an account?  <span className="cursor-pointer text-blue-600" onClick={() => setIsRegisterPageVisible(false)}>Log In</span></p>
    </form>
  );
}
