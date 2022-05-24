import React from "react";
import { Route, Switch } from "react-router-dom";
import { Reservation } from "./Reservation";
import { Facility } from "./Facility";
import { ReservationList } from "./ReservationList";

export const Routing = () => {
  return (
    <Switch>
      <Route path="/reservation" component={Reservation} />
      <Route path="/facility" component={Facility} />
      <Route path="/" exact component={ReservationList} />
    </Switch> 
  );
};
