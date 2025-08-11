import { useRef, useState } from "react";

type FileUploaderProps = {
    onFileSelect: (file: File) => void;
    // 웹단에서 파일 받아오는 부분
    // onUpload: (files: File[]) => void; // 여러 파일 올릴 시 배열로 변경
    accept?: string;
};

const FileUpload: React.FC<FileUploaderProps> = ({ onFileSelect, accept }) => {
    // accept로 해당 화면에서 받을 파일 유형 컴포넌트쪽에서 선택해줘야 함
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // 첫번째 파일 가져옴(여러 개 선택 허용 시 input에서 multiple속성 추가)
        if (file) {
        setFileName(file.name);
        // 파일 이름 저장
        onFileSelect(file);
        // 파일 선택
        }
    };

// 파일 여러 개 업로드할 시
// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//         const fileArray = Array.from(files);
//         setFileName(fileArray.map((f) => f.name).join(", "));
//         onUpload(fileArray);
//     }
// };


    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4 mb-8">
            <div
            className="upload-area h-[200px] rounded-lg flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-500 hover:border-orange-400 relative overflow-hidden transition-all duration-300 bg-gray-800/50 hover:bg-gray-700/50"
            onClick={handleClick}
            onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) {
                setFileName(file.name);
                onFileSelect(file);
                }
            }}
            onDragOver={(e) => e.preventDefault()}
            >
            {/* 숨겨진 input */}
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />

                {!fileName ? (
                    <div className="flex flex-col items-center justify-center text-gray-300 px-6 w-full max-w-md mx-auto">
                        {/* 아이콘 */}
                        <div className="w-12 h-12 mb-4 text-orange-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-full h-full"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4"
                                />
                            </svg>
                        </div>

                        {/* 안내 텍스트 */}
                        <p className="text-sm text-gray-300 mb-1 text-center break-words leading-relaxed">파일을 드래그하거나 클릭하여 업로드</p>
                        <p className="text-xs text-gray-400 text-center break-words leading-relaxed">최대 5MB · 모든 파일 형식 지원</p>
                    </div>
                ) : (
                    <div className="text-center px-6 w-full max-w-md mx-auto">
                        <div className="w-8 h-8 mb-3 mx-auto text-green-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-full h-full"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-300 break-words leading-relaxed">
                            선택한 파일: <strong className="text-white">{fileName}</strong>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
