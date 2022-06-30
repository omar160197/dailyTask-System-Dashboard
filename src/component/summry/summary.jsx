import { Box, Grid } from "@mui/material";
import Example from "../charts/chart";
import SummaryTable from "./summaryTable";
import styles from "./summary.module.css";
const Summary = () => {
  return (
    <Box className={styles.summaryContainer}>
      <SummaryTable />
      <Example />
    </Box>
  );
};
export default Summary;
