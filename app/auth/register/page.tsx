"use client"
import React, { useState, useMemo } from "react";
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
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import countries from "world-countries";
import { useFormik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signUpSchema } from "../schema";
import { NAME_TRANS_EN } from "@/app/config/constant";
import { strengthColor, strengthIndicator } from "@/app/utils/password-strength";
import Link from "next/link";
import Animate from "@/app/components/extended/AnimateButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from "moment";
const SignUpComponent = () => {
  const theme: any = useTheme();
  const router = useRouter();

  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const maxDate = useMemo(() => moment().subtract(15, 'years'), [])
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [strength, setStrength] = useState<number>(0);
  const [level, setLevel] = useState<{ label: string; color: string; } | null>(null);

  const formik = useFormik({
    initialValues: {
      first_Name: "",
      last_Name: "",
      email: "",
      password: "",
      confirm_password: "",
      address: "",
      date_of_birth: moment(maxDate).format("MM/DD/YYYY HH:mm"),
      country: "VNM",
      phone_number: "",
      gender: 0,
    },
    validationSchema: signUpSchema,
    onSubmit: async (_values, formikHelpers) => {
      formikHelpers.setSubmitting(true)
      const result = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ..._values
        }),
      })
      formikHelpers.setSubmitting(false)
      if (!result) {
        toast.error("Error");
        return
      }
      if (result.status === 200) {
        setTimeout(() => {
          router.push("/auth/verify");
        }, 2000);
      } else {
        toast.error(await result.text());
      }
    },
  });

  const {
    errors,
    handleBlur,
    handleChange,
    isValid,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    setFieldValue
  } = formik;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    return
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = () => {
    return
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  return (
    <>
      <Animate animateWhenInView>
        <Container maxWidth="sm">
          <Grid
            container
            direction="column"
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
                      {NAME_TRANS_EN.SIGN_UP_TITLE}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={NAME_TRANS_EN.FIRST_NAME}
                      margin="normal"
                      name="first_Name"
                      type="text"
                      value={values.first_Name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.first_Name && errors.first_Name)}
                      sx={{ ...theme.typography.customInput }}
                    />
                    {touched.first_Name && errors.first_Name && (
                      <FormHelperText error>{errors.first_Name}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={NAME_TRANS_EN.LAST_NAME}
                      margin="normal"
                      name="last_Name"
                      type="text"
                      value={values.last_Name}
                      error={Boolean(touched.last_Name && errors.last_Name)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ ...theme.typography.customInput }}
                    />
                    {touched.last_Name && errors.last_Name && (
                      <FormHelperText error>{errors.last_Name}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <FormControl
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>{NAME_TRANS_EN.EMAIL}</InputLabel>
                  <OutlinedInput
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
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
                    label={NAME_TRANS_EN.PASSWORD}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  )}
                </FormControl>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {strength !== 0 && values.password && (
                    <FormControl fullWidth>
                      <Box
                        style={{ backgroundColor: level?.color }}
                        sx={{ maxWidth: 85, height: 8, borderRadius: "7px" }}
                      />
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </FormControl>
                  )}
                </Grid>
                <FormControl
                  fullWidth
                  error={Boolean(
                    touched.confirm_password && errors.confirm_password
                  )}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>{NAME_TRANS_EN.CONFIRM_PASSWORD}</InputLabel>
                  <OutlinedInput
                    type={showConfirmPassword ? "text" : "password"}
                    value={values.confirm_password}
                    name="confirm_password"
                    label={NAME_TRANS_EN.CONFIRM_PASSWORD}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                          size="large"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    inputProps={{}}
                  />
                  {touched.confirm_password && errors.confirm_password && (
                    <FormHelperText error>
                      {errors.confirm_password}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  fullWidth
                  error={Boolean(touched.phone_number && errors.phone_number)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>{NAME_TRANS_EN.PHONE_NUMBER}</InputLabel>
                  <OutlinedInput
                    type="phone"
                    value={values.phone_number}
                    name="phone_number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.phone_number && errors.phone_number && (
                    <FormHelperText error>{errors.phone_number}</FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  fullWidth
                  error={Boolean(touched.address && errors.address)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>{NAME_TRANS_EN.ADDRESS}</InputLabel>
                  <OutlinedInput
                    type="text"
                    value={values.address}
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.address && errors.address && (
                    <FormHelperText error>{errors.address}</FormHelperText>
                  )}
                </FormControl>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={Boolean(touched.gender && errors.gender)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <Select
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value={0}>
                          {NAME_TRANS_EN.MALE}{" "}
                        </MenuItem>
                        <MenuItem value={1}>
                          {NAME_TRANS_EN.FEMALE}{" "}
                        </MenuItem>
                        <MenuItem value={1}>
                          {NAME_TRANS_EN.GENDER_OTHER}{" "}
                        </MenuItem>
                      </Select>
                      {touched.gender && errors.gender && (
                        <FormHelperText error>{errors.gender}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={Boolean(touched.date_of_birth && errors.date_of_birth)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      {/* <InputLabel>{NAME_TRANS_VN.DATE_OF_BIRTH}</InputLabel> */}
                      <DateTimePicker maxDate={maxDate} value={moment(values.date_of_birth)}
                        onChange={(newValue) => setFieldValue("date_of_birth", moment(newValue).format("MM/DD/YYYY HH:mm"))} />
                      {touched.date_of_birth && errors.date_of_birth && (
                        <FormHelperText error>{errors.date_of_birth}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={Boolean(touched.gender && errors.gender)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <Select
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {countries.map(country => (<MenuItem key={country.cca3} value={country.cca3}>
                          <span className={`fi fi-${country.cca2.toLowerCase()}`}></span>&nbsp;{country.name.official}
                        </MenuItem>))}
                      </Select>
                      {touched.gender && errors.gender && (
                        <FormHelperText error>{errors.gender}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" justifyContent="center" rowSpacing={1}>
                  <Grid container item justifyContent="flex-end">
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      sx={{ textDecoration: "none", cursor: "pointer" }}
                      component={Link}
                      href="/auth/login"
                    >
                      {NAME_TRANS_EN.ALREADY_HAVE_ACCOUNT}?
                    </Typography>
                  </Grid>
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
                        {NAME_TRANS_EN.SIGN_UP}
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

export default SignUpComponent;


