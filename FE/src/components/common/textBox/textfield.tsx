import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ErrorMessage, Field } from "formik";

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#ffc01d",
    },
  },
}));

const TextBox = (props: any) => {
  const {
    name,
    className,
    type,
    label,
    min,
    max,
    InputProps,
    placeholder,
    value,
    defaultValue,
    disabled = false,
    onChangeCallBack,
    multiLine = false,
    formikRef,
    rows,
    shrinkLabel,
    handleBlur,
    handleFocus,
    minDate
  } = props;


  return (
    <Field
      as={StyledTextField}
      size={props.size || "small"}
      name={name}
      className={className}
      type={type}
      label={label}
      inputProps={{ min, max }}
      InputProps={InputProps}
     // inputProps={{ min: minDate && dayjs(minDate).format('YYYY-MM-DD') }}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={(event: any) => onChangeCallBack(event.target.value)}
      onBlur={handleBlur}
      onFocus={handleFocus}
      multiline={multiLine}
      rows={rows}
      InputLabelProps={{
        shrink: shrinkLabel ,
    }}
      minDate={minDate}
      error={formikRef.touched[name] && formikRef.errors[name]}
      helperText={<ErrorMessage name={name} />} />
  );
};

export default TextBox;
