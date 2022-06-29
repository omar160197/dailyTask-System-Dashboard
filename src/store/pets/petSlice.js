import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { print } from "graphql";
import gql from "graphql-tag";

export const getUserPets=createAsyncThunk(
    'get/pets',
    async (userData,thunkAPI)=>{
        console.log(userData);
        const { rejectWithValue } = thunkAPI;
        const GET_USER_PETS=gql`
        mutation GetAllPets($getAllPets: GetAllPetsInput) {
            getAllPets(getAllPets: $getAllPets) {
              ownerId
              type
              breed
              size
              name
              _id
            }
          }
        `;
        const res = await axios.post("http://localhost:5000/", {
            query: print(GET_USER_PETS),
            variables: {
                getAllPets: {
                    ownerId: userData
                  }
            },
          });

          if (res.data.data.getAllPets !== null) {  
            return res.data.data.getAllPets;
          } else {
            console.log(res.data.errors[0].message);
            return rejectWithValue(res.data.errors[0].message);
          }
    }
    );
    
    export const getOnePet=createAsyncThunk(
      'get/pet',
      async (userData,thunkAPI)=>{
          console.log(userData);
          const { rejectWithValue } = thunkAPI;
          const GET_USER_PETS=gql`
          mutation GetOnePet($getOnePet: GetOnePetInput) {
            getOnePet(getOnePet: $getOnePet) {
              _id
              ownerId
              breed
              type
              size
              name
            }
          }
          `;
          const res = await axios.post("http://localhost:5000/", {
              query: print(GET_USER_PETS),
              variables: {
                getOnePet: {
                  petId: userData
                    }
              },
            });
  
            if (res.data.data.getOnePet !== null) {  
              return res.data.data.getOnePet;
            } else {
              console.log(res.data.errors[0].message);
              return rejectWithValue(res.data.errors[0].message);
            }
      }
      );


    export const updatePets=createAsyncThunk(
        'edit/pets',
        async (userData,thunkAPI)=>{
            console.log(userData.petId);
            const { rejectWithValue } = thunkAPI;
            const EDIT_USER_PETS=gql`
            mutation EditPet($editPetInput: EditPet) {
                editPet(editPetInput: $editPetInput) {
                  ownerId
                  _id
                  type
                  breed
                  size
                  name
                }
              }
            `;
            const res = await axios.post("http://localhost:5000/", {
                query: print(EDIT_USER_PETS),
                variables: {
                    editPetInput: {
                        petId: userData.petId,
                        type:userData.values.type,
                        breed:userData.values.breed,
                        size:userData.values.size,
                        name:userData.values.name,
                        ownerId:userData.ownerId
                      }
                },
              });
    
              if (res.data.data.editPet !== null) {
                return res.data.data.editPet;
              } else {
                console.log(res.data.errors[0].message);
                return rejectWithValue(res.data.errors[0].message);
              }
        }
        );


        export const updateAdminPets=createAsyncThunk(
          'edit/pets',
          async (userData,thunkAPI)=>{
              console.log(userData);
              const { rejectWithValue } = thunkAPI;
              const EDIT_USER_PETS=gql`
              mutation EditPet($editPetInput: EditPet) {
                  editPet(editPetInput: $editPetInput) {
                    ownerId
                    _id
                    type
                    breed
                    size
                    name
                  }
                }
              `;
              const res = await axios.post("http://localhost:5000/", {
                  query: print(EDIT_USER_PETS),
                  variables: {
                      editPetInput: {
                          petId: userData.petId,
                          type:userData.values.type,
                          breed:userData.values.breed,
                          size:userData.values.size,
                          name:userData.values.name,
                          ownerId:userData.ownerId  
                        }
                  },
                });
      
                if (res.data.data.editPet !== null) {
                  return res.data.data.editPet;
                } else {
                  console.log(res.data.errors[0].message);
                  return rejectWithValue(res.data.errors[0].message);
                }
          }
          );
  

        export const createPets=createAsyncThunk(
          'post/pets',
          async (userData,thunkAPI)=>{
              console.log(userData.petId);
              const { rejectWithValue } = thunkAPI;
              const ADD_USER_PETS=gql`
              mutation CreatePet($petInput: CreatePet) {
                createPet(petInput: $petInput) {
                  _id
                  ownerId
                  type
                  breed
                  size
                  name
                }
              }
              `;
              const res = await axios.post("http://localhost:5000/", {
                  query: print(ADD_USER_PETS),
                  variables: {
                    petInput: {
                          ownerId: userData.ownerId,
                          type:userData.values.type,
                          breed:userData.values.breed,
                          size:userData.values.size,
                          name:userData.values.name
                        }
                  },
                });
      
                if (res.data.data.createPet !== null) {
                  return res.data.data.createPet;
                } else {
                  console.log(res.data.errors[0].message);
                  return rejectWithValue(res.data.errors[0].message);
                }
          }
          );

          export const deletePets=createAsyncThunk(
            'post/pets',
            async (userData,thunkAPI)=>{
                console.log(userData.petId);
                const { rejectWithValue } = thunkAPI;
                const ADD_USER_PETS=gql`
                mutation DeletePet($deletePetInput: DeletePet) {
                  deletePet(deletePetInput: $deletePetInput) {
                    _id
                    ownerId
                    type
                    breed
                    size
                    name
                  }
                }
                `;
                const res = await axios.post("http://localhost:5000/", {
                    query: print(ADD_USER_PETS),
                    variables: {
                      deletePetInput: {
                        petId: userData.petId,
                        ownerId:userData.ownerId
                          }
                    },
                  });
        
                  if (res.data.data.deletePet !== null) {
                    return res.data.data.deletePet;
                  } else {
                    console.log(res.data.errors[0].message);
                    return rejectWithValue(res.data.errors[0].message);
                  }
            }
            );
    

    const initialState = {
        pets: [],
        pet:null,
        selectPet:null,
        isLoading: false,
        isError: null,
        message: null,
        isSuccess: false,
      };

export const petSlice=createSlice({
    name:"pets",
    initialState,
    reducers:{
        selectPet: (state,action) => {
            state.selectPet=action.payload
          },
          reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
          },
    },
    extraReducers:{
      [getUserPets.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [getUserPets.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.pets=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [getUserPets.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [getOnePet.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [getOnePet.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.pet=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [getOnePet.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [updatePets.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [updatePets.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.pets=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [updatePets.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [createPets.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [createPets.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.pets=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [createPets.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [deletePets.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [deletePets.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.pets=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [deletePets.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      }
    }
})
export const { selectPet ,reset } = petSlice.actions;
export default petSlice.reducer;