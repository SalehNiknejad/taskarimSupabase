"use client";
import { FlagIcon } from "lucide-react";

function PriorityFlags({ priority }: { priority: number }) {
  return (
    <>
      {Array.from({ length: priority }, (_, index) => (
        <FlagIcon
          key={index}
          size={16}
          color={colorSelector(priority)}
          strokeWidth={3.5}
        />
      ))}
    </>
  );
}

const colorSelector = (priority: number) => {
  const BG_COLOR = {
    0: "",
    1: "green",
    2: "orange",
    3: "red",
  } as any;
  return BG_COLOR[priority];
};

export default PriorityFlags;
