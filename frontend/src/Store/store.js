import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./Slices/profile";

const store = configureStore({
    reducer: {
        profile: profileReducer,
    },
});

export default store;
