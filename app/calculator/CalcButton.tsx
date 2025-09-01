import React from "react";

interface ButtonProps {
  label: string;                        // what the button shows
  onClick: (label: string) => void;     // click handler passes label back
  className?: string;                    // optional CSS class
  type?: "button" | "submit" | "reset"; // HTML button type
}

// Memoized button to avoid unnecessary re-renders
const CalcButton: React.FC<ButtonProps> =({ label, onClick, className }) => {
  return (
    <button className={className} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export const Button = React.memo(CalcButton)

