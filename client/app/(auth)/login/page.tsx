"use client";

import React, { use, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useAuth } from "@/stores/userStore";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { login, error: authError, isLoading } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await login(data);
      router.push("/")
    } catch (error) {
      setError(authError?.message || "Error occured during login");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center ">
      <div className="border dark:border-gray-700 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold">Welcome back!</h2>
        <div className="flex gap-4 items-center">
          <button className="flex gap-3 text-sm items-center justify-center border border-gray-300   py-2 px-4 w-full rounded-md">
            <FcGoogle size={24} /> Log in with Google
          </button>
          <button className="flex gap-3 text-sm items-center justify-center border border-gray-300   py-2 px-4 w-full rounded-md">
            <FaApple size={24} /> Log in with Apple
          </button>
        </div>
        <div className="flex items-center justify-center">
          <span className="border-b border-gray-600 flex-grow"></span>
          <span className="px-2 text-gray-400">or</span>
          <span className="border-b border-gray-600 flex-grow"></span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full px-3 py-2 rounded-md ${
                errors.email ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:border-blue-500 bg-gray-700 text-white`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`w-full px-3 py-2 rounded-md ${
                errors.password ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:border-blue-500 bg-gray-700 text-white`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-gray-400">
              <input
                type="checkbox"
                className="form-checkbox bg-gray-700 text-blue-500 border-gray-600"
              />
              <span className="text-sm ml-2">Remember me</span>
            </label>
            <Link
              href="/reset-password"
              className="text-blue-500 text-sm font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md  font-semibold"
          >
            Sign in
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4">
          Don't have an account yet?
          <Link href="/register" className="text-blue-500 ml-1 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
