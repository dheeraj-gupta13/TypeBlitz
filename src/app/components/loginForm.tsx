"use client";

import { useState } from "react";
import { loginApi } from "../service/api";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function LoginForm({ fontFamily }: any) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
    // console.log("Form submitted:", formData);

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
      <div>Log in</div>
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
