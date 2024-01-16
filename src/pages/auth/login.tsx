import { MainLayout } from "@/layout/mainLayout";
import pb from "@/lib/pocketbase";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
const Login = () => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Burada formu sunucuya gönderme veya giriş doğrulama işlemlerini gerçekleştirebilirsiniz.
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      console.log(data);
      //login
      const authData = await pb
        .collection("users")
        .authWithPassword(data.email, data.password)
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login Success",
        }).then(() => {
          window.location.href = "/";
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Login Failed, Plase try again",
      });
    }
  };

  return (
    <MainLayout>
      <div
        className="relative min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1525302220185-c387a117886e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome TicketApp!
            </h2>
          </div>

          <form className="mt-8 space-y-6 text-black" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="relative">
              <label
                className="text-sm font-bold text-gray-700 tracking-wide"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-8 relative">
              <label
                className="text-sm font-bold text-gray-700 tracking-wide"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Sign in
              </button>
            </div>
            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              <span>Don't have an account?</span>
              <Link
                href="/auth/register"
                className="text-indigo-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
