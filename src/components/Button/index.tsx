export default function Button({ children }: any) {
  return (
    <button className="w-32 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
      {children}
    </button>
  );
}
