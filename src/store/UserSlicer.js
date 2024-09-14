import {
    createSlice
} from "@reduxjs/toolkit";
const UserSlicer = createSlice({
    name: 'User',
    initialState: {
        uid: '',
        email: '',
        password: ''
    },
    reducers: {
        savedata: (state, action) => {
            console.log('save data called', action);
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        cleardata: (state, action) => {
            console.log('clear data called', action);
            state.uid = '';
            state.email = '';
            state.password = '';
        }
    }
})
export const UserActions = UserSlicer.actions;
export default UserSlicer;