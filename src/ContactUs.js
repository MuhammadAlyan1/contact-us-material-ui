import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

// css
import "./ContactUs.css";

// material UI components
import { TextField, Button, Stack, Snackbar, Alert } from "@mui/material";

export const ContactUs = () => {
  const form = useRef();
  const [email, setEmail] = useState("");
  const [isFalseEmail, setIsFalseEmail] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  function validateEmail(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      console.log("ERROR!! invalid email");
      setIsFalseEmail(true);
      return;
    }

    setIsFalseEmail(false);

    emailjs.sendForm(
      "service_u34fd5j",
      "template_as6rgmv",
      form.current,
      "nhM5ZYdNE5pxT7fCY"
    );

    form.current.reset();
    setEmail("");
    setIsEmailSent(true);
  };

  return (
    <section className="contact-container">
      <p className="contact-heading">Get in touch</p>
      <form ref={form} onSubmit={sendEmail}>
        <Stack margin={1} spacing={1}>
          <TextField
            name="user_name"
            label="Name"
            variant="outlined"
            size="small"
            required
          />
          <TextField
            name="email"
            error={isFalseEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            size="small"
            required
          />
          <TextField
            name="message"
            label="Message"
            variant="outlined"
            size="small"
            multiline
            required
            rows={4}
          />

          <Button variant="contained" color="info" type="submit">
            Send
          </Button>
        </Stack>
      </form>

      <Snackbar
        open={isEmailSent}
        autoHideDuration={3000}
        onClose={() => setIsEmailSent(false)}
      >
        <Alert
          onClose={() => setIsEmailSent(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Email Sent!
        </Alert>
      </Snackbar>

      <Snackbar
        open={isFalseEmail}
        autoHideDuration={3000}
        onClose={() => setIsFalseEmail(false)}
      >
        <Alert
          onClose={() => setIsFalseEmail(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Invalid Email!
        </Alert>
      </Snackbar>
    </section>
  );
};
