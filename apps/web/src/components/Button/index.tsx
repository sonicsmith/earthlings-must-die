const teal = '#81E6D9';

export default function Button({ children, onClick, disabled }: any) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        'rounded bg-teal-500 px-4 py-1 font-bold text-black hover:bg-teal-700 disabled:opacity-50'
      }
    >
      {children}
    </button>
  );
}
