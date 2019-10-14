import { 
	login, 
	mymoves, 
	movedetails, 
	mymails,
	staffs,
	compose 
} from '../api';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'

export const getData = (item) => {
	return {
		type: 'FETCHING_DATA',
		item
	}
}

export const getDataSuccess = (item, data = null) => {
	return {
		type: 'FETCHING_DATA_SUCCESS',
		item,
		data
	}
}

export const getDataError = (item, error) => {
	return {
		type: 'FETCHING_DATA_ERROR',
		item,
		error
	}
}

export const getDataFailure = () => {
	return {
		type: 'FETCHING_DATA_FAILURE',
		item
	}
}

export const toggleStaff = (id) => {
	return {
		type: 'TOGGLE_DATA',
		item: 'STAFFS',
		id
	}
}

export const loginAction = (data) => {
	return (dispatch) => {
		dispatch(getData('LOGIN'));
		login(data)
			.then( async (response) => {
				console.log(response);
				if (response.status =='ok') {
					dispatch(getDataSuccess('LOGIN'));
					await AsyncStorage.setItem('access_token', response.token);
					dispatch(NavigationActions.navigate({ routeName: 'MyMoves' }));
				}
				else {
					dispatch(getDataError('LOGIN', response.error))
				}
			})
			.catch((err) => {
				console.log(err)
				dispatch(getDataFailure('LOGIN'))
			})
	}
}

export const myMovesAction = () => {
	return (dispatch) => {
		dispatch(getData('MOVES'));
		AsyncStorage.getItem('access_token', (err, token) => {
			mymoves(token)
				.then((response) => {
					console.log(response);
					if (response.status =='ok') {
						dispatch(getDataSuccess('MOVES',response.move_records));
					}
					else {
						dispatch(getDataSuccess('MOVES'));
						AsyncStorage.removeItem('access_token', (err, token) => {
							dispatch(NavigationActions.navigate({ routeName: 'Login' }));
						});
					}
				})
				.catch((err) => {
					console.log(err)
					dispatch(getDataFailure('MOVES'))
				})
		})
	}
}

export const moveDetailsAction = (id) => {
	return (dispatch) => {
		dispatch(getData('MOVEDETAIL'));
		AsyncStorage.getItem('access_token', (err, token) => {
			movedetails(token, id)
				.then((response) => {
					console.log(response);
					if (response.status =='ok') {
						dispatch(getDataSuccess('MOVEDETAIL', response))
					}
					else {
						AsyncStorage.removeItem('access_token', (err, token) => {
							dispatch(NavigationActions.navigate({ routeName: 'Login' }));
						});
					}
				})
				.catch((err) => {
					console.log(err)
					dispatch(getDataFailure('MOVEDETAIL'))
				})
		})
	}
}

export const myMailsAction = (id) => {
	return (dispatch) => {
		dispatch(getData('MAILS'));
		AsyncStorage.getItem('access_token', (err, token) => {
			mymails(token, id)
				.then((response) => {
					console.log(response);
					if (response.status =='ok') {
						dispatch(getDataSuccess('MAILS', response))
					}
					else {
						AsyncStorage.removeItem('access_token', (err, token) => {
							dispatch(NavigationActions.navigate({ routeName: 'Login' }));
						});
					}
				})
				.catch((err) => {
					console.log(err)
					dispatch(getDataFailure('MAILS'))
				})
		})
	}
}

export const getStaffsAction = () => {
	return (dispatch) => {
		dispatch(getData('STAFFS'));
		AsyncStorage.getItem('access_token', (err, token) => {
			staffs(token)
				.then((response) => {
					console.log(response);
					if (response.status =='ok') {
						dispatch(getDataSuccess('STAFFS', response.staffs))
					}
					else {
						AsyncStorage.removeItem('access_token', (err, token) => {
							dispatch(NavigationActions.navigate({ routeName: 'Login' }));
						});
					}
				})
				.catch((err) => {
					console.log(err)
					dispatch(getDataFailure('STAFFS'))
				})
		})
	}
}

export const composeAction = (data) => {
	return (dispatch) => {
		dispatch(getData('COMPOSE'));
		AsyncStorage.getItem('access_token', (err, token) => {
			compose(token, data)
				.then((response) => {
					console.log(response);
					if (response.status =='ok') {
						dispatch(getDataSuccess('COMPOSE', response))
					}
					else {
						console.log('compose error');
					}
				})
				.catch((err) => {
					console.log(err)
					dispatch(getDataFailure('COMPOSE'))
				})
		})
	}
}