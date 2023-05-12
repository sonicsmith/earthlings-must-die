export default function Button({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="rounded bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700"
    >
      {children}
    </button>
  );
}
