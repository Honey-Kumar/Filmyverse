import { createSlice } from "@reduxjs/toolkit";

const PaymentSlicer = createSlice({
    name: 'Paymentreceipt',
    initialState: {
        refrencenumber: '',
        amt: '',
        status: '',
        method: '',
        datetime: ''
    },
    reducers: {
        savereceipt: (state, action) => {
            console.log('receipt slicer is called', action);
            state.refrencenumber = action.payload.refrencenumber
            state.amt = action.payload.amount
            state.status = action.payload.status
            state.method = action.payload.method
            state.datetime = action.payload.datetime
        }
    }
})

export const PaymentSlicerAction = PaymentSlicer.actions;
export default PaymentSlicer