import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import Avatar  from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container/Container";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Chip from "@material-ui/core/Chip/Chip";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import { IFacility } from "../models/IFacility";

const initFacility: IFacility = {
  id: "",
  name: "name の初期値",
  note: "",
  system: {
    createDate: new Date(),
    createUser: {
      displayName: "hojo yuki",
      email: "",
      face: "https://source.unsplash.com/OhKElOkQ3RE",
    },
    lastUpdateUser: {
      displayName: "yao yuki",
      email: "",
      face: "https://source.unsplash.com/IF9TK5Uy-KI",
    },
    lastUpdate: new Date(),
  },
};

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(1),
  },
  rightActions: {
    textAlign: "right",
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

export const Facility: React.FC = () => {
  const style = useStyle();
  const [facility, setFacility] = useState(initFacility);
  const { system } = initFacility;
  const { register, errors, control } = useForm({
    defaultValues: initFacility,
    mode: "onBlur",
  });

  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          as={
            <TextField
              label="設備名"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? "必須です" : ""}
            />
          }
        />
        <Controller
          control={control}
          name="note"
          rules={{ required: true }}
          as={
            <TextField label="詳細" fullWidth multiline value={facility.note} />
          }
        />
        <InputLabel shrink>登録者</InputLabel>
        <p>
          <Chip
            label={system.createUser.displayName}
            avatar={<Avatar src={system.createUser.face} />}
          />
          {dayjs(system.createDate).format("YYYY-MM-DD HH:mm")}
        </p>
        <InputLabel shrink>更新者</InputLabel>
        <p>
          <Chip
            label={system.lastUpdateUser.displayName}
            avatar={<Avatar src={system.lastUpdateUser.face} />}
          />
          {dayjs(system.lastUpdate).format("YYYY-MM-DD HH:mm")}
        </p>
        <Grid container>
          <Grid item xs={6}>
            <Button className={style.cancelButton} startIcon={<DeleteIcon />}>
              削除
            </Button>
          </Grid>
          <Grid item xs={6} className={style.rightActions}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneIcon />}
            >
              保存
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
