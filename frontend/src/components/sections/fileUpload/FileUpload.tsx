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
        <div className="flex flex-col items-start space-y-2">
        <button
            type="button"
            onClick={handleClick}
            className="rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-500"
        >
            파일 선택
        </button>
        <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
        />
        {fileName && <p className="text-sm text-gray-700">선택한 파일: {fileName}</p>}
        </div>
    );
};

export default FileUpload;
