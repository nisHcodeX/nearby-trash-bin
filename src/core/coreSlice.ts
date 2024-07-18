import { createSlice } from "@reduxjs/toolkit";
import { Session } from "./interface";

interface CoreSlice {
    session: Session | undefined;
};

const getSession = (): Session | undefined => {
    const storeSession = localStorage.getItem('bin-ses');
    if (storeSession) return JSON.parse(storeSession)
    return undefined;
};

const initialState: CoreSlice = {
    session: getSession()
};

const coreSlice = createSlice({
    name: 'core', initialState, reducers: {
        getTrashBinSession() {
        },
        setTrashBinSession(state, action) {
            state.session = action.payload
        }
    }
});

export const { getTrashBinSession } = coreSlice.actions;
export default coreSlice.reducer;