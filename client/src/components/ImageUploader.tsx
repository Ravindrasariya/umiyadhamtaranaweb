import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { useUpload } from "@/hooks/use-upload";

interface ImageUploaderProps {
  currentImageUrl?: string;
  onImageUploaded: (objectPath: string) => void;
  onImageRemoved?: () => void;
  accept?: string;
  maxSize?: number;
  placeholder?: string;
  className?: string;
}

export function ImageUploader({
  currentImageUrl,
  onImageUploaded,
  onImageRemoved,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
  placeholder = "Click to upload image",
  className = "",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  
  useEffect(() => {
    setPreview(currentImageUrl || null);
  }, [currentImageUrl]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadFile, isUploading } = useUpload({
    onSuccess: (response) => {
      onImageUploaded(response.objectPath);
      setError(null);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    await uploadFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageRemoved?.();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        data-testid="input-image-upload"
      />

      {preview ? (
        <div className="relative group">
          <div className="w-full h-32 rounded-md overflow-hidden bg-muted">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
              data-testid="img-upload-preview"
            />
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={handleClick}
              disabled={isUploading}
              data-testid="button-change-image"
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="destructive"
              onClick={handleRemove}
              disabled={isUploading}
              data-testid="button-remove-image"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          disabled={isUploading}
          className="w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-md flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-muted/50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-upload-image"
        >
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
          ) : (
            <>
              <Upload className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{placeholder}</span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-sm text-destructive mt-1" data-testid="text-upload-error">
          {error}
        </p>
      )}
    </div>
  );
}
