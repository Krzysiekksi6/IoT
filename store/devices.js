import {createSlice} from '@reduxjs/toolkit';

const devicesSlice = createSlice({
  name: 'devices',
  initialState: {
    devicesArray: [],
  },
  reducers: {
    addDevice: (state, action) => {
      const item = {
        id: action.payload.id,
        name: action.payload.name,
        place: action.payload.place,
        command: action.payload.command,
        color: action.payload.color,
      };
      state.devicesArray.push(item);
    },
  },
});
export const addDevice = devicesSlice.actions.addDevice;
export default devicesSlice.reducer;
