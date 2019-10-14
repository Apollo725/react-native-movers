const initialState = {
	data: [],
	isFetching: false,
	error: false
}

export default moveDetailsReducer = (state = initialState, action) => {
	if(action.item == 'MOVEDETAIL') {
		switch(action.type){
			case 'FETCHING_DATA': 
				return {
					...state,
					data: [],
					isFetching: true
				}
			case 'FETCHING_DATA_SUCCESS':
				return {
					...state,
					data: action.data,
					isFetching: false,
					error: null
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
	else {
		return state;
	}
}