import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import elevatorSlice from "./ElevatorState";
import { ElevatorSaga } from "./ElevatorSaga";

const sagaMiddleware = createSagaMiddleware();

export const Store = configureStore({
  reducer: {
    elevator: elevatorSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(ElevatorSaga);

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;
