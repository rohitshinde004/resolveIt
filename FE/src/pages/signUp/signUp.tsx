import { Form, Formik } from "formik";
import * as Yup from "yup"; // Import Yup for validation schema
import "./signUp.scss";
import TextBox from "../../components/common/textBox/textfield";
import { CommonButton } from "../../components/common/commonButton/commonButton";
import signUpImg from "../../assets/icons/WorkflowTeamwork.svg";

export const SignUp: React.FC = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    pincode: "",
    password: "",
    comfirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNo: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    pincode: Yup.string().required("Pincode is required"),
    password: Yup.string().required("Password is required"),
    comfirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <div className="signUpParent">
      <div className="formWrapper">
        <div className="formHeader">
          <span className="headerText">Sign Up</span>
        </div>
        <div className="signUpContainer">
          <div className="formContainer">
            <Formik
              onSubmit={() => {}}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {(formik) => (
                <Form className="signUpForm">
                  <div className="multiTextBoxContainer">
                    <div className="TextBoxConatiner">
                      <span className="subHeading">First Name</span>
                      <TextBox
                        className="textBox"
                        name="firstName"
                        onChangeCallBack={(value: string) => {
                          formik.setFieldValue("firstName", value);
                        }}
                        formikRef={formik}
                        placeholder="First Name"
                      />
                    </div>
                    <div className="TextBoxConatiner">
                      <span className="subHeading">Last Name</span>
                      <TextBox
                        className="textBox"
                        name="lastName"
                        onChangeCallBack={(value: string) => {
                          formik.setFieldValue("lastName", value);
                        }}
                        formikRef={formik}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
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
                    <span className="subHeading">Phone Number</span>
                    <TextBox
                      className="textBox"
                      name="phoneNo"
                      onChangeCallBack={(value: string) => {
                        formik.setFieldValue("phoneNo", value);
                      }}
                      formikRef={formik}
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="multiTextBoxContainer">
                    <div className="TextBoxConatiner">
                      <span className="subHeading">Address</span>
                      <TextBox
                        className="textBox"
                        name="address"
                        onChangeCallBack={(value: string) => {
                          formik.setFieldValue("address", value);
                        }}
                        formikRef={formik}
                        placeholder="Address"
                      />
                    </div>
                    <div className="TextBoxConatiner">
                      <span className="subHeading">Pincode</span>
                      <TextBox
                        className="textBox"
                        name="pincode"
                        onChangeCallBack={(value: string) => {
                          formik.setFieldValue("pincode", value);
                        }}
                        formikRef={formik}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                  <div className="TextBoxConatiner">
                    <span className="subHeading">Password</span>
                    <TextBox
                      className="textBox"
                      name="password"
                      onChangeCallBack={(value: string) => {
                        formik.setFieldValue("password", value);
                      }}
                      formikRef={formik}
                      placeholder="Password"
                    />
                  </div>
                  <div className="TextBoxConatiner">
                    <span className="subHeading">Comfirm Password</span>
                    <TextBox
                      className="textBox"
                      name="comfirmPassword"
                      onChangeCallBack={(value: string) => {
                        formik.setFieldValue("comfirmPassword", value);
                      }}
                      formikRef={formik}
                      placeholder="Comfirm Password"
                    />
                  </div>
                  <CommonButton
                    className="submitButton"
                    onClickCallBack={() => {
                      formik.handleSubmit();
                    }}
                    buttonLabel={"Submit"}
                  />
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
