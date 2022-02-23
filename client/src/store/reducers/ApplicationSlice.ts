import { createSlice } from '@reduxjs/toolkit'
import {IApplication} from '../../models/IApplication'
import {applicationAPI} from '../../servicesAPI/ApplicationService'


interface ApplicationState {
  application: IApplication
  isLoading: boolean
  error: string
}

const initialState: ApplicationState = {
  application: {applications: [{ id: 0, pseudonym: '', createdAt: '', updatedAt: '', userId: 0 }] },
  isLoading: false,
  error: '',
}


export const applicationSlice = createSlice({
  name:'application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      applicationAPI.endpoints.getApplication.matchFulfilled,
      (state, { payload }) => {
        state.application = payload !== null ? payload : {applications: [{ id: 0, pseudonym: '', createdAt: '', updatedAt: '', userId: 0 }] }
      }
    )
  },
})

export default applicationSlice.reducer
