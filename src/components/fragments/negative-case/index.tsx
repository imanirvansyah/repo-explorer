
export const NegativeCase: React.FC<{
  title: string;
  subtitle: string;
  image: string;
}> = ({ title, subtitle, image }) => {
  return (
    <div className="p-4 flex flex-col items-center justify-center text-center ">
      <img src={image} alt="" className="w-52 h-52" />
      <h1 className="text-xl font-semibold mb-2 mt-4">{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}