import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/slice/userSlice'


export default configureStore({
  reducer: {
    user: userReducer,
  }
})