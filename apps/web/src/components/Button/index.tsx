export default function Button({ children, onClick, disabled }: any) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        'rounded bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700 disabled:opacity-50'
      }
    >
      {children}
    </button>
  );
}
