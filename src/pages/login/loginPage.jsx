import * as React from "react";
import Box from "@mui/material/Box";
import styles from "./login.module.css";
import { Button, ButtonBase, Divider } from "@mui/material";
import * as Yup from "yup";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";

import { login, reset } from "../../store/users/userSlice";
import SignUpComponent from "../signUp/signUpComponent";

export default function LoginPage() {
  const [loginStatus, setLoginStatus] = React.useState(false);
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
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      console.log(values);
      const userData = {
        email: values.email,
        password: values.password,
      };
      dispatch(login(userData));
      if (isError) {
        console.log("error mesage");
      }
      if (isSuccess || user) {
        dispatch(reset());
        navigate("/home");
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
    <Box className={styles.parent}>
      <Box className={styles.loginContainer}>
        <p className={styles.mainTitle}>{!loginStatus ? "Login" : "Sign Up"}</p>
        {!loginStatus && (
          <>
            <form
              onSubmit={formik.handleSubmit}
              className={styles.formContainer}
            >
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
                    "Sign In"
                  )}
                </ButtonBase>
              </div>

              {isError && (
                <div>
                  <span className={styles.submitEror}>
                    userName or password is inCorrect
                  </span>
                </div>
              )}
            </form>
            <div className={styles.dividerContainer}>
              <Divider> Or </Divider>
            </div>

            <div className={styles.iconsContainer}>
              <i className={`fa-brands fa-facebook ${styles.facebookIcon}`}></i>
              <i className={`fa-brands fa-google ${styles.googlekIcon}`}></i>
              <i className={`fa-brands fa-twitter ${styles.twitterIcon}`}></i>
            </div>
            <p className={styles.quessionTitle}>Have not account yet?</p>
            <div className={styles.toggelButtonContainer}>
              <Button
                onClick={() => setLoginStatus(true)}
                className={styles.toggelButton}
              >
                Sign Up
              </Button>
            </div>
          </>
        )}

        {loginStatus && (
          <SignUpComponent
            setLoginStatus={setLoginStatus}
            loginStatus={loginStatus}
          />
        )}
      </Box>
    </Box>
  );
}
