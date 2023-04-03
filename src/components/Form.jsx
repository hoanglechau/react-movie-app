import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FormProvider, FTextField, FCheckBox } from "./form/index.js";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Form() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || "/";

  function onDismiss() {
    navigate(-1);
  }

  const defaultValues = {
    username: "hoang",
    password: "123456789@",
    remember: true,
  };

  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    auth.signin(data.username, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onBackdropClick={() => onDismiss()}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Paper
          elevation={12}
          style={{
            borderRadius: "10px",
          }}
        >
          <div style={{ padding: "3rem" }}>
            <Typography
              color="primary.light"
              variant="h3"
              textAlign="center"
              mb={3}
            >
              Log in
            </Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} xs={3}>
                {errors.afterSubmit && (
                  <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}
                <FTextField name="username" label="Username" />
                <FTextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="primary"
                          aria-label="visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack>
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                  sx={{ mt: 3 }}
                >
                  Login
                </LoadingButton>
              </Stack>
            </FormProvider>
          </div>
        </Paper>
      </Box>
    </Modal>
  );
}
