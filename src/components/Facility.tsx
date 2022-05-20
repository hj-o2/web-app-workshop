import {
  Avatar,
  Chip,
  Container,
  InputLabel,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import dayjs from "dayjs";
import React from "react";

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export const Facility: React.FC = () => {
  const style = useStyle();
  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <TextField label="設備名" fullWidth />
        <TextField label="詳細" fullWidth multiline />
        <InputLabel shrink>登録者</InputLabel>
        <p>
          <Chip
            label="登録者"
            avatar={<Avatar src="https://source.unsplash.com/OhKElOkQ3RE" />}
          />
          {dayjs(new Date()).format("YYYY-MM-DD HH:mm")}
        </p>
        <p>
          <Chip
            label="更新者"
            avatar={<Avatar src="https://source.unsplash.com/OhKElOkQ3RE" />}
          />
          {dayjs(new Date()).format("YYYY-MM-DD HH:mm")}
        </p>
      </Paper>
    </Container>
  );
};
