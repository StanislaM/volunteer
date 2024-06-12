import { ILoginData } from "@/shared/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const authorizeByLoginData = createAsyncThunk(
    "user/authorizeByLoginData",
    async (loginData: ILoginData, thunkAPI) => {
        const response = await axios.post(
            "/api/auth/login",
            {
                email: loginData.email,
                password: loginData.password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            },
        );

        return response;
    },
);

export const autoLogin = createAsyncThunk(
    "user/autoLogin",
    async (thunkAPI) => {
        const response = await axios.get("/api/user/me", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        return response;
    },
);

export interface IUserState {
    status: "unauthorized" | "authorizating" | "authorized";
    firstName: string | undefined;
    lastName: string | undefined;
    volunteer: string | null;
}

const initialState: IUserState = {
    status: "unauthorized",
    firstName: undefined,
    lastName: undefined,
    volunteer: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "unauthorized";
            state.firstName = "";
            state.lastName = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorizeByLoginData.fulfilled, (state, action) => {
                state.firstName = action.payload.data.firstName;
                state.lastName = action.payload.data.lastName;
                state.volunteer = action.payload.data.volunteer;
                state.status = "authorized";
            })
            .addCase(authorizeByLoginData.pending, (state, action) => {
                state.status = "authorizating";
            })
            .addCase(authorizeByLoginData.rejected, (state, action) => {
                state.firstName = "";
                state.lastName = "";
                state.volunteer = null;
                state.status = "unauthorized";
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                console.log(action.payload);

                state.firstName = action.payload.data.firstName;
                state.lastName = action.payload.data.lastName;
                state.volunteer = action.payload.data.volunteer;
                state.status = "authorized";
            })
            .addCase(autoLogin.pending, (state, action) => {
                state.status = "authorizating";
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.firstName = "";
                state.lastName = "";
                state.volunteer = null;
                state.status = "unauthorized";
            });
    },
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
