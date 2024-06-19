"use client";

import { BiSolidKeyboard } from "react-icons/bi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { validateToken } from "../service/util";

export default function Header({ fontFamily }: any) {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const res = validateToken();
    if (res) {
      setShowLogin(false);
    }
  });

  const handleLogOut = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center mt-8">
        <div
          className={`${fontFamily}  text-white text-5xl tracking-wider mr-2`}
        >
          TypeBlitz
        </div>
        <div>
          {" "}
          <BiSolidKeyboard className="text-blue-500 text-5xl" />{" "}
        </div>
      </div>

      <div className="text-white absolute top-3 right-20 cursor-pointer">
        {showLogin ? (
          <Link href="/login">Login</Link>
        ) : (
          <div onClick={handleLogOut}>Logout</div>
        )}
      </div>
    </div>
  );
}
