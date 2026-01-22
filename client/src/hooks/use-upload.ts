import { useState, useCallback } from "react";

interface UploadResponse {
  success: boolean;
  filePath: string;
  filename: string;
  originalName: string;
  size: number;
}

interface UseUploadOptions {
  onSuccess?: (response: UploadResponse) => void;
  onError?: (error: Error) => void;
}

export function useUpload(options: UseUploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadFile = useCallback(
    async (file: File): Promise<UploadResponse | null> => {
      setIsUploading(true);
      setError(null);
      setProgress(0);

      try {
        setProgress(10);
        
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch("/api/uploads", {
          method: "POST",
          body: formData,
        });

        setProgress(80);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to upload file");
        }

        const uploadResponse = await response.json();
        setProgress(100);
        options.onSuccess?.(uploadResponse);
        return uploadResponse;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Upload failed");
        setError(error);
        options.onError?.(error);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [options]
  );

  const getUploadParameters = useCallback(
    async (): Promise<{
      method: "POST";
      url: string;
      fieldName: string;
    }> => {
      return {
        method: "POST",
        url: "/api/uploads",
        fieldName: "file",
      };
    },
    []
  );

  return {
    uploadFile,
    getUploadParameters,
    isUploading,
    error,
    progress,
  };
}
