//------------------------------------------------------------------< helpers >
import { max, mod, sub, mult, norm } from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< types >
import { IVector } from "../../types/IVector";
import { IPulse } from "../../types/IPulse";
//====================================================[ < attachToCrossings > ]
export function attachToCrossings(
  cursor: IVector,
  crossings: IVector[],
  intensity: number
) {
  let nearest: IVector = max;
  let distCursorNearest: number = mod(sub(nearest, cursor));

  crossings.forEach((crossing) => {
    const distCursorCrossing = mod(sub(crossing, cursor));
    distCursorNearest = mod(sub(nearest, cursor));

    if (distCursorCrossing < distCursorNearest) nearest = crossing;
  });

  const lastCrossing = crossings[crossings.length - 1];
  if (lastCrossing) {
    const distCursorCrossing = mod(sub(lastCrossing, cursor));
    distCursorNearest = mod(sub(nearest, cursor));

    if (distCursorCrossing < distCursorNearest) nearest = lastCrossing;
  }

  return distCursorNearest > intensity ? cursor : nearest;
}
//=======================================================[ < attachToPulses > ]
export function attachToPulses(
  cursor: IVector,
  pulses: IPulse[],
  intensity: number
) {
  let nearest: IVector = max;
  let distCursorNearest: number = mod(sub(nearest, cursor));

  pulses.forEach((pulse) => {
    const distCursorOrigin = sub(pulse.origin, cursor);

    for (let i = 0; i <= pulse.amount; i++) {
      distCursorNearest = mod(sub(nearest, cursor));
      const radius = mult(norm(distCursorOrigin), pulse.gap * i);
      const distCursorCircle = mod(sub(distCursorOrigin, radius));

      if (distCursorCircle < distCursorNearest)
        nearest = sub(pulse.origin, radius);
    }
  });

  const lastPulse = pulses[pulses.length - 1];
  if (lastPulse) {
    const distCursorOrigin = sub(lastPulse.origin, cursor);
    distCursorNearest = mod(sub(nearest, cursor));
    const radius = mult(
      norm(distCursorOrigin),
      lastPulse.gap * lastPulse.amount
    );
    const distCursorCircle = mod(sub(distCursorOrigin, radius));

    if (distCursorCircle < distCursorNearest)
      nearest = sub(lastPulse.origin, radius);
  }

  return distCursorNearest > intensity ? cursor : nearest;
}
