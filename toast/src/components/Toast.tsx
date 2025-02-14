type ToastProps = {
  title: string;
  message: string;
};

export default function Toast({ title, message }: ToastProps) {
  return (
    <div className=" relative bg-orange-500 w-[300px] p-4 rounded-md group">
      <h2 className="font-bold text-xl">{title}</h2>
      <p>{message}</p>
      <div className=" absolute bottom-0 right-0 w-full  border-2 rounded-br-md rounded-bl-md animate-lifetime group-hover:animation-p"></div>
    </div>
  );
}
