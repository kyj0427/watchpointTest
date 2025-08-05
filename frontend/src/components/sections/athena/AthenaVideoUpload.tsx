import React, { useState } from "react";
import FileUpload from "../fileUpload/FileUpload";

const AthenaVideoUpload = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = async () => {
        if (!selectedFile) {
            alert("파일을 먼저 선택해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("/api/ai-process-video", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            console.log("서버 응답:", data);
        } catch (error) {
            console.error("업로드 실패:", error);
        }
    };


    return (
        <div className="space-y-4">
            <FileUpload onFileSelect={(file) => setSelectedFile(file)} accept="video/*" />
            <button
                onClick={handleSubmit}
                className="rounded-md bg-green-600 text-white px-4 py-2 hover:bg-green-500"
            >
                제출하기
            </button>
        </div>
    );
};

export default AthenaVideoUpload;
