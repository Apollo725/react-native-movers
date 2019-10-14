const initialState = {
	isFetching: false,
	error: false
}

export default loginReducer = (state = initialState, action) => {
	if(action.item == 'LOGIN') {
		switch(action.type){
			case 'FETCHING_DATA': 
				return {
					...state,
					isFetching: true
				}
			case 'FETCHING_DATA_SUCCESS':
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
	else{
		return state;
	}
}