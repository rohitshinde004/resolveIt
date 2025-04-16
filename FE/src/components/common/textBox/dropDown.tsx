import { Autocomplete, Avatar, InputAdornment, TextField } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import { styled } from "@mui/material/styles";

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiAutocomplete-listbox": {
    maxHeight: "200px", // Adjust the height as needed
    overflowY: "auto",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#ffc01d",
    },
  },
}));

const FormikDropDown = (props: any) => {
  const {
    name,
    className,
    value,
    option,
    onChange,
    placeholder,
    formikRef,
    avatar,
    showAvatar,
    inputProps,
    ListboxProps,
    handleScroll,
    loading,
  } = props;
  const StyledAvatar = styled(Avatar)({
    width: 20,
    height: 20,
    color: "black",
  });
  return (
    <StyledAutocomplete
      disablePortal
      className={className}
      size="small"
      value={value}
      disabled={props.disabled}
      getOptionLabel={(option: any) => {
        if (typeof option === "object" && option !== null) {
          return (
            option.resourceName ||
            option.name ||
            option.firstName + " " + option.lastName ||
            ""
          );
        } else if (typeof option === "string") {
          return option;
        } else {
          return "";
        }
      }}
      options={Array.isArray(option) ? option : [option]}
      onChange={(event: any, value: any) => {
        onChange(value);
      }}
      ListboxProps={{
        ...ListboxProps,
        onScroll: (event) => {
          const target = event.target;
          const bottom =
            (target as HTMLElement).scrollHeight ===
            (target as HTMLElement).scrollTop +
              (target as HTMLElement).clientHeight;
          if (bottom) {
            if (handleScroll && handleScroll) {
              handleScroll();
            }
          }
        },
        style: {
          maxHeight: "200px",
          overflowY: "auto",
        },
      }}
      renderInput={(params) => (
        <Field
          as={TextField}
          {...params}
          size="small"
          InputProps={{
            ...params.InputProps,
            ...inputProps,
            startAdornment: showAvatar ? (
              <InputAdornment position="start">
                <StyledAvatar
                  className="avatarSize"
                  alt="Avatar"
                  src={avatar}
                />
              </InputAdornment>
            ) : null,
          }}
          placeholder={placeholder}
          error={formikRef.touched[name] && formikRef.errors[name]}
          helperText={<ErrorMessage name={name} />}
        />
      )}
      noOptionsText={loading ? "Loading Data.." : "No Options"}
    />
  );
};

export default FormikDropDown;
