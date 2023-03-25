import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

import { api } from "services/api.js";
import axios from "axios";
const myApi = new api();
export default function Login() {
  const [Form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...Form,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async () => {
    try {
      console.table(Form);

      const result = await axios.post("http://localhost:8080/api/login", Form);
      console.log(result);
      if (result.data.status == 100) {
        localStorage.setItem("user", JSON.stringify(result.data.data));

        setTimeout(() => {
          // navigation("/");
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {}
  };
  useEffect(() => {
    console.table(Form);
  }, [Form]);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full flex justify-center">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <span
              className="text-3xl font-extrabold"
              variant="h3"
              color="white"
            >
              Sign In
            </span>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              name="username"
              onChange={handleChange}
              //   label="Email"
              type="text"
              size="lg"
              placeholder="Username"
            />
            <Input
              name="password"
              onChange={handleChange}
              //   label="Password"
              type="password"
              size="lg"
              placeholder="Password"
            />
          </CardBody>
          <CardFooter className="pt-0 justify-evenly">
            <Button
              onClick={(e) => handleLogin()}
              className="justify-end"
              variant="gradient"
              fullWidth
            >
              Sign In
            </Button>
            {/* <span variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <span
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Sign up
              </span>
            </span> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}