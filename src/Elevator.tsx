import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { $Elevator, $elevatorSlice } from "./ElevatorState";
import { formatDistance } from "date-fns";

export const Elevator: FC = () => {
  const dispatch = useAppDispatch();
  const elevatorStatusHistory = useAppSelector($elevatorSlice.selector.history);
  const elevatorCurrentStatus = useAppSelector($elevatorSlice.selector.status);

  useEffect(() => {
    dispatch($Elevator.start());
    return () => {
      dispatch($Elevator.stop());
    };
  }, [dispatch]);

  return (
    <>
      <button
        style={{ marginLeft: 25, marginTop: 40 }}
        onClick={() => {
          dispatch($Elevator.callElevator(elevatorCurrentStatus));
        }}
      >
        Take elevator
      </button>
      <ul>
        <div style={{ marginBottom: 15 }}>
          The elevator is now <strong>{elevatorCurrentStatus}</strong>.
        </div>
        {elevatorStatusHistory.map((history, index) => (
          <li key={index} style={{ marginBottom: 15 }}>
            The elevator was <i>{history.status}</i>{" "}
            {formatDistance(history.timestamp, Date.now(), {
              includeSeconds: true
            })}{" "}
            ago.
          </li>
        ))}
      </ul>
    </>
  );
};
