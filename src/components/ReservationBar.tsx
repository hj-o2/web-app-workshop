import React,{ useMemo } from "react";
import { Property } from "csstype";
import { IReservation } from "../models/IReservation";
import { makeStyles, Theme } from "@material-ui/core/styles";

type PropsType = {
  reservation: IReservation;
  leftOffset: number;
  beginHour: number;
  hourWidth: number;
  backgroundColor: Property.BackgroundColor;
};

type StyleType = {
  width: number;
  left: number;
  backgroundColor: Property.BackgroundColor;
};

const useStyle = makeStyles<Theme, StyleType>(() => ({
  root: {
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    width: (p) => p.width + "px",
    left: (p) => p.left + "px",
  },
  bar: {
    height: "50%",
    width: "100%",
    backgroundColor: (p) => p.backgroundColor,
  },
}));

export const ReservationBar: React.FC<PropsType> = (props) => {
  const { reservation, leftOffset, beginHour, hourWidth, backgroundColor } =
    props;
  const { startDate, endDate } = reservation;

  const width = useMemo(() => {
    const hours = endDate.diff(startDate, "minute") / 60;
    return hourWidth * hours;
  }, [startDate, endDate, hourWidth]);

  const left = useMemo(() => {
    const beginDate = startDate.set("hour", beginHour).startOf("hour");
    const diffStart = startDate.diff(beginDate, "minute") / 60;
    return leftOffset + diffStart * hourWidth;
  }, [beginHour, hourWidth, leftOffset, startDate]);

  const style = useStyle({
    width,
    left,
    backgroundColor,
  });

  return (
    <div className={style.root}>
      <div className={style.bar}></div>
    </div>
  );
};
