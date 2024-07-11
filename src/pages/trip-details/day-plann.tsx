import { ReactNode } from "react";

interface DayPlanProps {
  day: string;
  dayNumber: number;
  activity?: ReactNode;
}

export default function DayPlan({ day, dayNumber, activity }: DayPlanProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex gap-2 items-baseline">
        <span className="text-zinc-300 text-xl font-semibold">
          Dia {dayNumber}
        </span>
        <span className="text-xs text-zinc-500">{day}</span>
      </div>
      {activity !== undefined ? (
        activity
      ) : (
        <p className="text-zinc-500 text-sm">
          Nenhuma atividade cadastrada nessa data
        </p>
      )}
    </div>
  );
}
