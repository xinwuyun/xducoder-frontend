import { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, IconButton, Badge, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import SchoolIcon from "@material-ui/icons/School";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useRouter } from "next/router";
import Link from "next/link";

import {loginUser, isLogin, logout} from "./User";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(4)
  },
  logoIcon: {
    marginRight: theme.spacing(2)
  },
  logoText: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  navBrand: {
    flexGrow: 1,

  },
  navItem: {
    textTransform: 'capitalize'
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const router = useRouter();

  const navigation = (navName, navPath) => (
    <Link href={navPath}>
      <Button color="inherit" className={classes.navItem}>{navName}</Button>
    </Link>
  );
  
  const [auth, setAuth] = useState(false);

  const handleLogOut = () => {
    logout();
    location.reload();
    setAnchorEl(null);
  };

  let str = 'return ' + '`Hello ${name}!`';
  let func = new Function('name', str);
 
  if(isLogin()){
    return (
  
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
  
            <Box className={classes.logoBox}>
              <SchoolIcon className={classes.logoIcon}/>
              <Typography className={classes.logoText} variant="h6" noWrap>
                {router.pathname === "/admin" ? "Dashboard": "Codehub"}
              </Typography>
            </Box>
            
            <Box className={classes.navBrand}>
                {navigation("首页", "/")}
                {navigation("课程", "/courses")}
                {navigation("通知", "/notices")}
                {navigation("关于", "/about")}
            </Box>
  
            <Box>
              {navigation(func(loginUser()), "/")}
            </Box>
            <Button color="inherit" onClick={handleLogOut} className={classes.navItem}>注销</Button>
            
          </Toolbar>
        </AppBar>
        
      </div>)




  }



  else {
    return (
    
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>

            <Box className={classes.logoBox}>
              <SchoolIcon className={classes.logoIcon}/>
              <Typography className={classes.logoText} variant="h6" noWrap>
                {router.pathname === "/admin" ? "Dashboard": "Codehub"}
              </Typography>
            </Box>
            
            <Box className={classes.navBrand}>
                {navigation("首页", "/")}
                {navigation("课程", "/courses")}
                {navigation("通知", "/notices")}
                {navigation("关于", "/about")}
            </Box>

        
              <Box>
                {navigation("登录", "/login")}
              </Box>
          </Toolbar>
        </AppBar>
        
      </div>)
  }
  
}

export default Header;
