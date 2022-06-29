import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { print } from "graphql";
import gql from "graphql-tag";

export const getUserBook=createAsyncThunk(
    'get/bookings',
    async (userData,thunkAPI)=>{
        console.log(userData);
        const { rejectWithValue } = thunkAPI;
        const GET_USER_BOOKINGS=gql`
        mutation GetAllBooking($getBookingInput: GetBookingInput) {
            getAllBooking(getBookingInput: $getBookingInput) {
              from
              to
              fee
              status
              ownerId
              petId
              note
              _id
              petName
            }
          }
        `;
        const res = await axios.post("http://localhost:5000/", {
            query: print(GET_USER_BOOKINGS),
            variables: {
                getBookingInput: {
                    ownerId: userData
                  }
            },
          });

          if (res.data.data.getAllBooking !== null) {  
            return res.data.data.getAllBooking;
          } else {
            console.log(res.data.errors[0].message);
            return rejectWithValue(res.data.errors[0].message);
          }
    }
    );


    export const updateBookings=createAsyncThunk(
        'edit/bookings',
        async (userData,thunkAPI)=>{
            console.log(userData.newPet[0]);
            let newFee=0
            if(userData.newPet[0].size === "small"){
              newFee=100
             } 
             if(userData.newPet[0].size === "meduim"){
              newFee=200
             }
              if(userData.newPet[0].size === "large"){
              newFee=300
              
             }
            const { rejectWithValue } = thunkAPI;
            const Update_USER_PETS=gql`
            mutation Mutation($updateBookingInput: UpdateBookingInput) {
              updateBooking(updateBookingInput: $updateBookingInput) {
                _id
                from
                to
                fee
                status
                ownerId
                petId
                petName
                note
              }
            }
            `;
            const res = await axios.post("http://localhost:5000/", {
                query: print(Update_USER_PETS),
                variables: {
                    updateBookingInput: {
                          bookingId: userData.bookId,
                          petId:userData.values.petId,
                          fee:newFee,
                          note:userData.values.note,
                          from:userData.values.from,
                          to:userData.values.to,
                          petName:userData.newPet[0].name,
                          ownerId:userData.newPet[0].ownerId
                      }
                },
              });
    
              if (res.data.data.updateBooking !== null) {
                return res.data.data.updateBooking;
              } else {
                console.log(res.data.errors[0].message);
                return rejectWithValue(res.data.errors[0].message);
              }
        }
        );


        export const updateAdminBookings=createAsyncThunk(
          'edit/bookings',
          async (userData,thunkAPI)=>{
              console.log(userData);
             
              const { rejectWithValue } = thunkAPI;
              const Update_USER_PETS=gql`
              mutation Mutation($updateBookingInput: UpdateBookingInput) {
                updateBooking(updateBookingInput: $updateBookingInput) {
                  _id
                  from
                  to
                  fee
                  status
                  ownerId
                  petId
                  petName
                  note
                }
              }
              `;
              const res = await axios.post("http://localhost:5000/", {
                  query: print(Update_USER_PETS),
                  variables: {
                      updateBookingInput: {
                            bookingId: userData.bookId,
                            petId:userData.values.petId,
                            fee:userData.values.fee,
                            note:userData.values.note,
                            from:userData.values.from,
                            to:userData.values.to,
                            petName:userData.values.petName,
                            status:userData.values.status,
                            ownerId:userData.ownerId
                        }
                  },
                });
      
                if (res.data.data.updateBooking !== null) {
                  return res.data.data.updateBooking;
                } else {
                  console.log(res.data.errors[0].message);
                  return rejectWithValue(res.data.errors[0].message);
                }
          }
          );
  

        export const createBooking=createAsyncThunk(
          'post/bookings',
          async (userData,thunkAPI)=>{
            console.log(userData.newPet[0].size);
            let newFee=0
            if(userData.newPet[0].size === "small"){
              newFee=100
             } 
             if(userData.newPet[0].size === "meduim"){
              newFee=200
             }
              if(userData.newPet[0].size === "large"){
              newFee=300
              
             }
              const { rejectWithValue } = thunkAPI;
              const ADD_USER_BOOKINGS=gql`
              mutation CreateBook($createBookingInput: CreateBookingInput) {
                createBook(createBookingInput: $createBookingInput) {
                  from
                  petName
                  to
                  fee
                  status
                  ownerId
                  petId
                  note
                  _id
                }
              }
              `;
              const res = await axios.post("http://localhost:5000/", {
                  query: print(ADD_USER_BOOKINGS),
                  variables: {
                    createBookingInput: {
                      ownerId: userData.newPet[0].ownerId,
                      petId:userData.newPet[0]._id,
                      fee:newFee,
                      note:userData.values.note,
                      from:userData.values.from,
                      to:userData.values.to,
                      petName:userData.newPet[0].name
                        }
                  },
                });
      
                if (res.data.data.createBook !== null) {
                  return res.data.data.createBook;
                } else {
                  console.log(res.data.errors[0].message);
                  return rejectWithValue(res.data.errors[0].message);
                }
          }
          );

          export const deleteBookings=createAsyncThunk(
            'post/bookings',
            async (userData,thunkAPI)=>{
                console.log(userData.petId);
                const { rejectWithValue } = thunkAPI;
                const ADD_USER_PETS=gql`
                mutation DeleteBooking($deleteBookingInput: DeleteBookingInput) {
                    deleteBooking(deleteBookingInput: $deleteBookingInput) {
                      _id
                      from
                      to
                      fee
                      status
                      ownerId
                      petId
                      note
                      petName
                    }
                  }
                `;
                const res = await axios.post("http://localhost:5000/", {
                    query: print(ADD_USER_PETS),
                    variables: {
                        deleteBookingInput: {
                          bookId: userData.bookId,
                          ownerId:userData.ownerId
                          }
                    },
                  });
                    
                  
                  if (res.data.data.deleteBooking !== null) {
                    return res.data.data.deleteBooking;
                  } else {
                    console.log(res.data.errors[0].message);
                    return rejectWithValue(res.data.errors[0].message);
                  }
            }
            );
    

    const initialState = {
        bookings: [],
        selectBook:null,
        isLoading: false,
        isError: null,
        message: null,
        isSuccess: false,
      };

export const bookSlice =createSlice({
    name:"bookings",
    initialState,
    reducers:{
        selectBook: (state,action) => {
            state.selectBook=action.payload
          },
          reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
          },
    },
    extraReducers:{
      [getUserBook.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [getUserBook.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.bookings=action.payload
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [getUserBook.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [updateBookings.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [updateBookings.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.bookings=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [updateAdminBookings.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [updateAdminBookings.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [updateAdminBookings.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.bookings=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [updateBookings.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [createBooking.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [createBooking.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.bookings=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [createBooking.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [deleteBookings.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [deleteBookings.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.bookings=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [deleteBookings.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      }
    }
})
export const { selectBook ,reset } = bookSlice.actions;
export default bookSlice.reducer;

