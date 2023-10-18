import React from 'react';

export default function Button({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        'rounded bg-brand px-4 py-1 font-bold text-black hover:bg-teal-700 disabled:opacity-50'
      }
    >
      {children}
    </button>
  );
}
