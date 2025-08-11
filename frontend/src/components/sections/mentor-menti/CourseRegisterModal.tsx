import { Modal } from "@/components/ui";
import { useState } from "react";
import CourseRegister from "./CourseRegister";

const CourseRegisterModal = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [openModal, setOpenModal] = useState<null | boolean>(null);

    return(
        <div>

        <div>
            {/* Buttons */}
            <div className="mt-30 flex flex-col items-center justify-center gap-y-4">
                <button
                    onClick={() => setOpenModal(true)}
                    className="rounded-md bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-lg font-semibold 
                    text-white shadow-lg hover:from-orange-400 hover:to-amber-400 focus-visible:outline-orange-500 transition-all duration-300 transform hover:scale-105"
                >
                    강의 등록하기
                </button>
            </div>
        </div>
        {openModal !== null && (
        <Modal open={openModal !== null} onClick={() => setOpenModal(true)}>
            <div
            className="relative bg-b-neutral-3 py-5 px-16 md:w-[700px] sm:w-[400px] xsm:w-[320px] w-[280px] rounded-20 overflow-hidden max-h-[80vh] flex flex-col"
            onClick={e => e.stopPropagation()} // 모달 바깥 클릭시 닫히도록 할 때 내부 클릭은 막기
            >
            <button
                onClick={() => setOpenModal(null)}
                className="absolute top-3 right-3 flex items-center justify-center icon-32 bg-b-neutral-3 text-w-neutral-2 hover:text-primary transition-1 icon-24"
            >
                <i className="ti ti-circle-x"></i>
            </button>
            <div className="overflow-y-auto scrollbar-sm flex-1 pr-2 pt-5">
                <h3 className="heading-3 text-white mb-3 text-center">강의 등록</h3>
                <form className="flex flex-col h-full" method="post">
                <CourseRegister />
                <div className="flex justify-center mt-auto py-4">
                    <button type="submit" className="btn btn-md btn-primary rounded-12">
                    등록하기
                    </button>
                </div>
                </form>
            </div>
            </div>
        </Modal>
        )}
    </div>
    )
}

export default CourseRegisterModal