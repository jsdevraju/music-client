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

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (name: string, password: string) => {};

  return (
    <>
      <section className="flex items-center justify-center min-h-screen">
        <div className="w-[550px] shadow-lg p-8 rounded-lg">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginValidate}
            onSubmit={({ name, password }: any) => {
              handleLogin(name, password);
            }}
          >
            {(formik) => (
              <>
                <h1
                className="text text-center"
                >
                  Welcome to login page
                </h1>
                <Form>
                  <Label className="label" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    type="text"
                    name="email"
                    placeholder="Enter name"
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
                  <Button type="submit" className="btn-primary mt-4 w-full mb-4">
                    Login
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
                <a className="text-blue-600">Register</a>
              </Link>
            </p>
          </div>
        </div>
      </section>
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
