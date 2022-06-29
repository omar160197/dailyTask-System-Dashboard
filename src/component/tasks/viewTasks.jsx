import { Button, ButtonBase, Container } from "@mui/material";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditTasks from "./editTasks";
import CreateTasks from "./createTasks";
import styles from "./CreateTasks.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import {
  deleteTask,
  getTasks,
  selectTask,
} from "../../store/dailyTasks/taskSlice";

const ViewTasks = ({ userId }) => {
  const [editPage, setEditPage] = React.useState(false);
  const [addPage, setAddPage] = React.useState(false);

  const { allTasks, isLoading } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (userId) {
      dispatch(getTasks(userId));
    }
  }, [navigate]);

  const converDate = (date) => {
    var newdate = new Date(date);
    return (
      (newdate.getMonth() > 8
        ? newdate.getMonth() + 1
        : "0" + (newdate.getMonth() + 1)) +
      "/" +
      (newdate.getDate() > 9 ? newdate.getDate() : "0" + newdate.getDate()) +
      "/" +
      newdate.getFullYear()
    );
  };

  return (
    <Box sx={{ backgroundColor: "white", padding: "2%" }}>
      <h4
        style={{ marginBottom: "3%", fontWeight: "bold", fontFamily: "tahoma" }}
      >
        Daily Work Report
      </h4>
      {!addPage && !editPage && (
        <>
          <Box>
            <ButtonBase
              onClick={() => setAddPage(true)}
              type="submit"
              className={styles.addButton}
            >
              <i
                style={{ marginRight: "3%", color: "white" }}
                className="fa-solid fa-plus"
              ></i>
              New
            </ButtonBase>
          </Box>
          {isLoading ? (
            <div className={styles.progressContainer}>
              <CircularProgress className={styles.progress} />
            </div>
          ) : (
            <TableContainer component={Paper} sx={{ marginTop: "2%" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#F0F2F5" }}>
                  <TableRow>
                    <TableCell className={styles.headerCell}>
                      MM/DD/YY
                    </TableCell>
                    <TableCell className={styles.headerCell} align="right">
                      From
                    </TableCell>
                    <TableCell className={styles.headerCell} align="right">
                      To
                    </TableCell>
                    <TableCell className={styles.headerCell} align="right">
                      Project ID
                    </TableCell>
                    <TableCell className={styles.headerCell} align="right">
                      Category
                    </TableCell>
                    <TableCell className={styles.headerCell} align="right">
                      Description
                    </TableCell>
                    <TableCell className={styles.headerCell} align="right">
                      Priority
                    </TableCell>
                    <TableCell className={styles.headerCell} align="right">
                      Status
                    </TableCell>
                    <TableCell className={styles.headerCell} align="right">
                      % complete
                    </TableCell>
                    <TableCell className={styles.headerCell} align="right">
                      Time spent
                    </TableCell>
                    <TableCell
                      className={styles.headerCell}
                      align="right"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allTasks &&
                    allTasks.map((row, index) => (
                      <TableRow
                        className={
                          row.status === "In Progress"
                            ? styles.inProgressStyle
                            : row.status === "Completed"
                            ? styles.completedStyle
                            : ""
                        }
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className={styles.dataCell}
                          component="th"
                          scope="row"
                        >
                          {converDate(row.date)}
                        </TableCell>
                        <TableCell className={styles.dataCell} align="right">
                          {row.from}
                        </TableCell>
                        <TableCell className={styles.dataCell} align="right">
                          {row.to}
                        </TableCell>
                        <TableCell className={styles.dataCell} align="right">
                          {row.projectId}
                        </TableCell>
                        <TableCell className={styles.dataCell} align="right">
                          {row.category}
                        </TableCell>
                        <TableCell className={styles.dataCell} align="right">
                          {row.taskDescription}
                        </TableCell>
                        <TableCell
                          className={`${styles.dataCell} ${
                            row.priority === "High"
                              ? styles.high
                              : row.priority === "Low"
                              ? styles.low
                              : row.priority === "Medium"
                              ? styles.medium : ''
                          }`}
                          align="right"
                        >
                          {row.priority}
                        </TableCell>
                        <TableCell className={styles.dataCell} align="right">
                          {row.status}
                        </TableCell>
                        <TableCell className={styles.dataCell} align="right">
                          {row.completePersentage}
                        </TableCell>
                        <TableCell className={styles.dataCell} align="right">
                          {row.timeSpent}
                        </TableCell>
                        <TableCell sx={{ fontSize: "11px" }} align="right">
                          <Button
                            sx={{ fontSize: "11px" }}
                            variant="text"
                            onClick={() => {
                              setEditPage(true);
                              dispatch(selectTask(row));
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() =>
                              dispatch(
                                deleteTask({
                                  id: row._id,
                                  employeeId: userId,
                                })
                              )
                            }
                            className={styles.tableDeleteButton}
                            variant="text"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
      {editPage && <EditTasks setEditPage={setEditPage} />}
      {addPage && <CreateTasks setAddPage={setAddPage} />}
    </Box>
  );
};
export default ViewTasks;
