import Head from "next/head";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';

import CourseCard from '../components/CoureseCard';
import API_CONFIG from '../components/api/API_CONFIG';

const useStyles = makeStyles((theme) => ({
  noticeArea: {
    padding: theme.spacing(2, 5),
    marginBottom: theme.spacing(4)
  },
  noticeCard: {
    margin: theme.spacing(2, 0)
  },
  courseArea: {
    padding: theme.spacing(2, 5)
  },
  courseBox: {
    margin: theme.spacing(2, 0)
  }
}))

export default function Home() {
  const classes = useStyles();
  const [notice, setNotice] = useState({});
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    fetch(API_CONFIG.noticePreview)
      .then(res => res.json())
      .then(res => {
        setNotice(res);
      });

    fetch(API_CONFIG.courses)
      .then(res => res.json())
      .then(res => {
        setCourseList(res);
      });
  }, [])




  return (
    <Grid container>
      <Grid item xs={false} sm={false} md={2} />
      <Grid item container xs={12} sm={8} justify="center">
        <Grid item container className={classes.noticeArea}>
          <Typography variant="h3" component="h3">
            通知
          </Typography>
          <Card className={classes.noticeCard}>
            <CardContent>
              <Typography variant="h6" component="p">
                {notice.date}
              </Typography>
              <Typography variant="h4" component="h4">
                {notice.title}
              </Typography>
              <Typography variant="body2" component="p">
                {notice.detail}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">更多详情</Button>
            </CardActions>
          </Card>
          <Link href="/notices">
            <Button variant="contained" color="primary" >
              全部展开
            </Button>
          </Link>
        </Grid>

        <Grid item container className={classes.courseArea}>
          <Typography variant="h3" component="h3">
            课程
          </Typography>
          <Grid item container spacing={3} className={classes.courseBox}>
            {courseList.slice(0, 4).map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course.Courseid}>
                <CourseCard
                  courseId={course.CourseID}
                  courseCover={course.coverUrl}
                  courseTitle={course.CourseName}
                  courseDescription={course.CourseDescription}
                />
              </Grid>
            ))}
          </Grid>
          <Link href="/courses">
            <Button variant="contained" color="primary" >
              全部展开
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={false} md={2} />
    </Grid>
  );
}
