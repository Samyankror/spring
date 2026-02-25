import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    currUser : null,
    error:null,
    loading : false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart : (state)=>{
            state.loading = true
        },
        signInSuccess : (state,action)=>{
              state.currUser =  action.payload,
              state.loading = false
              state.error = null;
        },
        signInFailure : (state,action)=>{
           state.loading = false;
           state.error = action.payload;
        },
        signOutSuccess: (state)=>{
            state.currUser = null;
        },
        updateSuccess:(state,action)=>{
            state.currUser = action.payload
        }

    }
})

export const {signInStart, signInSuccess, signInFailure, signOutSuccess,updateSuccess} = userSlice.actions;
export default userSlice.reducer 