import React from "react";
import { Box, ButtonBase, Container, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../store/dailyTasks/taskSlice";
import styles from "./CreateTasks.module.css";
const EditTasks = ({ setEditPage }) => {
  const { isError ,selectedtask } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    from: Yup.string().required("Please Enter your start time"),
    to: Yup.string().required("Please Enter your end time"),
  });
  const formik = useFormik({
    initialValues: {
      date:selectedtask.date,  
      from: selectedtask.from,
      to: selectedtask.to,
      projectId: selectedtask.projectId,
      category: selectedtask.category,
      priority: selectedtask.priority,
      status: selectedtask.status,
      taskDescription: selectedtask.taskDescription,
      employeeId: user._id,
    },

    onSubmit: (values) => {
      console.log(values);
      dispatch(updateTask({taskdata:values,id:selectedtask._id}));

      if (isError) {
        console.log("error mesage");
      }
      setEditPage(false);
    },
    validationSchema,
  });
  return (
    <Container>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          {/* ------------From input-------------- */}
         
            <div className="mb-2 col-sm-12 col-md-12">
              <label
                htmlFor="from"
                className={`form-label  ${styles.labelStyle}`}
              >
                From{" "}
              </label>
              <input
                className={`form-control ${styles.inputStyle}`}
                placeholder="Enter Your start time"
                type="time"
                name="from"
                {...formik.getFieldProps("from")}
              />
              {formik.touched.from && formik.errors.from ? (
                <div className={styles.errorStyle}>{formik.errors.from}</div>
              ) : null}
            </div>
          {/* ------------to input-------------- */}
          <div className="mb-2 col-sm-12 col-md-12 ">
            <label htmlFor="to" className={`form-label  ${styles.labelStyle}`}>
              To
            </label>
            <input
              className={`form-control ${styles.inputStyle}`}
              type="time"
              placeholder="Enter Your end time"
              name="to"
              {...formik.getFieldProps("to")}
            />
            {formik.touched.to && formik.errors.to ? (
              <div className={styles.errorStyle}>{formik.errors.to}</div>
            ) : null}
          </div>
          {/* ------------project id input-------------- */}
          <div className="mb-2 col-sm-12 col-md-12 ">
            <label
              htmlFor="projectId"
              className={`form-label  ${styles.labelStyle}`}
            >
              Project Id
            </label>
            <input
              className={`form-control ${styles.inputStyle}`}
              type="text"
              placeholder="Enter Your project id"
              name="projectId"
              {...formik.getFieldProps("projectId")}
            />
          </div>
          {/* ------------Description input-------------- */}
          <div className="mb-2 col-sm-12 col-md-12 ">
            <label
              htmlFor="taskDescription"
              className={`form-label  ${styles.labelStyle}`}
            >
              Description of task
            </label>
            <input
              className={`form-control ${styles.inputStyle}`}
              type="text"
              placeholder="Enter Your task description"
              name="taskDescription"
              {...formik.getFieldProps("taskDescription")}
            />
          </div>
          {/* ------------selector container -------------- */}
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            className={styles.selectorContainer}
          >
            {/* ------------category input -------------- */}

            <Grid item xs={2} sm={4} md={4}>
              <label
                htmlFor="category"
                className={`form-label  ${styles.labelStyle}`}
              >
                category :
              </label>
              <select
                className={styles.selectStyle}
                name="category"
                {...formik.getFieldProps("category")}
              >
                <option value="Techical">Techical</option>
                <option value="Meetings">Meetings</option>
                <option value="Admin">Admin</option>
              </select>
            </Grid>
            {/* ------------priority input -------------- */}
            <Grid item xs={2} sm={4} md={4}>
              <label
                htmlFor="priority"
                className={`form-label  ${styles.labelStyle}`}
              >
                priority :
              </label>
              <select
                className={styles.selectStyle}
                name="Priority"
                {...formik.getFieldProps("priority")}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </Grid>
            {/* ------------Status input -------------- */}
            <Grid item xs={2} sm={4} md={4}>
              <label
                htmlFor="status"
                className={`form-label  ${styles.labelStyle}`}
              >
                Status :
              </label>
              <select
                className={styles.selectStyle}
                name="status"
                {...formik.getFieldProps("status")}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </Grid>
          </Grid>

          {/* ------------Save button -------------- */}
          <ButtonBase type="submit" className={styles.saveButton}>
            <i
              style={{ marginRight: "10%" }}
              className="fa-solid fa-floppy-disk"
            ></i>
            Save
          </ButtonBase>
          {/* ------------back button -------------- */}
          <ButtonBase
            onClick={() => setEditPage(false)}
            className={styles.deleteButton}
          >
            back
          </ButtonBase>
        </form>
      </Box>
    </Container>
  );
};
export default EditTasks;
