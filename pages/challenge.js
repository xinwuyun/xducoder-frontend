import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper } from "@material-ui/core";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Link from 'next/link';
import API_CONFIG from '../components/api/API_CONFIG';
import Router from 'next/router';
import { isLogin } from '../components/User.js';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  desc: {

  },
  headerCard: {
    padding: theme.spacing(4),
  },
  de: {
    marginBottom: theme.spacing(2),
  },
  chapter: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(4),
  },
  cTitle: {
    marginBottom: theme.spacing(2),
  }
}))

export default function Challenge({ courseID }) {
  const classes = useStyles();
  //const [course, setCourse] = useState({CourseID:1,CourseName:"",CourseNum:0,completeNum:0,CourseDIF:"",CourseDescription:"",stepID:1,chapters:[{step:0,stepName:"",stepDescription:"",stepUrl:""}]});
  const [course, setCourse] = useState({});
  const [chapters, setChapters] = useState([{ "courseID": "1", "nbID": "", "stepDescription": "", "stepID": 0, "stepName": "", "stepUrl": "" }])
  const history = useHistory();

  //学号
  const STDNum = Cookies.get("STDNum");
  var button = false;
  useEffect(() => {
    fetch(API_CONFIG.courses)
      .then(res => res.json())
      .then(res => {

        console.log("课程信息");
        setCourse(res[courseID - 1]);
      }).catch(err => console.log(err));

    console.log(course);

    fetch(API_CONFIG.course + "?id=" + courseID)
      .then(res => res.json())
      .then(res => {
        setChapters(res);
        console.log("关卡信息");
        console.log(chapters);
      })
  }, []);
  const yanzheng = (chapter) => {
    if (isLogin()) {
      fetch("http://47.100.185.208:8384/yanzheng", {
        method: "POST",
        body: JSON.stringify({
          "STDNum": STDNum,
          "courseId": chapter.courseID,
          "stepId": chapter.stepID,
        }),
        headers: { 'content-type': 'application/json' }
      })
        .then(response => response.json())
        .then(result => {
          Router.push({
            pathname: '/jupyter',
            query: {
              courseName: course.CourseName,
              courseID: chapter.courseID,
              stepID: chapter.stepID,
              stepUrl: chapter.stepUrl,
            }
          })
        })
        .catch(error => {
          alert("错误");
          console.log('error', error);
        });
    } else {
      Router.push({
        pathname: '/login',
        query: {
          id: courseID
        }
      });
    }

  }
  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      <Grid item xs={8} className={classes.desc}>
        <Paper elevation={3} className={classes.headerCard}>
          <div className={classes.de}>
            <Typography component="inline" variant="h4">
              课程简介
            </Typography>
          </div>
          <Typography variant="body1">
            {course.CourseDescription}
          </Typography>
        </Paper>

        {(chapters).map((chapter) => (
          <Paper
            key={chapter.step}
            elevation={3}
            className={classes.chapter}
          >
            {button = chapter.step <= course.stepID ? false : true}
            <Grid container justify="center" spacing={8} alignItems="center">
              <Grid item xs={10}>
                <div className={classes.cTitle}>
                  <Typography component="inline" variant="h4">
                    训练 {chapter.step} {chapter.stepName}
                  </Typography>
                </div>
                <Typography variant="body1">
                  {chapter.stepDescription}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button color="primary" variant="outlined" onClick={() => yanzheng(chapter)}>
                  <Typography variant="h5">
                    {button ? "开始挑战" : "继续挑战"}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Grid>
    </Grid>
  );
};
