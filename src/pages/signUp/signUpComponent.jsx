import { ButtonBase, Button, CircularProgress } from "@mui/material";
import * as React from "react";
import * as Yup from "yup";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import styles from "./signUp.module.css";
import { register, reset } from "../../store/users/userSlice";

const SignUpComponent = ({ loginStatus, setLoginStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Please Enter your Email")
      .email("Invalid email format"),
    password: Yup.string().required("Please Enter your Password"),
    name: Yup.string().required("please Enter Your FullName"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },

    onSubmit: (values) => {
      console.log(values);
      const userData = {
        email: values.email,
        password: values.password,
        username: values.name,
      };
      dispatch(register(userData));
      if (isError) {
        console.log("error mesage");
      }
      if (isSuccess || user) {
        dispatch(reset());
        navigate("/login");
      }
    },
    validationSchema,
  });

  useEffect(() => {
    if (isSuccess || user) {
      // dispatch(reset())
      navigate("/home");
    }
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="name"
            placeholder="  Enter Your Name"
            className={styles.email}
            {...formik.getFieldProps("name")}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div className={styles.error}>{formik.errors.name}</div>
        ) : null}

        <div className={styles.inputContainer}>
          <input
            type="email"
            name="email"
            placeholder="  Enter Your Email"
            className={styles.email}
            {...formik.getFieldProps("email")}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.error}>{formik.errors.email}</div>
        ) : null}

        <div className={styles.inputContainer}>
          <input
            type="password"
            name="password"
            placeholder="  Enter Your password"
            className={styles.email}
            {...formik.getFieldProps("password")}
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.error}>{formik.errors.password}</div>
        ) : null}

        <div className={styles.buttonContainer}>
          <ButtonBase type="submit" className={styles.submitbutton}>
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </ButtonBase>
        </div>

        {isError && (
          <div>
            <span className={styles.submitEror}>
              {message}
            </span>
          </div>
        )}
      </form>

      <div className={styles.toggelButtonContainer}>
        <Button
          onClick={() => setLoginStatus(false)}
          className={styles.toggelButton}
        >
          Already have an account? Sign in.
        </Button>
      </div>
    </>
  );
};
export default SignUpComponent;
