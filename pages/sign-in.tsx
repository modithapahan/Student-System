import Header from "@/components/Header";
import OAuth from "@/components/OAuth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./../firebase";
import { toast } from "react-toastify";

const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        router.push("/");
        toast.success("Sign in successfully!");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      <Header />

      <section>
        <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>

        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
          <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
            <img
              src="https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="sign_in"
              className="w-full rounded-2xl"
            />
          </div>

          <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
            <form onSubmit={handleSignIn}>
              <div>
                <input
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                  />
                  {showPassword ? (
                    <AiFillEyeInvisible
                      onClick={() => setShowPassword((prevState) => !prevState)}
                      className={
                        "absolute right-3 top-3 text-xl cursor-pointer"
                      }
                    />
                  ) : (
                    <AiFillEye
                      onClick={() => setShowPassword((prevState) => !prevState)}
                      className={
                        "absolute right-3 top-3 text-xl cursor-pointer"
                      }
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mt-4">
                <p className="mb-6">
                  Don't have an account?
                  <Link
                    href="/sign-up"
                    className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                  >
                    Register
                  </Link>
                </p>
                <p>
                  <Link
                    href="/forgot-password"
                    className="text-blue-600 hover:text-blue-600 transition duration-200 ease-in-out"
                  >
                    Forgot Password?
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              >
                Sign in
              </button>
              <div className="my-4 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                <p className="text-center font-semibold mx-4">OR</p>
              </div>
              <OAuth />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
