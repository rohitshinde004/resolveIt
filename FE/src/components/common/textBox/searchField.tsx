import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import { debounce } from "lodash";
import { useCallback } from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "white",
    height: "37px",
    "& fieldset": {
      width: "100%",
      border: "1px solid #d0d5dd",
    //   border: "none",
      boxShadow: "0px 0px 7px -1px #a9a9a97a",

    },
    "&:hover fieldset": {
      boxShadow: "0px 0px 7px -1px #a9a9a97a",
      border: "none",
    },
    "&.Mui-focused fieldset": {
      // borderColor: "#d0d5dd",
      border: "1px solid #d0d5dd",
    },
  },
}));

export const SearchField = (props: any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <StyledTextField
      className={props.className}
      placeholder={props.placeholder}
      variant="outlined"
      fullWidth
      size="small"
      type="search"
      onChange={handleChange}
      disabled={props.disabled}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <SearchIcon className="searchIcon" />
          </InputAdornment>
        ),
      }}
    />
  );
};
