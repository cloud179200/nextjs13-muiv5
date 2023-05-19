"use client"
import React, { useEffect, useState } from 'react';
import AnimateButton from '@/app/components/extended/AnimateButton';
import { STATUS_VERIFY_EMAIL, NAME_TRANS_EN, HTTP_RESPONSE_STATUS } from '@/app/config/constant';
import { Typography, Button, Box } from '@mui/material';
import EmailSentPNG from "@/public/images/email-sent.png";
import EmailSuccessPNG from "@/public/images/email-success.png";
import EmailFailedPNG from "@/public/images/error.png";
import Link from 'next/link';
import LoadingComponent from '@/app/components/Loading';
import { useSearchParams } from 'next/navigation';
function Verify() {
  const searchParams = useSearchParams()
  const emailVerifyToken = searchParams?.get("emailVerifyToken") || ""
  const [statusContent, setStatusContent] = useState<{ image: any, content: React.ReactNode | string }>({
    image: EmailSentPNG,
    content: NAME_TRANS_EN.CHECK_EMAIL_FOR_VERIFY,
  })
  const [loading, setLoading] = useState(true)

  const verifyToken = async () => {
    if(!emailVerifyToken){
      setLoading(false)
      return
    }
    const res = await fetch(`/api/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailVerifyToken })
    });
    setLoading(false)
    switch (res.status) {
      case HTTP_RESPONSE_STATUS.OK:
        setStatusContent({
          image: EmailSuccessPNG,
          content: NAME_TRANS_EN.VERIFY_EMAIL_SUCCESS,
        });
        break;
      case HTTP_RESPONSE_STATUS.SERVER_ERROR:
        setStatusContent({
          image: EmailFailedPNG,
          content: (
            <>
              {NAME_TRANS_EN.VERIFY_EMAIL_FAILED}.<br /> Please Connect Email
              Support: <a href="mailto:anhqb200@gmail.com">cloud179200@gmail.com</a>
              .
            </>
          ),
        });
        break;
      default:
        setStatusContent({
          image: EmailSentPNG,
          content: NAME_TRANS_EN.CHECK_EMAIL_FOR_VERIFY,
        });
        break;
    }
  }

  useEffect(() => {
    verifyToken()
  }, [])

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <img src={statusContent.image.src} width="20%" alt='status'/>
      <Typography
        sx={{ fontWeight: "bold", marginBottom: 2 }}
        variant="h3"
        color="black"
        align="center"
      >
        {statusContent.content}
      </Typography>
      {statusContent.content !== STATUS_VERIFY_EMAIL.SENT && (
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
            LinkComponent={Link}
            href="/auth/login"
          >
            {NAME_TRANS_EN.BACK_HOME_PAGE}
          </Button>
        </AnimateButton>
      )}
    </Box >
  );
}

export default Verify