"use client"
import { useState } from "react";
import { BiSolidKeyboard } from "react-icons/bi";
import Header from "../components/header";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";

export default function Login() {

  const [isRegisterPageVisible, setIsRegisterPageVisible] = useState(true);

  return (
    <div className="flex gap-10 items-center justify-center  min-h-screen" >
      {/* <Header fontFamily={"sans-sarif"} /> */}
      {/* <div className="text-white flex flex-row  gap-20 items-center justify-center py-20">
        <RegisterForm />
        <LoginForm />
      </div> */}
      <div className="flex  items-center mt-8">
        <div
          className={`sans-sarif  text-white text-6xl tracking-wider mr-2`}
        >
          TypeBlitz
        </div>
        <div>
          {" "}
          <BiSolidKeyboard className="text-blue-500 text-6xl" />{" "}
        </div>
      </div>

      <div>
        {
          (isRegisterPageVisible)
          ?
          <RegisterForm setIsRegisterPageVisible={setIsRegisterPageVisible} />
          :
          <LoginForm setIsRegisterPageVisible={setIsRegisterPageVisible}/>
        }
     
      </div>

    </div>
  );
}
