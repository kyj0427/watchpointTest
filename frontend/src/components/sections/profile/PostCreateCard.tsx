"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import profileCover2 from "@public/images/photos/profileCover2.png";
import user33 from "@public/images/users/user33.png";

interface ProfileFormData {
  coverPhoto: FileList;
  profilePhoto: FileList;
  first_name: string;
  last_name: string;
  email: string;
  about: string;
  location: string;
  working: string;
  relationship: string;
}

const  PostCreateCard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>();

  // Watch file input fields for changes
  const coverPhotoFile = watch("coverPhoto");
  const profilePhotoFile = watch("profilePhoto");

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  // Update cover photo preview when a new file is selected
  useEffect(() => {
    if (coverPhotoFile && coverPhotoFile.length > 0) {
      const file = coverPhotoFile[0];
      const objectUrl = URL.createObjectURL(file);
      setCoverPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setCoverPreview(null);
    }
  }, [coverPhotoFile]);

  // Update profile photo preview when a new file is selected
  useEffect(() => {
    if (profilePhotoFile && profilePhotoFile.length > 0) {
      const file = profilePhotoFile[0];
      const objectUrl = URL.createObjectURL(file);
      setProfilePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setProfilePreview(null);
    }
  }, [profilePhotoFile]);

  const onSubmit = (data: ProfileFormData) => {
    console.log("Form Data:", data);
    // For file inputs, you can access the files via:
    // data.coverPhoto[0] and data.profilePhoto[0]
  };

  return (
    <section className="section-py-20">
      <div className="container pt-30p">
        <form onSubmit={handleSubmit(onSubmit)}>
          

          <div className="relative flex flex-col items-center mt-16">
  {/* 프로필 이미지 영역 */}
  <div className="relative w-[300px] h-[300px] mb-10">
    <Image
      src={profilePreview || user33}
      alt="Profile"
      width={300}
      height={300}
      className="w-full h-full rounded-full object-cover border-4 border-green-400"
    />
  </div>
</div>



          {/* General Information Section */}
         <div className="grid grid-cols-1 gap-30p">
  <div className="bg-b-neutral-3 rounded-12 px-40p py-34p">
    <div className="bg-b-neutral-3 rounded-12 px-40p py-34p">
      <h4 className="text-2xl font-bold text-w-neutral-1 mb-12">
        내정보
      </h4>
      <div className="grid grid-cols-8 gap-6 text-lg leading-relaxed">
        <div className="sm:col-span-4 col-span-8">
          <label className="text-base font-semibold text-gray-400 mb-2 block">
            배틀태그
          </label>
          <p>홍길동#1234</p>
        </div>
        <div className="sm:col-span-4 col-span-8">
          <label className="text-base font-semibold text-gray-400 mb-2 block">
            닉네임
          </label>
          <p>페이커</p>
        </div>
        <div className="col-span-8">
          <label className="text-base font-semibold text-gray-400 mb-2 block">
            Email
          </label>
          <p>abcd@Email.com</p>
        </div>
        <div className="col-span-8">
          <label className="text-base font-semibold text-gray-400 mb-2 block">
            About me
          </label>
          <p>
            저는 오버워치를 즐겨하는 유저이고 포지션은 딜러를 선호하며 한조를 즐겨합니다
          </p>
        </div>
        <div className="col-span-8">
          <label className="text-base font-semibold text-gray-400 mb-2 block">
            선호포지션
          </label>
          <p>탱커</p>
        </div>
      </div>

      <div className="flex items-center justify-end mt-12">
        <button
          type="submit"
          className="px-6 py-3 text-black bg-orange-500 hover:bg-orange-400 rounded-xl font-semibold"
        >
          개인정보 변경
        </button>
      </div>
    </div>
  </div>
</div>
        </form>
      </div>
    </section>
  );
};

export default  PostCreateCard
