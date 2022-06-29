import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { print } from "graphql";
import gql from "graphql-tag";
import { useNavigate } from "react-router-dom";


export const loginUser = createAsyncThunk(
  "post/loginUser",
  async (userData, thunkAPI) => {
    console.log(userData);
    const { rejectWithValue } = thunkAPI;
   
    const LOGIN_USER = gql`
      mutation LoginUser($loginUserInput: LoginInput) {
        loginUser(loginUserInput: $loginUserInput) {
          email
          _id
          password
          username
          token
        }
      }
    `;

    const res = await axios.post("http://localhost:5000/", {
      query: print(LOGIN_USER),
      variables: {
        loginUserInput: {
          email: userData.email,
          password: userData.password,
        },
      },
    });
    // console.log(res.data.data.loginUser);
    if (res.data.data.loginUser !== null) {
      localStorage.setItem("user", JSON.stringify(res.data.data.loginUser));
      return res.data.data.loginUser;
    } else {
      console.log(res.data.errors[0].message);
      return rejectWithValue(res.data.errors[0].message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "post/registerUser",
  async (userData, thunkAPI) => {
    console.log(userData.values);
    const { rejectWithValue } = thunkAPI;

    const Register_USER = gql`
      mutation RegisterUser($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
          username
          email
          password
        }
      }
    `;
    const res = await axios.post("http://localhost:5000/", {
      query: print(Register_USER),
      variables: {
        registerInput: {
          username: userData.name,
          email: userData.email,
          password: userData.password,
        },
      },
    });

    console.log(res);
    if (res.data.data.registerUser !== null) {
      // localStorage.setItem("user", JSON.stringify(res.data.data.registerUser));
      return res.data.data.registerUser;
    } else {
      console.log(res.data.errors[0].message);
      return rejectWithValue(res.data.errors[0].message);
    }
  }
);


export const getAllUsers =createAsyncThunk(
  "update/updateUser",
  async (userData, thunkAPI) => {
    console.log(userData);
    const { rejectWithValue } = thunkAPI;

    const LOGIN_USER = gql`
    mutation GetUser($getUserInput: GetUserInput) {
      getUser(getUserInput: $getUserInput) {
        _id
        username
        email
        password
      }
    }
    `;

    const res = await axios.post("http://localhost:5000/", {
      query: print(LOGIN_USER),
      variables: {
        getUserInput: {
          email: userData,
        },
      },
    });
    console.log(res);
    if (res.data.data.getUser !== null) {
      return res.data.data.getUser;
    } else {
      console.log(res.data.errors[0].message);
      return rejectWithValue(res.data.errors[0].message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "update/updateUser",
  async (userData, thunkAPI) => {
    console.log(userData.values);
    const { rejectWithValue } = thunkAPI;

    const LOGIN_USER = gql`
      mutation UpdateUser($updateUserInput: UpdateInput) {
        updateUser(updateUserInput: $updateUserInput) {
          email
          _id
          username
          password
        }
      }
    `;

    const res = await axios.post("http://localhost:5000/", {
      query: print(LOGIN_USER),
      variables: {
        updateUserInput: {
          email: userData.values.email,
          password: userData.values.password,
          username: userData.values.username,
        },
      },
    });
    console.log(res);
    if (res.data.data.updateUser !== null) {
      return res.data.data.updateUser;
    } else {
      console.log(res.data.errors[0].message);
      return rejectWithValue(res.data.errors[0].message);
    }
  }
);





//Logout
export const logout = createAsyncThunk("post/logout", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    localStorage.removeItem("user");
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

let user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  allUsers :[],
  selectedUser:{},
  isLoading: false,
  isError: null,
  message: null,
  isSuccess: false,
};

export const graphqlUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    selectUser:(state,action)=>{
     state.selectedUser=action.payload
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      console.log(action);
      state.isLoading = true;
      state.isError = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      console.log(action);
      state.user = null;
      state.isSuccess=false;
    },

    [updateUser.pending]: (state, action) => {
      console.log(action);
      state.isLoading = true;
      state.isError = null;
    },

    [updateUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.allUsers = action.payload;
    },

    [updateUser.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    [registerUser.pending]: (state, action) => {
      console.log(action);
      state.isLoading = true;
      state.isError = null;
    },

    [registerUser.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      // state.user = action.payload;
    },

    [registerUser.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset , selectUser} = graphqlUserSlice.actions;
export default graphqlUserSlice.reducer;
