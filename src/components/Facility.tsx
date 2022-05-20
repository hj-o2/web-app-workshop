import { Container, Paper, TextField } from "@material-ui/core";
import React from "react";

export const Facility: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Paper>
        <TextField label="設備名" fullWidth/>
        <TextField label="詳細" fullWidth/>
      </Paper>
    </Container>
  );
};
