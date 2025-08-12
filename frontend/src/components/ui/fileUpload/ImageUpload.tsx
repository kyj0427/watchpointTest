import { useState } from "react";
import FileUpload from "./FileUpload";

interface Props {
    onFileChange: (file: File | null) => void;
} // 상위 컴포넌트로 onFileChange전달

const ImageUploader = ({ onFileChange }: Props) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (file: File) => {
        // 유효성 검사
        if (file.size > 5 * 1024 * 1024) {
        alert("최대 5MB 이하 이미지만 업로드할 수 있습니다.");
        return;
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
        alert("JPG, PNG, GIF 파일만 업로드할 수 있습니다.");
        return;
        }

        // 미리보기 생성
        const reader = new FileReader();
        reader.onload = () => {
        setImagePreview(reader.result as string);
        setSelectedFile(file);
        onFileChange(file); // 상위에 파일 전달
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = () => {
        setImagePreview(null);
        setSelectedFile(null);
        onFileChange(null);
    };

    return (
        <div className="space-y-2 mb-10">
        <label className="block text-sm font-medium text-gray-700 mb-10">이미지 업로드</label>

        {!imagePreview ? (
            <div
            className="upload-area h-[200px] rounded flex flex-col items-center justify-center cursor-pointer relative overflow-visible"
            >
            {/* FileUpload 버튼으로 트리거 */}
            <FileUpload onFileSelect={handleFileSelect} accept="image/jpeg, image/png, image/gif" />
            <p className="text-sm text-gray-500">JPG, PNG, GIF (최대 5MB)</p>
            </div>
        ) : (
            <div className="w-full h-[200px] relative border rounded overflow-hidden">
            <img
                src={imagePreview}
                alt="미리보기"
                className="w-full h-full object-contain"
            />
            <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            >
                <i className="ri-close-line text-gray-600 text-lg"></i>
            </button>
            </div>
        )}
        </div>
    );
};

export default ImageUploader;