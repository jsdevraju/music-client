import axios from "axios";
import { Form, Formik } from "formik";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import cookie from "js-cookie";
import { FcGoogle } from "react-icons/fc";
import { googleApi } from "react-firebase-lib";
import Label from "../app/Components/Label/Label";
import Input from "../app/Components/FormikInput/FormikInput";
import Button from "../app/Components/Button/Button";
import { useRouter } from "next/router";
import { loginValidate } from "../app/validation/validate";
import { apiEndPoint } from "../app/utils";
import { useDispatch } from "react-redux";
import { setAuth } from "../app/slices/authSlice";
import { auth, providerGoogle } from "../firebase";
import Loader from "../app/Components/Loader/Loader";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${apiEndPoint}/auth/login`, {
        email,
        password,
      });
      setLoading(false);
      dispatch(setAuth(data));
      localStorage.setItem("user", JSON.stringify(data));
      toast.success(data?.message);
      cookie.set("token", data?.token);
      router.push("/");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleGoogle = async (e: FormEvent) =>{
    e.preventDefault();
    setLoading(true)
    try {
        const res = await googleApi(auth, providerGoogle);
        const { data } = await axios.post(`${apiEndPoint}/auth/google`, {
          name:res?.displayName,
          email:res?.email,
          avatar:res?.photoURL
        })
        setLoading(false)
        dispatch(setAuth(data))
        localStorage.setItem("user", JSON.stringify(data))
        toast.success(data?.message)
        cookie.set("token", data?.token)
        router.push("/")
    } catch (error: any) {
      setLoading(false)
      console.log(error.message)
    }
  }

  return (
    <>
      {loading ? <Loader /> : (
        <section className="flex items-center justify-center min-h-screen">
        <div className="w-[550px] shadow-lg p-8 rounded-lg">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginValidate}
            onSubmit={({ email, password }: any) => {
              handleLogin(email, password);
            }}
          >
            {(formik) => (
              <>
                <h1 className="text text-center">Welcome to login page</h1>
                <Form>
                  <Label className="label" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    type="text"
                    name="email"
                    placeholder="Example:test@example.com"
                    className="input_auth"
                    id="name"
                  />
                  <Label className="label" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="input_auth"
                    id="password"
                  />
                  <Button
                    type="submit"
                    className="btn-primary mt-4 w-full mb-4"
                  >
                    Login
                  </Button>
                  <Button
                    type="submit"
                    className="btn-primary bg-blue-500 mb-4 flex items-center justify-center gap-6 w-full"
                    onClick={handleGoogle}
                  >
                    <FcGoogle size={30} /> Sign With Google
                  </Button>
                </Form>
              </>
            )}
          </Formik>
          {/* Footer */}
          <div className="">
            <p className="text">
              if you don't have an account please
              <Link href="/register">
                <a className="text-blue-600 m-1">Register</a>
              </Link>
            </p>
          </div>
        </div>
      </section>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.cookies?.token) {
    return {
      redirect: {
        destination: "/",
      },
      props: { isLogin: true },
    };
  }
  return {
    props: { isLogin: false },
  };
};

export default Login;
