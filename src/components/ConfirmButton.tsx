'use client';

import type { ReactNode } from 'react';

// A submit button that asks "are you sure?" first. Used for removals in /admin.
export default function ConfirmButton({
  question,
  className,
  children,
}: {
  question: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(event) => {
        if (!window.confirm(question)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
