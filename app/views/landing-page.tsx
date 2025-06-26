import { Link } from "react-router";
import { styles } from "../styles";
import { Button } from "~/components/ui/button";

export default function LandingPage() {
  return (
    <div className={`${styles.flexStart} ${styles.paddingY}`}>
      <div className={`${styles.boxWidth}`}>
        <div className={`${styles.flexStart} flex-1 flex-col px-6 sm:px-16`}>
          <div className="flex flex-row">
            <h1 className="h-[100px] max-w-[280px] text-5xl font-bold font-serif sm:h-[60px] sm:max-w-full md:h-[80px] md:text-6xl lg:h-[100px] lg:text-7xl">
              HocVNU
            </h1>
          </div>

          <p className="sm:mt-0 sm:max-w-full text-xl md:text-2xl lg:text-3xl">
            Ôn tập môn học <b>Nhà nước và pháp luật đại cương</b> (ĐHQGHN) với{" "}
            <b>80+</b> câu hỏi trắc nghiệm được sưu tầm.
          </p>
          <div className="mt-10 flex flex-row items-center gap-5">
            <Button asChild>
              <Link to="/tai-lieu">Tìm tài liệu</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/trac-nghiem">Ôn tập trắc nghiệm</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
