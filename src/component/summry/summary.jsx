import { Box, Grid } from "@mui/material";
import Example from "../charts/chart";
import SummaryTable from "./summaryTable";

const Summary = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "2%",
        height: "80vh",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <SummaryTable />
      <Example />
    </Box>
  );
};
export default Summary;
