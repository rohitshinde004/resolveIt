import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiAutocomplete-listbox": {
    maxHeight: "200px", // Adjust the height as needed
    overflowY: "auto",
    color: "white",
    borderRadius: "8px", // Updated borderRadius
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "none",
      borderRadius: "8px", // Updated borderRadius
      border: "none",
    },
    "& .MuiSelect-icon": { color: "white" },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
      borderRadius: "8px", // Updated borderRadius
    },
  },
}));

const FilterAutocomplete = (props: any) => {
  const {
    className,
    value: initialValue,
    option,
    onChange,
    placeholder,
    multiple = false,
    disabled,
  } = props;

  const [selectedValue, setSelectedValue] = useState(initialValue);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "#ffc01d";
      case "in progress":
        return "#2196f3";
      case "resolved":
        return "#4caf50";
      default:
        return "#9e9e9e";
    }
  };

  const handleChange = (event: any, newValue: any) => {
    setSelectedValue(newValue);
    onChange(event, newValue); // Pass the new value to the parent
  };

  return (
    <StyledAutocomplete
      disablePortal
      multiple={multiple}
      className={className}
      size="small"
      defaultValue={initialValue}
      disabled={disabled}
      options={option || []}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} size="small" placeholder={placeholder} />
      )}
      sx={{
        backgroundColor: getStatusColor(selectedValue),
        color: "white",
        borderRadius: "8px", // Updated borderRadius
        "& .MuiSelect-icon": { color: "white" },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
      }}
    />
  );
};

export default FilterAutocomplete;
