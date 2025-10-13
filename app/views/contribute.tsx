import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/app/components/ui/dialog";
import { Uploader } from "~/app/components/ui/uploader";
import { uploadFiles } from "~/app/services/upload";
import { styles } from "~/app/styles";
import { getEnv } from "~/app/lib/utils";

export default function ContributePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleFileChange = (files: File[]) => {
    setFiles(files);
    setMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!files || files.length === 0) {
      setMessage("Vui lòng chọn tệp để tải lên.");
      return;
    }

    if (!turnstileToken) {
      setMessage("Vui lòng hoàn thành xác minh bảo mật.");
      return;
    }

    setUploading(true);

    try {
      await uploadFiles(files, turnstileToken);
      setShowSuccessDialog(true);
      setMessage("");
      setFiles([]);
      // Không reset token - giữ lại để upload lần sau
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Đã xảy ra lỗi trong quá trình tải lên.");
      }
      console.error("Upload error:", error);
      // Chỉ reset khi có lỗi
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Card>
            <CardHeader>
              <CardTitle>Đóng góp Tài liệu</CardTitle>
              <CardDescription>
                Chia sẻ tài liệu học tập cho các bạn khóa sau &lt;3
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Uploader
                  value={files}
                  onChange={handleFileChange}
                  disabled={uploading}
                  dropzoneOptions={{
                    maxSize: 1024 * 1024 * 100, // 100MB
                  }}
                />
                {!turnstileToken && (
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={getEnv("VITE_TURNSTILE_SITE_KEY")}
                    onSuccess={setTurnstileToken}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                  />
                )}
                <Button
                  type="submit"
                  disabled={
                    uploading || !files || files.length === 0 || !turnstileToken
                  }
                >
                  {uploading ? "Đang tải lên..." : "Tải lên"}
                </Button>
              </form>
              {message && (
                <p className="mt-4 text-sm text-destructive">{message}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tải lên thành công! 🎉</DialogTitle>
            <DialogDescription>
              Cảm ơn bạn đã đóng góp tài liệu cho cộng đồng HocVNU. Tài liệu của
              bạn sẽ được xem xét và phê duyệt trong thời gian sớm nhất.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccessDialog(false)}>Đóng</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
