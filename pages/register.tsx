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

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (name: string, password: string) => {};

  return (
    <>
      <section className="">
        <div className="">
          <Formik
            initialValues={{
              name: "",
              password: "",
            }}
            validationSchema={() => {}}
            onSubmit={({ name, password }: any) => {
              handleLogin(name, password);
            }}
          >
            {(formik) => (
              <>
                <h1
                  style={{
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Welcome to login page
                </h1>
                <Form>
                  <Label className="label" htmlFor="name">
                    Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className="form_control_input"
                    id="name"
                  />
                  <Label className="label" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="form_control_input"
                    id="password"
                  />
                  <Button type="submit" className="btn-primary">
                    Login
                  </Button>
                </Form>
              </>
            )}
          </Formik>
          {/* Footer */}
          <div className="">
            <p className="">
              if you don't have an account please
              <Link href="/register"> Register</Link>
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

export default Register;
