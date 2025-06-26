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
    <div className="min-h-screen w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <Outlet />
      <div className="w-full flex justify-center">
        <div className="w-3/4">
          <script src="https://cdn.indieboosting.com/latest/script.js?id=UGKWF0KELS&direction=horizontal&theme=light&noBorder=true"></script>
        </div>
      </div>
    </div>
  );
}
