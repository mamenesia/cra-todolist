import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todolistReducer from '../features/todolist/todolistSlice';

export const store = configureStore({
	reducer: {
		todolist: todolistReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
