import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, TrashBinRes } from "./interface";
import { RootState } from "@store/store";
import { TRASH_TYPES } from "@constant/index";

interface CoreSlice {
    binData: TrashBinRes[] | undefined;
    trashType: TRASH_TYPES | null
};

const initialState: CoreSlice = {
    binData: undefined,
    trashType: null
};

const coreSlice = createSlice({
    name: 'core', initialState, reducers: {
        setTrashBinList: (state, action: PayloadAction<TrashBinRes[]>) => {
            state.binData = action.payload;
        },
        setTrasType: (state, action: PayloadAction<TRASH_TYPES>) => {
            state.trashType = action.payload;
        },
    }
});

export const { setTrashBinList, setTrasType } = coreSlice.actions;
export const binListGetter = (state: RootState) => state.core.binData;
export const trashTypeGetter = (state: RootState) => state.core.trashType;
export default coreSlice.reducer;