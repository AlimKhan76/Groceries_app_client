import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from "../features/apiSlice"

export const store = configureStore({
  reducer: { apiSlice },
})