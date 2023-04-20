import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as actionTypes from "./actions";
import _ from "underscore"

export interface ICustomizationState {
  isOpen: string[];
  fontFamily: string;
  borderRadius: number;
  calendarView: "month" | "week" | "day";
  opened: boolean;
}

const initialState: ICustomizationState = {
  isOpen: [], // for active default menu
  fontFamily: `'Quicksand', sans-serif`,
  borderRadius: 14,
  calendarView: "month",
  opened: true,
}
const customizationReducer = createSlice({
  name: "customization",
  initialState: _.clone(initialState),
  reducers: {
    [actionTypes.RESET_CUSTOMIZATION_REDUCER_ACTION]: (state) => {
      // eslint-disable-next-line no-unused-vars
      state = _.clone(initialState)
    },
    [actionTypes.MENU_OPEN]: (state, action: PayloadAction<{ id: string }>) => {
      const id = action.payload.id;
      state.isOpen = [id]
    },
    [actionTypes.SET_MENU]: (state, action: PayloadAction<{ opened: boolean }>) => {
      state.opened = action.payload.opened
    },
    [actionTypes.SET_FONT_FAMILY]: (state, action: PayloadAction<{ fontFamily: string }>) => {
      state.fontFamily = action.payload.fontFamily;
    },
    [actionTypes.SET_BORDER_RADIUS]: (state, action: PayloadAction<{ borderRadius: number }>) => {
      state.borderRadius = action.payload.borderRadius;
    },
    REHYDRATE: (state, action: PayloadAction<any>) => {
      const rehydrated = (action && action.payload && action.payload.Account) || {}
      return { ...state, ...rehydrated }
    },
  }
});

export default customizationReducer.reducer;