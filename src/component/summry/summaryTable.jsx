import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import styles from "./summary.module.css";

const SummaryTable = () => {
  const { allTasks } = useSelector((state) => state.tasks);

  const convertMinutesToHours = (totalHours, totalMinutes) => {
    var num = totalMinutes;
    var hours = num / 60;
    var rhours = Math.floor(hours) + totalHours;
    var minutes = (hours - Math.floor(hours)) * 60;
    var rminutes = Math.round(minutes);
    if (rminutes <= 9) rminutes = "0" + rminutes;
    if (rhours <= 9) rhours = "0" + rhours;
    return rhours + ":" + rminutes;
  };

  const sumOfHours = () => {
    let totalHours = 0;
    let totalMinutes = 0;
    allTasks.forEach((val) => {
      totalHours += +val.timeSpent.split(":")[0];
      totalMinutes += +val.timeSpent.split(":")[1];
    });
    if (totalMinutes === 60) {
      totalHours += 1;
      return totalHours + ":00";
    } else if (totalMinutes < 60) {
      if (totalMinutes <= 9) totalMinutes = "0" + totalMinutes;
      if (totalHours <= 9) totalHours = "0" + totalHours;
      return totalHours + ":" + totalMinutes;
    } else {
      return convertMinutesToHours(totalHours, totalMinutes);
    }
  };

  const iterator = (status) => {
    if (status === "---") {
      return allTasks.filter((val) => {
        return val.status !== status;
      }).length;
    } else
      return allTasks.filter((val) => {
        return val.status === status;
      }).length;
  };
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table className={styles.tableStyle} aria-label="simple table">
        <TableHead className={styles.tableHeadStyle}>
          <TableRow>
            <TableCell>Summary</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row">
              Total Tasks
            </TableCell>
            <TableCell align="right">{iterator("---")}</TableCell>
          </TableRow>

          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 1 },
            }}
          >
            <TableCell component="th" scope="row">
              Completed
            </TableCell>
            <TableCell align="right">{iterator("Completed")}</TableCell>
          </TableRow>

          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 1 },
            }}
          >
            <TableCell component="th" scope="row">
              In Progress
            </TableCell>
            <TableCell align="right">{iterator("In Progress")}</TableCell>
          </TableRow>

          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row">
              Not Started
            </TableCell>
            <TableCell align="right">{iterator("Not Started")}</TableCell>
          </TableRow>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row">
              Total % complete
            </TableCell>
            <TableCell align="right">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    backgroundColor: "#FF8042",
                    height: "1rem",
                    width: "1rem",
                  }}
                ></div>
                <div>
                  {iterator("---") !== 0
                    ? parseFloat(
                        (iterator("Completed") / iterator("---")) * 100
                      ).toFixed(2)
                    : 0}
                  %
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row">
              Grand Total
            </TableCell>
            <TableCell align="right">{sumOfHours()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default SummaryTable;
