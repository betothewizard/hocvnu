import logo from "/logo.png";
import "./app/index.css";

export const MaintenancePage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <img src={logo} alt="hocvnu" className="w-40"></img>
      <p className="mx-4 text-2xl">Website đang được bảo trì 😿🛠️</p>
    </div>
  );
};
