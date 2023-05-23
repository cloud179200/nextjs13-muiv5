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
import { NAME_TRANS_EN } from "@/app/config/constant";
import Link from "next/link";
import Animate from "@/app/components/extended/AnimateButton";
import { signIn } from "next-auth/react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const SignInComponent = () => {
  const theme = useTheme();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true)
    await fetch("/dashboard");
    await signIn("google")
    setSubmitting(false)
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (_values, formikHelpers) => {
      formikHelpers.setSubmitting(true)
      const result = await signIn("credentials", {
        redirect: false,
        ..._values,
      })
      await fetch("/dashboard");
      formikHelpers.setSubmitting(false)
      if (!result) {
        toast.error("Error");
        return
      }
      const { ok, error } = result
      if (ok) {
        router.push("/dashboard");
        return
      }
      toast.error(error || "");
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
    isSubmitting,
    setSubmitting
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
                      {NAME_TRANS_EN.SIGN_IN_TITLE}
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
                    label={NAME_TRANS_EN.EMAIL}
                    disabled={isSubmitting}
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
                  <InputLabel>{NAME_TRANS_EN.PASSWORD}</InputLabel>
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
                    label={NAME_TRANS_EN.PASSWORD}
                    disabled={isSubmitting}
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
                    {NAME_TRANS_EN.FORGOT_PASSWORD}?
                  </Typography>
                  <Typography
                    color="secondary"
                    sx={{ textDecoration: "none", cursor: "pointer" }}
                    component={Link}
                    href="/auth/register"
                  >
                    {NAME_TRANS_EN.DONT_HAVE_ACCOUNT}?
                  </Typography>
                </Stack>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  rowSpacing={1}
                  marginTop={1}
                  >
                  <Grid item xs={12}>
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
                        {NAME_TRANS_EN.SIGN_IN}
                      </Button>
                    </Animate>
                  </Grid>
                  <Grid item xs={12}>
                    <Animate>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        endIcon={<FcGoogle
                          stroke={"currentColor"}
                          strokeWidth={"1.5"}
                          size={"0.9375rem" || theme}
                          style={{ marginTop: "auto", marginBottom: "auto" }}
                        />}
                        onClick={handleGoogleLogin}
                      >
                        {NAME_TRANS_EN.SIGN_IN_WITH_GOOGLE}
                      </Button>
                    </Animate>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Animate>
    </>
  );
};

export default SignInComponent;
