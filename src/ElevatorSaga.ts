import { cancel, delay, put, take, takeLeading } from "typed-redux-saga";
import { $Elevator } from "./ElevatorState";

function* takeElevator(action: ReturnType<typeof $Elevator["callElevator"]>) {
  try {
    if (action.payload === "ready") {
      yield* put($Elevator.ElevatorOccupied());
      // you take the elevator
      yield* delay(5000);
      // you leave the elevator
      yield* put($Elevator.ElevatorFreed());
    }
  } catch (e) {
    yield* put($Elevator.ElevatorBroken(e));
  }
}

export function* ElevatorSaga() {
  yield* takeLeading($Elevator.start, function* () {
    yield* put($Elevator.Started());

    const task = yield* takeLeading($Elevator.callElevator, takeElevator);

    yield* take($Elevator.stop);

    yield* cancel(task);

    yield* put($Elevator.Stopped());
  });
}
