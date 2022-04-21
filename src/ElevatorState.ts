import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";

type Status = "busy" | "ready" | "out of service";

interface ElevatorState {
  error: unknown | null;
  status: Status;
  history: Array<{ status: Status; timestamp: number }>;
}

const initialState: ElevatorState = {
  error: null,
  status: "ready",
  history: []
};

const elevatorSlice = createSlice({
  name: "ElevatorSaga",
  initialState,
  reducers: {
    start: (state) => state,
    stop: (state) => state,
    callElevator: (state, command: PayloadAction<Status>) => state,
    Started: (state) => state,
    Stopped: () => initialState,
    ElevatorFreed: (state) => ({
      ...state,
      status: "ready",
      error: null,
      history: [
        { status: state.status, timestamp: Date.now() },
        ...state.history
      ]
    }),
    ElevatorOccupied: (state) => ({
      ...state,
      status: "busy",
      error: null,
      history: [
        { status: state.status, timestamp: Date.now() },
        ...state.history
      ]
    }),
    ElevatorBroken: (state, event: PayloadAction<unknown>) => ({
      ...state,
      status: "out of service",
      error: event.payload,
      history: [
        { status: state.status, timestamp: Date.now() },
        ...state.history
      ]
    })
  }
});

export const $Elevator = elevatorSlice.actions;

export const $elevatorSlice = {
  selector: {
    status: (state: RootState) => state.elevator.status,
    history: (state: RootState) => state.elevator.history
  }
};

export default elevatorSlice.reducer;
