import axios from "axios";
import { Form, Formik } from "formik";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Label from "../app/Components/Label/Label";
import Input from "../app/Components/FormikInput/FormikInput";
import Button from "../app/Components/Button/Button";
import { useRouter } from "next/router";
import { registerValidate } from "../app/validation/validate";
import { apiEndPoint } from "../app/utils";
import Loader from "../app/Components/Loader/Loader";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (
    name: string,
    password: string,
    email: string
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${apiEndPoint}/auth/register`, {
        email,
        password,
        name
      });
      setLoading(false);
      toast.success(data?.message);
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="flex items-center justify-center min-h-screen">
          <div className="w-[550px] shadow-lg p-8 rounded-lg">
            <Formik
              initialValues={{
                email: "",
                name: "",
                password: "",
              }}
              validationSchema={registerValidate}
              onSubmit={({ name, password, email }: any) => {
                handleRegister(name, password, email);
              }}
            >
              {(formik) => (
                <>
                  <h1 className="text text-center">Welcome to register page</h1>
                  <Form>
                    <Label className="label" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Example: test@gmail.com"
                      className="input_auth"
                      id="email"
                    />
                    <Label className="label" htmlFor="name">
                      Name
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Example: razu islam"
                      className="input_auth"
                      id="name"
                    />
                    <Label className="label" htmlFor="password">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Example:@123JoeasDeoue#"
                      className="input_auth"
                      id="password"
                    />
                    <Button
                      type="submit"
                      className="btn-primary mt-4 w-full mb-4"
                    >
                      Login
                    </Button>
                  </Form>
                </>
              )}
            </Formik>
            {/* Footer */}
            <div className="">
              <p className="text">
                if you already have an account please
                <Link href="/login">
                  <a className="text-blue-600 m-1">Login</a>
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;

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

