"use client"
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signInSchema } from "../schema";
import { NAME_TRANS_VN } from "../../../config/constant";
import Link from "next/link";
import Animate from "@/components/extended/AnimateButton";
import { signIn } from "next-auth/react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignInComponent = () => {
  const theme: any = useTheme();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (_values, formikHelpers) => {
      console.log({ _values })
      formikHelpers.setSubmitting(true)
      const result = await signIn("credentials", {
        redirect: false,
        ..._values,
      })
      await fetch("/dashboard");
      formikHelpers.setSubmitting(false)
      if(!result){
        toast.error("Error");
        return 
      }
      const { ok, error } = result
      if (ok) {
        router.push("/dashboard");
      } else {
        toast.error(error || "");
      }
    },
  });

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    touched,
    values,
    isSubmitting
  } = formik;

  return (
    <>
      <Animate animateWhenInView>
        <Container maxWidth="sm">
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Grid item md={12}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                spacing={2}
              >
                <Grid
                  item
                  xs={12}
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      sx={{ fontWeight: "bold" }}
                      variant="h3"
                      color="black"
                    >
                      {NAME_TRANS_VN.SIGN_IN_TITLE}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <form noValidate onSubmit={handleSubmit}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label={NAME_TRANS_VN.EMAIL}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error>{errors.email}</FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>{NAME_TRANS_VN.PASSWORD}</InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label={NAME_TRANS_VN.PASSWORD}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  )}
                </FormControl>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    sx={{ textDecoration: "none", cursor: "pointer" }}
                    component={Link}
                    href="/"
                  >
                    {NAME_TRANS_VN.FORGOT_PASSWORD}?
                  </Typography>
                  <Typography
                    color="secondary"
                    sx={{ textDecoration: "none", cursor: "pointer" }}
                    component={Link}
                    href="/auth/register"
                  >
                    {NAME_TRANS_VN.DONT_HAVE_ACCOUNT}?
                  </Typography>
                </Stack>
                <Box sx={{ mt: 2 }}>
                  <Animate>
                    <Button
                      disableElevation
                      disabled={!isValid || isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      endIcon={isSubmitting && <CircularProgress color="secondary" size={20} />}
                    >
                      {NAME_TRANS_VN.SIGN_IN}
                    </Button>
                  </Animate>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Animate>
    </>
  );
};

export default SignInComponent;
