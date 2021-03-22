//--------------------------------------------------------------------< types >
interface PulseProps {
  x: string;
  y: string;
  gap: number;
  amount: number;
  color: string;
}
//================================================================[ < Pulse > ]
export function Pulse({ x, y, amount, gap, color }: PulseProps) {
  //----------------------------------------------------------------< methods >
  function drawPulses() {
    const pulses = [];

    for (let i = 1; i <= amount; i++) {
      pulses.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={gap * i + "rem"}
          strokeWidth="1"
          stroke={`var(--${color})`}
          fill="none"
        />
      );
    }

    return pulses;
  }
  //-----------------------------------------------------------------< return >
  return (
    <>
      <circle cx={x} cy={y} r="0.25rem" fill={`var(--${color})`} />
      {drawPulses()}
    </>
  );
}
