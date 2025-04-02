import { Form, Formik } from "formik";
import * as Yup from "yup"; // Import Yup for validation schema
import "./loginPage.scss";
import TextBox from "../../components/common/textBox/textfield";
import { CommonButton } from "../../components/common/commonButton/commonButton";
import signUpImg from "../../assets/icons/WorkflowTeamwork.svg";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import instance from "../../utils/axios";
import { LoginApiUrl } from "../../constant/apiUrls";
import { useNavigate } from "react-router-dom";
interface ILogin {
  email: string;
  password: string;
}
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = (values: ILogin) => {
    console.log(values);
    instance
      .post(LoginApiUrl, values)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="loginParent">
      <div className="formWrapper">
        <div className="formHeader">
          <span className="headerText">Log In</span>
        </div>
        <div className="signUpContainer">
          <div className="formContainer">
            <Formik
              onSubmit={(values: ILogin) => {
                handleLogin(values);
              }}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {(formik) => (
                <Form className="signUpForm">
                  <div className="TextBoxConatiner">
                    <span className="subHeading">Email</span>
                    <TextBox
                      className="textBox"
                      name="email"
                      onChangeCallBack={(value: string) => {
                        formik.setFieldValue("email", value);
                      }}
                      formikRef={formik}
                      placeholder="Email"
                    />
                  </div>
                  <div className="TextBoxConatiner">
                    <span className="subHeading">Password</span>
                    <TextBox
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="textField"
                      name="password"
                      formikRef={formik}
                      onChangeCallBack={(data: any) => {
                        formik.setFieldValue("password", data);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <CommonButton
                    className="submitButton"
                    onClickCallBack={() => {
                      formik.handleSubmit();
                    }}
                    buttonLabel={"Log In"}
                  />
                  <span
                    onClick={() => {
                      navigate("/signUp");
                    }}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    Sign Up
                  </span>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="imageWrapper">
        <img src={signUpImg} alt="" className="signUpImg" />
      </div>
    </div>
  );
};
