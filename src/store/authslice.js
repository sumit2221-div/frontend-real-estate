import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedin : false,
    user : null,
    accessToken : null

}

const authslice = createSlice({
    name : "auth",
    initialState,
    reducers : {

        login : (state,action)=> {
            state.isLoggedin = true;
            state.user = action.payload.user; 
            state.accessToken = action.payload.accessToken;
        },
        logout : (state) => {
            state.isLoggedin = false;
            state.user = null;
            state.accessToken = null;
        }

    }
})

export const { login, logout } = authslice.actions;

export default authslice.reducer;