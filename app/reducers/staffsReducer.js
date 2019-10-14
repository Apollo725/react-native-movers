const initialState = {
	data: [],
	isFetching: false,
	error: false
}

export default staffsReducer = (state = initialState, action) => {
	if(action.item == 'STAFFS') {
		switch(action.type){
			case 'TOGGLE_DATA': 
				return {
					...state,
					data: state.data.map(staff =>
			        (staff.name === action.id) 
			          ? {...staff, checked: !staff.checked}
			          : staff
			      )
				}

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