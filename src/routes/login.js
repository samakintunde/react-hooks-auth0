import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please, use a valid email address.")
      .required("Please, enter your email address."),
    password: Yup.string()
      .min(6, "Pass word length must be greater than 6 digits.")
      .required()
  });

  const initialFormValue = {
    email: "",
    password: ""
  };

  const handleSubmit = values => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: initialFormValue,
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <div>
      <Link to="/">Go Home</Link>
      <h1>Login Screen</h1>
      <form onSubmit={formik.handleSubmit}>
        <fieldset>
          <div>
            <label>
              <p>Email</p>
              <input
                type="email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </label>
            {formik.errors.email && formik.touched.email && (
              <div>{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label>
              <p>Password</p>
              <input
                type="password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </label>
            {formik.errors.password && formik.touched.password && (
              <div>{formik.errors.password}</div>
            )}
          </div>
          <br />
          <button type="submit">Log In</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
