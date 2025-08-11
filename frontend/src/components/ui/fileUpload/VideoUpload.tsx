import { useState } from "react";
import FileUpload from "./FileUpload";

interface Props {
    onFileChange: (file: File | null | { type: 'url', url: string, platform: string }) => void;
} // 상위 컴포넌트로 onFileChange전달

const VideoUploader = ({ onFileChange }: Props) => {
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // url
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [urlPreview, setUrlPreview] = useState<string | null>(null);

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
        setVideoUrl(""); // URL 입력값 초기화
        setUrlPreview(null); // URL 미리보기 초기화
        onFileChange(null);
    };

    // YouTube URL에서 video ID 추출
    const extractYouTubeId = (url: string): string | null => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    // URL 제출 처리
    const handleUrlSubmit = () => {
        if (!videoUrl.trim()) {
            alert("YouTube URL을 입력해주세요.");
            return;
        }

        const videoId = extractYouTubeId(videoUrl);
        if (!videoId) {
            alert("올바른 YouTube URL을 입력해주세요.");
            return;
        }

        const processedUrl = `https://www.youtube.com/watch?v=${videoId}`;

        // 기존 파일 선택 해제
        handleRemove();

        // URL 미리보기 설정
        setUrlPreview(processedUrl);

        // 상위 컴포넌트에 URL 전달
        onFileChange({ type: 'url', url: processedUrl, platform: 'youtube' });
    };

    return (
        <div className="space-y-4 mb-10">
            <label className="block text-sm font-medium text-gray-700">영상 업로드</label>

            {/* 파일 업로드 섹션 - URL이 선택되지 않았을 때만 표시 */}
            {!urlPreview && (
                <>
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
                                className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-md w-4 h-4 flex items-center justify-center hover:bg-gray-300"
                            >
                                <i className="ti ti-x text-gray-600 text-sm items-center justify-center"></i>
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* 구분선 - 파일과 URL 모두 선택되지 않았을 때만 표시 */}
            {!videoPreview && !urlPreview && (
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-b-neutral-3 text-gray-500">또는</span>
                    </div>
                </div>
            )}

            {/* URL 입력 섹션 - 파일이 선택되지 않았을 때만 표시 */}
            {!videoPreview && (
                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-600">YouTube URL 입력</h4>
                    
                    {/* URL 입력 */}
                    <div className="flex gap-2">
                        <input
                            type="url"
                            placeholder="YouTube 동영상 URL을 입력하세요"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 text-gray-300 bg-gray-800 rounded-md text-sm"
                        />
                        <button
                            onClick={handleUrlSubmit}
                            disabled={!videoUrl.trim()}
                            className="btn btn-md btn-primary rounded-12"
                        >
                            추가
                        </button>
                    </div>
                    
                    {/* URL 미리보기 */}
                    {urlPreview && (
                        <div className="w-full relative border rounded overflow-hidden">
                            <div className="p-4">
                                <p className="text-sm text-gray-600 mb-2">입력된 YouTube URL:</p>
                                <p className="text-sm text-gray-300 break-all">{urlPreview}</p>
                            </div>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-md w-4 h-4 flex items-center justify-center hover:bg-gray-300"
                            >
                                <i className="ti ti-x text-gray-600 text-sm items-center justify-center"></i>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoUploader;
