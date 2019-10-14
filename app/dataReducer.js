const initialState = {
	data: [],
	isFetching: false,
	error: false
}

export default dataReducer = (state = initialState, action) => {
	switch(action.type){
		case 'FETCHING_DATA': 
			return {
				...state,
				data: [],
				isFetching: true
			}
		case 'FETCHING_DATA_SUCCESS':
			if(action.data)
				return {
					...state,
					data: action.data,
					isFetching: false,
					error: null
				}
			else
				return {
					...state,
					isFetching: false
				}
		case 'FETCHING_DATA_ERROR':
			return {
				...state,
				error: action.error,
				isFetching: false
			}
		case 'FETCHING_DATA_FAILURE': 
			return {
				...state,
				error: 'Server Error',
				isFetching: false
			}
		default:
			return state
	}
}