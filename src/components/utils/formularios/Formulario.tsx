"use client";

type FormularioProps = {
  children: React.ReactNode;
  OnSubmit: () => void
};

export function Formulario({ children, OnSubmit }: FormularioProps) {
  return (
    <form onSubmit={OnSubmit} className="max-w-full mx-auto w-full bg-white p-8 rounded-xl shadow-lg space-y-6 dark:text-black">
      {children}
    </form>
  );
}