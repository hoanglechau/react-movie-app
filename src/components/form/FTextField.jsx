import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function FTextField({ name, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          label={label}
          variant="filled"
          color="secondary"
          size="small"
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...field} // get user input
          {...other}
        />
      )}
    />
  );
}

export default FTextField;
