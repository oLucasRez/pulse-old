//------------------------------------------------------------------< helpers >
import { max, mod, sub, mult, norm } from "./Vector.helper";
//--------------------------------------------------------------------< types >
import { Vector } from "../types/Vector.type";
import { Pulse } from "../types/Pulse.type";
//====================================================[ < attachToCrossings > ]
export function attachToCrossings(
  cursor: Vector,
  crossings: Vector[],
  intensity: number
) {
  let nearest: Vector = max;
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
  cursor: Vector,
  pulses: Pulse[],
  intensity: number
) {
  let nearest: Vector = max;
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
