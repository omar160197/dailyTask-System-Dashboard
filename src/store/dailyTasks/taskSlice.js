import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTasks =createAsyncThunk(
  "tasks/getTasks",
  async(id,thunkAPI) =>{
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.get(`http://localhost:8080/dailyTasks/${id}`);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
  }  
);

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (taskData, thunkAPI) => {
      console.log(taskData);
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.post("http://localhost:8080/dailyTasks", taskData);
        return res.data ;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (allData, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      console.log(allData);
      const {id} = allData
      const {taskdata} = allData
      try {
        const res = await axios.put(`http://localhost:8080/dailyTasks/${id}`, { data: taskdata })
        return res.data ;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (allData, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      const {id,employeeId} = allData
        console.log(allData); 
      try {

        const res = await axios.delete(`http://localhost:8080/dailyTasks/${id}`, { data: allData })
       
        return res.data ;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  )


  const initialState = {
    allTasks: [],
    selectedtask:null,
    isLoading: false,
    isError: false,
    message: null,
    isSuccess: false,
  };

  export const taskSlice=createSlice({
    name:"pets",
    initialState,
    reducers:{
        selectTask: (state,action) => {
            state.selectedtask=action.payload
          },
          reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
          },
    },
    extraReducers:{
      [getTasks.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = false;
      },
      [getTasks.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.allTasks=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [getTasks.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [updateTask.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [updateTask.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.allTasks=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [updateTask.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [addTask.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = false;
      },
      [addTask.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.allTasks=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [addTask.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [deleteTask.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [deleteTask.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.allTasks=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [deleteTask.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      }
    }
})
export const { selectTask ,reset } = taskSlice.actions;
export default taskSlice.reducer;