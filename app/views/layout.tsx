import { Outlet, useNavigation } from "react-router";
import { Navbar } from "../components/navbar";
import { styles } from "../styles";
import { BProgress } from "@bprogress/core";
import "../styles/bprogress.css";

export default function AppLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  if (isNavigating) BProgress.start();
  else BProgress.done();
  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col">
      <div className={`${styles.paddingX} ${styles.flexCenter} `}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      {/* Main Content */}
      <div className="grow">
        <Outlet />
      </div>

      {/* Footer */}
      <div className="w-full flex justify-center">
        <div className="w-3/4">@betothewizard</div>
      </div>
    </div>
  );
}
