import { getCurrentUserToken } from "./util";

const baseUrl = "https://type-blitz-backend.vercel.app/";
const token = getCurrentUserToken();

export const registerUserApi = async (userData) => {
  const res = await fetch(baseUrl + "register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Failed to register user");
  }

  const response = await res.json();
  return response;
};

export const loginApi = async (userData) => {
  const res = await fetch(baseUrl + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Failed to register user");
  }

  const response = await res.json();
  return response;
};

export const postTypingData = async (userData) => {
  const res = await fetch(baseUrl + "postTypingData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Failed to register user");
  }

  const response = await res.json();
  return response;
};

export const getMaxSpeed = async (userData) => {
  const res = await fetch(baseUrl + "getMaxSpeed", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Failed to register user");
  }

  const response = await res.json();
  return response;
};
