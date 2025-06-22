import { CircleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

interface DialogProps {
  showWarning: boolean;
  setShowWarning: React.Dispatch<React.SetStateAction<boolean>>;
  currentQuestionsLength: number;
}
export const CustomDialog = (props: DialogProps) => {
  return (
    <Dialog open={props.showWarning} onOpenChange={props.setShowWarning}>
      <DialogContent className="flex max-w-md flex-col items-center space-y-4 rounded-xl border-2 border-black bg-white p-10">
        <CircleAlert size={50}></CircleAlert>
        <DialogDescription className="text-center text-lg">
          Bạn cần làm đủ {props.currentQuestionsLength} câu trên trang này để
          kiểm tra kết quả
        </DialogDescription>
        <Button
          className="text-md mt-5 rounded-xl border border-[#ef8e1e]/50 bg-[#f7b136] px-6 py-2 text-gray-50 hover:bg-[#f7b136]/90"
          onClick={() => props.setShowWarning(false)}
        >
          Tiếp tục làm
        </Button>
      </DialogContent>
    </Dialog>
  );
};
