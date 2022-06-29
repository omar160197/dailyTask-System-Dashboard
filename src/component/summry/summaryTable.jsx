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

const SummaryTable = () => {
  const { allTasks } = useSelector((state) => state.tasks);

  const timeConvert = (totalHours, totalMinutes) => {
    var num = totalMinutes;
    var hours = num / 60;
    var rhours = Math.floor(hours) + totalHours;
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + ":" + rminutes;
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
    <TableContainer
      component={Paper}
      sx={{ marginTop: "2%", width: "40%", height: "90%" }}
    >
      <Table sx={{ width: "100%", height: "100%" }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#F0F2F5", height: "1%" }}>
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
                  {parseFloat(
                    (iterator("Completed") / iterator("---")) * 100
                  ).toFixed(2)}
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
            <TableCell align="right">10</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default SummaryTable;
