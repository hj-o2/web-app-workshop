import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Utils from "@date-io/dayjs";
import { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import { Routing } from "./components/Routing";
import { Facility } from "./components/Facility";

class ExtendedUtils extends Utils {
  getCalendarHeaderText(date: Dayjs): string {
    return date.format("YYYY年 MMM");
  }
  getDateTimePickerHeaderText(date: Dayjs): string {
    return date.format("M/D");
  }
}

ReactDom.render(
  <MuiPickersUtilsProvider utils={ExtendedUtils} locale="ja">
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </MuiPickersUtilsProvider>,
  document.getElementById("container")
);

// ReactDom.render(<Facility />, document.getElementById("container"));
