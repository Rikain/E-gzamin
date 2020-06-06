import React from "react";
import "./Home.scss";
import Header from "./Header";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import HelpOutlineTwoToneIcon from "@material-ui/icons/HelpOutlineTwoTone";
import Grid from '@material-ui/core/Grid';
import TestIcon from "../pictures/TestIcon";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
  },
  mainHeaders:{
    color: theme.palette.text.primary
  },
  testIcon: {
    fill: theme.palette.text.primary,
  },
  root: {
    flexGrow: 1,
  },

}));

type TestFieldType = {
  subject: string;
  owner: string;
  pub_date: string;
  result: string;
  result_positive: boolean;
  attempts: number;
  available_attempts: number;
  deadline: string;
  time: number;
};

type StatusPicType = {
  status: string;
};

function StatusIcon(props: StatusPicType) {
  const status = props.status;
  if (status === "todo") {
    return <HelpOutlineTwoToneIcon style={{ color: "yellow" }} />;
  }
  if (status === "failed") {
    return <HighlightOffTwoToneIcon style={{ color: "#ff4545" }} />;
  }
  if (status === "passed") {
    return <CheckCircleIcon style={{ color: "lightgreen" }} />;
  }
  return null;
}

type TestIconType = {
  status: "todo" | "failed" | "passed";
};

function _TestIcon(props: TestIconType) {
  const status = props.status;
  const styles = useStyles();

  return (
    <div className="test-icon">
      <TestIcon className={styles.testIcon} />
      <StatusIcon status={status} />
    </div>
  );
}

type TestFieldCellType = {
  label: string;
  value: string | boolean | number;
};

function TestFieldCell(props: TestFieldCellType) {
  const label = props.label;
  const value = props.value;

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "1.3em" }}>
      <p>{label + ":"}</p>
      <p>{value}</p>
    </div>
  );
}

function TestField(props: TestFieldType) {
  const styles = useStyles();
  const {
    subject,
    owner,
    pub_date,
    result,
    result_positive,
    attempts,
    available_attempts,
    deadline,
    time,
  } = props;

  const field = (
    <div className={`styles.mainContent, paper`}>
      <Paper elevation={2}>
        <div className={"flex-container, styles.root"}>
          <Grid container item xs={12} spacing={0}>
          <Grid  container item xs={1} spacing={0}>
            <_TestIcon
              status={
                available_attempts == attempts
                  ? "todo"
                  : result_positive
                  ? "passed"
                  : "failed"
              }
            />
          </Grid>
          <Grid  container item xs={2} spacing={0}>
            <TestFieldCell label="Subject" value={subject} />
          </Grid>
          <Grid container item xs={2} spacing={0}>
            <TestFieldCell label="Author" value={owner} />
          </Grid>
          <Grid container item xs={1} spacing={0}>
            <TestFieldCell label="Publicated" value={pub_date} />
          </Grid>
          <Grid container item xs={1} spacing={0}>
            <TestFieldCell label="Deadline" value={deadline} />
          </Grid>
          <Grid container item xs={1} spacing={0}>
            <TestFieldCell label="Score" value={result} />
          </Grid>
          <Grid container item xs={1} spacing={0}>
            <TestFieldCell
              label="Result"
              value={result_positive ? "Passed" : "Failed"}
            />
          </Grid>
          <Grid container item xs={1} spacing={0}>
            <TestFieldCell
              label="Attempts"
              value={attempts + "/" + available_attempts}
            />
          </Grid>
          <Grid container item xs={1} spacing={0}>
            <TestFieldCell label="Time" value={time + " min"} />
          </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );

  return field;
}

function Home() {
  const styles = useStyles();
  return (
    <div className="Home-content">
      <Header content="TODO" variant="h3"/>
      <TestField
        subject="Pszyrka"
        owner="Janusz"
        pub_date="21.37.1410"
        result="123/1500"
        result_positive={false}
        attempts={3}
        available_attempts={3}
        deadline="29.02.2021"
        time={20}
      />
      <Header content="COMPLETED" variant="h3"/>
      <TestField
        subject="Demonologia"
        owner="Seweryn"
        pub_date="11.12.1499"
        result="123/134"
        result_positive
        attempts={2}
        available_attempts={3}
        deadline="30.02.2021"
        time={15}
      />
        <Header content="FAILED" variant="h3"/>
        <TestField
        subject="Yerbomancja"
        owner="Cejrowski"
        pub_date="06.06.1944"
        result="15/16"
        result_positive={false}
        attempts={1}
        available_attempts={3}
        deadline="31.10.2026"
        time={99}
      />
    </div>
  );
}

export default Home;
