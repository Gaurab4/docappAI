import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import patientsReducer from './patientsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
