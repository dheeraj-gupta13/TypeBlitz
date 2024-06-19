"use client";

import { useState } from "react";
import { registerUserApi } from "../service/api";

export default function RegisterForm({ fontFamily }: any) {
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
    // console.log("Form submitted:", formData);

    const userData = {
      username: formData.username,
      password: formData.password,
    };

    const resp = await registerUserApi(userData);
    console.log("resp", resp);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>Register</div>
      <div>
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="px-6 py-1 rounded-md text-black"
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
          className="px-6 py-1 rounded-md text-black"
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
          className="px-6 py-1 rounded-md text-black"
          placeholder="Password"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
