export default function NumberInput({
  amount,
  setAmount,
}: {
  amount: number;
  setAmount: (amount: number) => void;
}) {
  return (
    <div className="flex">
      <button
        className="m-auto h-5 w-5 rounded-md bg-slate-700"
        onClick={() => {
          if (amount > 1) {
            setAmount(amount - 1);
          }
        }}
      >
        -
      </button>
      <div className="w-6 appearance-none bg-black text-center text-white">
        {amount}
      </div>
      <button
        className="m-auto h-5 w-5 rounded-md bg-slate-700"
        onClick={() => {
          setAmount(amount + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
