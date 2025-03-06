import { Form, Formik } from "formik";
import "./complaintForm.scss";
import TextBox from "../../../components/common/textBox/textfield";
import * as Yup from "yup";
import { CommonButton } from "../../../components/common/commonButton/commonButton";

export const ComplaintForm = () => {
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

  return (
    <div className="formWrapper">
      <div className="formHeader">
        <span className="formHeadingText">File a Complaint</span>
        <span className="subHeading">Provide details about the issue</span>
      </div>
      <div className="complaintFromWrapper">
        <Formik
          onSubmit={(value) => {
            console.log("Form Submitted", value);
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
