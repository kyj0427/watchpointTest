import { useState } from "react";
import FileUpload from "./FileUpload";

interface Props {
    onFileChange: (file: File | null) => void;
} // 상위 컴포넌트로 onFileChange전달

const VideoUploader = ({ onFileChange }: Props) => {
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (file: File) => {
        // 유효성 검사: 용량 제한
        if (file.size > 100 * 1024 * 1024) {
            alert("최대 100MB 이하 비디오만 업로드할 수 있습니다.");
            return;
        }

        // 유효성 검사: 형식 제한
        const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
        if (!allowedTypes.includes(file.type)) {
            alert("MP4, WebM, OGG 형식만 업로드할 수 있습니다.");
            return;
        }

        // 미리보기 URL 생성
        const videoURL = URL.createObjectURL(file);
        setVideoPreview(videoURL);
        setSelectedFile(file);
        onFileChange(file); // 상위에 파일 전달
    };

    // 파일 제거
    const handleRemove = () => {
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview); // 메모리 해제
        }
        setVideoPreview(null);
        setSelectedFile(null);
        onFileChange(null);
    };

    return (
        <div className="space-y-4 mb-10">
            <label className="block text-sm font-medium text-gray-700">영상 업로드</label>

            {!videoPreview ? (
                <div className="h-[250px] rounded border border-dashed border-gray-400 relative overflow-hidden">
                    <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                        <FileUpload
                            onFileSelect={handleFileSelect}
                            accept="video/mp4, video/webm, video/ogg"
                        />
                        <p className="text-sm text-gray-500 mt-3">MP4, WebM, OGG (최대 100MB)</p>
                    </div>
                </div>
            ) : (
                <div className="w-full relative border rounded overflow-hidden">
                    <video
                        src={videoPreview}
                        controls
                        className="w-full max-h-[300px] object-contain bg-black"
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

export default VideoUploader;
