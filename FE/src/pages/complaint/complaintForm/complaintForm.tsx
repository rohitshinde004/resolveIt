import { Form, Formik } from "formik";
import "./complaintForm.scss";
import TextBox from "../../../components/common/textBox/textfield";
import * as Yup from "yup";
import { CommonButton } from "../../../components/common/commonButton/commonButton";
import Instance from "../../../utils/axios";
import FormikDropDown from "../../../components/common/textBox/dropDown";
import { useEffect, useState } from "react";
import { getPincodeApiUrl } from "../../../constant/apiUrls";

export const ComplaintForm = () => {
  const userInfo: any = JSON.parse(localStorage.getItem("user") || "{}");
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
  ];
  const initialValues = {
    topic: "",
    description: "",
    image: null,
    pincode: "",
    address: "",
  };
  const validationSchema = Yup.object({
    topic: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    image: Yup.mixed()
      .test(
        "fileType",
        "Only JPG, PNG, and GIF formats are allowed",
        (value: any) => {
          return !value || (value && SUPPORTED_FORMATS.includes(value.type));
        }
      )
      .required("Required"),
    pincode: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });
  const [pincodes, setPincodes] = useState([]);
  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("topic", values.topic);
    formData.append("desc", values.description);
    formData.append("pincode", values.pincode);
    formData.append("location", values.address);
    formData.append("userId", userInfo._id); // Ensure userInfo._id is accessible
    formData.append("adminId", "65d3a5f2c45b3b00123abcd1"); // Replace with dynamic adminId if needed
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await Instance.post("complaint/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  useEffect(() => {
    const fetchPincode = async () => {
      try {
        const response = await Instance.get(getPincodeApiUrl);
        console.log("Pincodes:", response.data);
        setPincodes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPincode();
  }, []);

  return (
    <div className="formWrapper">
      <div className="formHeader">
        <span className="formHeadingText">File a Complaint</span>
        <span className="subHeading">Provide details about the issue</span>
      </div>
      <div className="complaintFromWrapper">
        <Formik
          onSubmit={(value) => {
            handleSubmit(value);
          }}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form className="formContainer">
              <div className="TextBoxConatiner">
                <span className="subHeading">Topic</span>
                <TextBox
                  className="textBox"
                  name="topic"
                  onChangeCallBack={(value: string) => {
                    formik.setFieldValue("topic", value);
                  }}
                  formikRef={formik}
                  placeholder="Topic"
                />
              </div>
              <div className="TextBoxConatiner">
                <span className="subHeading">Upload Image</span>
                <input
                  type="file"
                  name="image"
                  accept="image/jpg, image/jpeg, image/png, image/gif"
                  className="fileInput"
                  onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                      const file = event.target.files[0];
                      formik.setFieldValue("image", file);
                      formik.setTouched(
                        { ...formik.touched, image: true },
                        false
                      );
                    }
                  }}
                />
                {formik.touched.image && formik.errors.image ? (
                  <div className="error">{formik.errors.image}</div>
                ) : null}
              </div>
              <div className="pincodeAddressWrapper">
                <div className="TextBoxConatiner">
                  <span className="subHeading">Pincode</span>
                  {/* <TextBox
                    className="textBox"
                    name="pincode"
                    onChangeCallBack={(value: string) => {
                      formik.setFieldValue("pincode", value);
                    }}
                    formikRef={formik}
                    placeholder="Pincode"
                  /> */}
                  <FormikDropDown
                    className="textBox"
                    name="pincode"
                    onChange={(value: string) => {
                      formik.setFieldValue("pincode", value);
                    }}
                    formikRef={formik}
                    placeholder="Pincode"
                    option={pincodes}
                  />
                </div>
                <div className="TextBoxConatiner">
                  <span className="subHeading">Address</span>
                  <TextBox
                    className="textBox"
                    name="address"
                    onChangeCallBack={(value: string) => {
                      formik.setFieldValue("address", value);
                    }}
                    formikRef={formik}
                    placeholder="address"
                  />
                </div>
              </div>
              <div className="TextBoxConatinerDescription">
                <span className="subHeading">Description</span>
                <TextBox
                  className="textBox"
                  name="description"
                  onChangeCallBack={(value: string) => {
                    formik.setFieldValue("description", value);
                  }}
                  formikRef={formik}
                  placeholder="Description"
                  rows={5}
                  multiLine={true}
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
  );
};
