import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "../../axios";
import { jwtDecode } from "jwt-decode";

export const fetchRegister = createAsyncThunk("/auth/fetchRegister", async (params) => {
    const { data } = await axios.post("/users/", params);
    window.localStorage.setItem("token", data);
    return jwtDecode(data);
});

export const fetchAuth = createAsyncThunk("/auth/fetchAuth", async (params) => {
    const { data } = await axios.post("/users/login", params);
    window.localStorage.setItem("token", data);
    return jwtDecode(data);
});

export const fetchUpdateProfile = createAsyncThunk("/auth/fetchUpdateProfile", async (params) => {
    const { data } = await axios.put(`/users/${params.id}`, params)
    window.localStorage.setItem("token", data);
    return jwtDecode(data);
})

export const fetchAuthMe = createAsyncThunk("/auth/fetchAuthMe", async () => {
    const { data } = await axios.post("/users/auth");
    window.localStorage.setItem("token", data);
    return jwtDecode(data);
});

const initialState = {
    user: null,
    status: "loading",
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = "loading";
            window.localStorage.removeItem("token")
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchRegister.pending, (state) => {
            state.status = "loading";
            state.user = null;
        })
        .addCase(fetchRegister.fulfilled, (state, action) => {
            state.status = "loaded";
            state.user = action.payload;
        })
        .addCase(fetchRegister.rejected, (state) => {
            state.status = "error";
            state.user = null;
        })
        .addCase(fetchAuth.pending, (state) => {
            state.status = "loading";
            state.user = null;
        })
        .addCase(fetchAuth.fulfilled, (state, action) => {
            state.status = "loaded";
            state.user = action.payload;
        })
        .addCase(fetchAuth.rejected, (state) => {
            state.status = "error";
            state.user = null;
        })
        .addCase(fetchAuthMe.pending, (state) => {
            state.status = "loading";
            state.user = null;
        })
        .addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.status = "loaded";
            state.user = action.payload;
        })
        .addCase(fetchAuthMe.rejected, (state) => {
            state.status = "error";
            state.user = null;
        })
        .addCase(fetchUpdateProfile.pending, (state) => {
            state.status = "loading";
            // state.user = null;
        })
        .addCase(fetchUpdateProfile.fulfilled, (state, action) => {
            state.status = "loaded";
            state.user = action.payload;
        })
        .addCase(fetchUpdateProfile.rejected, (state) => {
            state.status = "error";
            state.user = null;
        })
    },
});



const selectIsAuth = (state) => Boolean(state.profile.user);
const authMe = (state) => state.profile.user;

export const selectProfileData = createSelector(
    [selectIsAuth, authMe],
    (IsAuth, userMe) => ({
        IsAuth,
        userMe,
    })
);

export const { logout } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;