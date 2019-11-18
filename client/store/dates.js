import axios from 'axios'

const GET_DATES = 'GET_DATES'
const GET_NEW_DATES = 'GET_NEW_DATES'

const initialState = {
  dates: []
}

export const getDates = dates => ({
  type: GET_DATES,
  dates: dates
})

export const getNewDates = dates => {
  return {
    type: GET_NEW_DATES,
    dates: dates
  }
}

//thunks
export function fetchDates() {
  return async function thunk(dispatch) {
    try {
      const {data} = await axios.get('/api/dates')
      dispatch(getDates(data))
    } catch (error) {
      console.error('error in fetch dates thunk', error)
    }
  }
}

export function postDates(dates) {
  return async function thunk(dispatch) {
    try {
      const {data} = await axios.post('/api/dates', dates)
      dispatch(getNewDates(data))
    } catch (error) {
      console.error('error in post dates thunk', error)
    }
  }
}

const datesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATES:
      return {...state, dates: action.dates}
    case GET_NEW_DATES:
      return {...state, dates: [...state.dates, ...action.dates]}
    default:
      return state
  }
}
export default datesReducer
