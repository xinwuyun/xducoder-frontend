import { Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { useRouter, Router, withRouter } from "next/router";
//import { withCookies, Cookies } from 'react-cookie';
import Cookies from 'js-cookie';

import API_CONFIG from "./api/API_CONFIG";
import { useState, Fragment } from 'react';
import { loginUser, isLogin, jupyterlogout, jupyterlogin, getSTDNum } from "./User";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarStyle: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  formStyle: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submitStyle: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = ({ router }) => {
  var redirectUrl = ""
  if (router.query.id) {
    redirectUrl = "course?id=" + router.query.id;
  }
  const classes = useStyles();
  const rter = useRouter();
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);

  const handleLogin = (data, e) => {

    const account = data.account;
    const password = data.password;
    const accessToken = Cookies.get("token") || '';
    var millisecond = new Date().getTime();
    var expiresTime = new Date(millisecond + 60 * 1000 * 120);

    fetch(API_CONFIG.login, {
      method: "POST",
      body: JSON.stringify({
        account,
        password,
        accessToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.msg === "success") {
          jupyterlogout();
          Cookies.set("token", res.token, {
            expires: expiresTime,
          });
          Cookies.set("user", res.account, {
            expires: expiresTime,
          });
          Cookies.set("userID", res.userID, {
            expires: expiresTime,
          });
          alert("登录成功");

          jupyterlogin();
          console.log(res.msg);
          console.log(res.token);

          rter.push("/" + redirectUrl);
        }
        else {
          Cookies.remove("token");
          Cookies.remove("user");
          Cookies.remove("userID");
          console.log("Failed");
          setOpen(true);
        }
      })
      .catch((err) => console.log(err));
    router.prefetch('/index');

  };


  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => { setOpen(false) }}
      >
        <Alert onClose={() => { setOpen(false) }} severity="error" elevation={6} variant="filled">
          登录失败，请检查账号密码是否正确！
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <div className={classes.paperStyle}>
          <Avatar className={classes.avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            登 录
          </Typography>
          <form className={classes.formStyle} onSubmit={handleSubmit(handleLogin)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="account"
              label="Account"
              name="account"
              autoComplete="account"
              autoFocus
              inputRef={register}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="记住密码"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitStyle}
            >
              登 录
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  忘记密码
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"没有账号?"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Fragment>
  );
}

export default withRouter(LoginForm);
