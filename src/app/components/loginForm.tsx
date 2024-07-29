"use client";

import { useState } from "react";
import { loginApi } from "../service/api";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function LoginForm({ setIsRegisterPageVisible }: any) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

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

    const resp = await loginApi(userData);
    console.log("resp", resp);
    const token = resp.token;

    localStorage.setItem("token", token);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <p className="text-white text-center">LOG IN</p>
      <div>
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="px-6 py-2 w-[250px]  rounded-sm text-black"
          placeholder="Username"
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
      <button className="px-6 py-2 rounded-sm bg-blue-500 text-white" type="submit">SUBMIT</button>
      <p className="text-white text-sm text-center">Don't have an account?  <span className="cursor-pointer text-blue-600" onClick={() => setIsRegisterPageVisible(true)}>Sign In</span></p>
    </form>
  );
}
