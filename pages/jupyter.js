/* eslint-disable no-unused-vars */
import React from 'react';
import JupyterPage from '../components/JupyterPage';
import { withRouter } from 'next/router';


const Jupyter = ({ router }) => {
    return (<JupyterPage
        courseName={router.query.courseName}
        stepID={router.query.stepID}
        stepUrl={router.query.stepUrl}
    />);
}
export default withRouter(Jupyter)
