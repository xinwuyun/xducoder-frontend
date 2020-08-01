/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */
import { styled } from '@material-ui/core/styles';
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange,deepPurple } from '@material-ui/core/colors';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import Link from '@material-ui/core/Link';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import copy from 'copy-to-clipboard';
import {quitjupyter} from './quitjupyter.js';
import {loginUser} from "./User"
import Cookies from 'js-cookie';

const drawerWidth = 100;
const jupyterIframe = styled('iframe')({
	    position: "fixed",
	    top: 0,
	    left: 0,
	    bottom: 0,
	    right: 0,
	    width: "100%",
	    height: "100%",
	    border: "none",
	    margin: 0,
	    padding: 0,
	    overflow: "hidden",
	    zIndex: "999999"
})
const useStyles = makeStyles((theme) => ({
  root: {
    button: {
      fontStyle: 'italic',
    },
  },
  
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },

  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  name:{
    flexGrow: 1,
    width: "50%",
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const JupyterPage = ({
  courseName,
  stepID,
  stepUrl,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onClickCopy = str =>{
    if(copy(str)){
     alert("下载链接已复制"); 
    }
    else alert("复制失败,请手动复制")
  };
  
  const navigation = (navName, navPath) => (
	      <Link href={navPath}>
	        <Button className={classes.navItem}>{navName}</Button>
	      </Link>
	    );
  
  const jupyterlink="http://47.100.185.208:8000/user/"+Cookies.get("STDNum")+"/notebooks/"+stepUrl;
  
  const Jupyter = (props) => {
	      return ( 
		              <iframe src={jupyterlink} width="100%"  height="792">
		              </iframe>
		           );
  }
  return (
    <div className={classes.root}>
     <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
{/*          <Typography variant="h6" noWrap className={classes.title}>
            Juypter Page————导航栏组件（用户标识、课程名称、重置实训、退出实训）
      </Typography>*/}
      
      <Typography  variant="h4"noWrap className={classes.title}>
	{navigation(loginUser(), "/")}
      </Typography>
      <Typography variant="h4"noWrap className={classes.name} align="center"
                  color="inherit" display="block" 
      >
	{courseName}第 {stepID} 关
      </Typography>

      <div className={classes.root}>
      <Button onClick={() => { (quitjupyter.resetbutton())}}
      variant="outlined" size="medium" color="inherit" aria-label="reset">
        <AccessTimeOutlinedIcon fontSize="large"> </AccessTimeOutlinedIcon>
        <h4>重置实训</h4>
      </Button>

      <Button onClick={() => { (quitjupyter.quitbutton()) }}
      variant="contained" size="medium" color="secondary" aria-label="exit">
        <PowerSettingsNewIcon fontSize="large" color="inherit"></PowerSettingsNewIcon>
        <h4>退出实训</h4>
      </Button>
      </div>
      
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          ><h6>数据集</h6>
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
        
<Jupyter/>     
      
    <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <div>
            <h3><SystemUpdateAltIcon fontSize="large" color="action"></SystemUpdateAltIcon>&nbsp;&nbsp;数据集</h3>  
          </div>
           
        </div>
        <Divider />
        <Divider /> 

        <div>
        <div className="downloadLink1"><h4>&nbsp;cvnis.xidian.edu.cn</h4></div>
        <Link href="#" onClick ={() =>onClickCopy("cvnis.xidian.edu.cn") }>
        <h5>复制地址</h5>
        </Link> 
        </div>

        <Divider />
        <div>
        <div className="downloadLink2"><h4>&nbsp;www.xidian.edu.cn</h4></div>
        
        <Link href="#" onClick ={() =>onClickCopy("www.xidian.edu.cn") }>
        <h5>复制地址</h5>
        </Link> 
        </div>
        <Divider />
    </Drawer>
   </div>
  );

}
export default JupyterPage;
