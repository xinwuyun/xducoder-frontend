import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CommentInput from './comment/CommentInput';
import CommentReply from './comment/CommentReply';
import Challenge from './challenge';
//第二个导航栏
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsWrappedLabel({courseID}) {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example" centered indicatorColor='secondary'>
          <Tab
            value="one"
            label="任务"
            wrapped
            {...a11yProps('one')}
          />
          <Tab value="two" label="评论" {...a11yProps('two')}/>
          <Tab value="three" label="排行榜" {...a11yProps('three')}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <Challenge courseID={courseID}/>
      </TabPanel>
      <TabPanel value={value} index="two">
        评论
        <CommentReply/>
        <CommentInput/>
      </TabPanel>
      <TabPanel value={value} index="three">
        排行榜
      </TabPanel>
    </div>
  );
}
