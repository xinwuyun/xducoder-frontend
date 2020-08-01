import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from "react";
import TabsWrappedLabel from './TabsWrappedLabel';
import CommentStar from './comment/CommentStar';
import Cookies from 'js-cookie';
import { withRouter } from "next/router";

import API_CONFIG from '../components/api/API_CONFIG';

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundImage: "url(https://zrwyunpan.herokuapp.com//tj/%E5%9B%BE%E7%89%87/xidian.png)",
        height: "270px",
        width: "100%"
        //marginBottom:"20px",
    },
    hCon: {
        //marginTop: theme.spacing(6),
        //textShadow: '5px 5px 5px #FF0000',
    },
    hText1: {
        marginTop: theme.spacing(7),
        margin: theme.spacing(2, 0),
    },
    hText2: {
        //margin
    }
}))

function Course(props) {
    const classes = useStyles();
    const [course, setCourse] = useState({ CourseID: 0, CourseName: "", CourseNum: 0, completeNum: 0, CourseDIF: "", CourseDescription: "", stepID: 1 });
    //用户学号
    const STDNum = Cookies.get("STDNum");
    //课程ID
    var id = props.router.asPath;
    var [s1, s2] = id.split("=");
    const ID = parseInt(s2);
    //test
    console.log(ID);
    console.log(id);

    useEffect(() => {
        //选课
        const STUNum = STDNum;
        const CourseID = ID;
        fetch(API_CONFIG.challenge, {
            method: "POST",
            body: JSON.stringify({
                STUNum,
                CourseID,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log("选课");
                console.log(res);
            }),

            //加载课程信息
            fetch(API_CONFIG.courses)
                .then(res => res.json())
                .then(res => {
                    setCourse(res[CourseID - 1]);
                    console.log("课程信息");
                    console.log(res[CourseID - 1]);
                }).catch(err => console.log(err))
    }, []);

    return <Grid container justify="center" alignItems="center">
        <Grid container justify="center" className={classes.header}>
            <Grid item xs={7} className={classes.hCon}>
                <Grid item xs={12} spacing={3} className={classes.hText1}>
                    <Typography variant="h4">
                        {course.CourseName}
                    </Typography>
                </Grid>
                <Grid container className={classes.hText2}>
                    <Grid item xs={1} spacing={3}>
                        <Typography variant="h7">
                            学习人数
                        </Typography>
                    </Grid>
                    <Grid item xs={1} spacing={3}>
                        <Typography variant="h7">
                            通过人数
                        </Typography>
                    </Grid>
                    <Grid item xs={1} spacing={3}>
                        <Typography variant="h7">
                            难度
                        </Typography>
                    </Grid>
                    <Grid item xs={1} spacing={3}>
                        <Typography variant="h7">
                            学员评分
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={1} spacing={3}>
                        <Typography variant="h7">
                            {course.CourseNum}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} spacing={3}>
                        <Typography variant="h7">
                            {course.completeNum}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} spacing={3}>
                        <Typography variant="h7">
                            {course.CourseDIF}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} spacing={3}>
                        <Typography variant="h7">
                            <CommentStar />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <TabsWrappedLabel courseID={ID} />
        </Grid>
    </Grid>
}

export default withRouter(Course);
