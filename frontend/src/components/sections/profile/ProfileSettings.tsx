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

const ProfileSettings = () => {
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
    <section className="section-py">
      <div className="container pt-30p">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Cover Photo Section */}
          <div className="relative rounded-32 overflow-hidden">
            <div className="glitch-effect">
              <div className="glitch-thumb">
                {coverPreview ? (
                  <Image
                    className="w-full xl:h-[472px] lg:h-[400px] md:h-[340px] sm:h-[300px] h-[240px] object-cover"
                    src={coverPreview}
                    width={1920}
                    height={472}
                    alt="Cover Preview"
                  />
                ) : (
                  <Image
                    className="w-full xl:h-[472px] lg:h-[400px] md:h-[340px] sm:h-[300px] h-[240px] object-cover"
                    src={profileCover2}
                    width={1920}
                    height={472}
                    alt="Cover"
                  />
                )}
              </div>
              <div className="glitch-thumb">
                {coverPreview ? (
                  <Image
                    className="w-full xl:h-[472px] lg:h-[400px] md:h-[340px] sm:h-[300px] h-[240px] object-cover"
                    src={coverPreview}
                    width={1920}
                    height={472}
                    alt="Cover Preview"
                  />
                ) : (
                  <Image
                    className="w-full xl:h-[472px] lg:h-[400px] md:h-[340px] sm:h-[300px] h-[240px] object-cover"
                    src={profileCover2}
                    width={1920}
                    height={472}
                    alt="Cover"
                  />
                )}
              </div>
            </div>
            <label
              htmlFor="coverPhoto"
              className="cursor-pointer absolute xl:top-[30px] md:top-5 top-4 xl:right-[30px] md:right-5 right-4 z-[5]"
            >
              <span className="flex-c size-60p rounded-full bg-b-neutral-3 text-w-neutral-1 icon-32">
                <i className="ti ti-camera"></i>
              </span>
            </label>
            <input
              type="file"
              {...register("coverPhoto")}
              id="coverPhoto"
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Profile Photo Section */}
          <div className="relative flex 3xl:items-end max-3xl:items-center 3xl:justify-between max-3xl:flex-col gap-30p 3xl:mt-[90px] xl:-mt-52 lg:-mt-44 md:-mt-36 sm:-mt-30 -mt-20 4xl:mb-[70px] mb-60p">
            <div className="3xl:absolute 3xl:bottom-0 3xl:left-1/2 3xl:-translate-x-1/2 max-3xl:flex-col-c z-[4]">
              {profilePreview ? (
                <Image
                  className="avatar xl:size-60 lg:size-52 md:size-44 sm:size-40 size-28 border-2 border-secondary"
                  src={profilePreview}
                  width={240}
                  height={240}
                  alt="Profile Preview"
                />
              ) : (
                <Image
                  className="avatar xl:size-60 lg:size-52 md:size-44 sm:size-40 size-28 border-2 border-secondary"
                  src={user33}
                  width={240}
                  height={240}
                  alt="Profile"
                />
              )}
              <label
                htmlFor="profilePhoto"
                className="cursor-pointer absolute lg:-bottom-6 md:-bottom-5 -bottom-4 left-1/2 -translate-x-1/2"
              >
                <span className="flex-c size-60p rounded-full bg-primary text-b-neutral-4 icon-32">
                  <i className="ti ti-camera"></i>
                </span>
              </label>
              <input
                type="file"
                {...register("profilePhoto")}
                id="profilePhoto"
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>

          {/* General Information Section */}
          <div className="grid grid-cols-12 gap-30p">
            <div className="xxl:col-start-3 xxl:col-end-11 col-span-12">
              <div className="bg-b-neutral-3 rounded-12 p-40p">
                <h4 className="heading-4 text-w-neutral-1 mb-60p">
                  General Information
                </h4>
                <div className="grid grid-cols-8 gap-30p">
                  <div className="sm:col-span-4 col-span-8">
                    <label htmlFor="first_name" className="label label-lg mb-3">
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register("first_name")}
                      id="first_name"
                      className="box-input-3"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="sm:col-span-4 col-span-8">
                    <label htmlFor="last_name" className="label label-lg mb-3">
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register("last_name")}
                      id="last_name"
                      className="box-input-3"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="col-span-8">
                    <label htmlFor="email" className="label label-lg mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      id="email"
                      className="box-input-3"
                      placeholder="Email"
                    />
                  </div>
                  <div className="col-span-8">
                    <label htmlFor="about" className="label label-lg mb-3">
                      About me
                    </label>
                    <textarea
                      {...register("about")}
                      id="about"
                      className="box-input-3 h-[142px]"
                      placeholder="Tell us about yourself"
                    ></textarea>
                  </div>
                  <div className="col-span-8">
                    <label htmlFor="location" className="label label-lg mb-3">
                      Location
                    </label>
                    <input
                      type="text"
                      {...register("location")}
                      id="location"
                      className="box-input-3"
                      placeholder="Location"
                    />
                  </div>
                  <div className="sm:col-span-4 col-span-8">
                    <label htmlFor="working" className="label label-lg mb-3">
                      Working at
                    </label>
                    <input
                      type="text"
                      {...register("working")}
                      id="working"
                      className="box-input-3"
                      placeholder="Company/Organization"
                    />
                  </div>
                  <div className="sm:col-span-4 col-span-8">
                    <label
                      htmlFor="relationship"
                      className="label label-lg mb-3"
                    >
                      Relationship
                    </label>
                    <input
                      type="text"
                      {...register("relationship")}
                      id="relationship"
                      className="box-input-3"
                      placeholder="Relationship Status"
                    />
                  </div>
                </div>
                <div className="flex items-center md:justify-end justify-center">
                  <button
                    type="submit"
                    className="btn btn-md btn-primary rounded-12 mt-60p"
                  >
                    Saved Change
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

export default ProfileSettings;
