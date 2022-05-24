import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { DateTimePicker } from "@material-ui/pickers";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container/Container";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Chip from "@material-ui/core/Chip/Chip";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { IReservation } from "../models/IReservation";
import { IFacility } from "../models/IFacility";

const initReservation: IReservation = {
  id: "001",
  facilityId: "001",
  subject: "目的001",
  description: "説明001",
  startDate: dayjs(),
  endDate: dayjs().add(1, "hour"),
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
  paper: {
    padding: theme.spacing(1),
    "& > div": {
      marginBottom: theme.spacing(2),
    },
  },
  rightActions: {
    textAlign: "right",
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
}));

// ダミーデータ
const dummyFacilities: IFacility[] = [
  {
    id: "01",
    name: "設備００１",
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: "",
  },
  {
    id: "02",
    name: "設備００２",
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: "",
  },
  {
    id: "03",
    name: "設備００３",
    // ダミーデータのため不必要なデータの定義は省略
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    system: {} as any,
    note: "",
  },
];

export const Reservation: React.FC = () => {
  const style = useStyle();
  const [facility, setFacility] = useState(initReservation);
  const { system } = initReservation;
  const { register, errors, control } = useForm({
    defaultValues: initReservation,
    mode: "onBlur",
  });
  const [facilities] = useState<IFacility[]>(dummyFacilities);
  const facilityMenuItems = useMemo(() => {
    return facilities.map((f) => (
      <MenuItem key={f.id} value={f.id}>
        {f.name}
      </MenuItem>
    ));
  }, [facilities]);

  return (
    <Container maxWidth="sm">
      <Paper className={style.paper}>
        <FormControl>
          <InputLabel id="facility-label">設備</InputLabel>
          <Controller
            name="facilityId"
            control={control}
            render={({ value, onChange }) => (
              <Select
                labelId="facility-label"
                value={value}
                onChange={onChange}
              >
                {facilityMenuItems}
              </Select>
            )}
          />
        </FormControl>
        <div style={{ display: "flex" }}>
          <Controller
            control={control}
            name="startDate"
            render={(data) => {
              return (
                <DateTimePicker
                  value={data.value}
                  onChange={data.onChange}
                  onBlur={data.onBlur}
                  label="開始日時"
                  format="YYYY/MM/DD HH:mm"
                  minutesStep={15}
                  ampm={false}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="endDate"
            render={(data) => {
              return (
                <DateTimePicker
                  value={data.value}
                  onChange={data.onChange}
                  onBlur={data.onBlur}
                  label="終了日時"
                  format="YYYY/MM/DD HH:mm"
                  minutesStep={15}
                  ampm={false}
                />
              );
            }}
          />
        </div>

        <Controller
          control={control}
          name="subject"
          rules={{ required: true }}
          as={
            <TextField
              label="目的"
              fullWidth
              error={!!errors.subject}
              helperText={errors.subject ? "必須です" : ""}
            />
          }
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: true }}
          as={
            <TextField
              label="詳細"
              fullWidth
              multiline
              value={facility.description}
            />
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
