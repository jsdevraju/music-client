import { FC } from "react";
import { BiCloudUpload } from "react-icons/bi";

interface IProps {
  setImageURL: (songImageUrl: string) => void;
  isLoading: (isImageLoading: boolean) => void;
  setProgress: (uploadProgress: number) => void;
  isImage: boolean;
}

const ImageUploader: FC<IProps> = ({
  setImageURL,
  isLoading,
  setProgress,
  isImage,
}) => {
  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            click to upload {isImage ? "image" : "audio"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-image"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className="w-0 h-0"
      />
    </label>
  );
};

export default ImageUploader;
