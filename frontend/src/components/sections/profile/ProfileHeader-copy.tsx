// 마이페이지 헤더부분 백업본 입니다. 
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import {
//   IconBrandDiscord,
//   IconBrandFacebook,
//   IconBrandInstagram,
//   IconBrandTwitch,
//   IconBrandYoutube,
//   IconDots,
//   IconSearch,
// } from "@tabler/icons-react";
// import profileCover1 from "@public/images/photos/profileCover1.png";
// import user32 from "@public/images/users/user32.png";
// import { useToggle } from "@/hooks";
// import ProfileTab from "./ProfileTab";

// const ProfileHeader = () => {
//   const {
//     handleToggle: handleSearchToggle,
//     open: searchOpen,
//     ref: searchRef,
//   } = useToggle();

//   return (
//     <section className="section-pt overflow-visible">
//       <div className="container">
//         <div className="relative">
//           <div className="glitch-effect">
//             <div className="glitch-thumb">
//               <Image
//                 className="w-full xl:h-[490px] h-[400px] hover:scale-110 object-cover"
//                 src={profileCover1}
//                 alt="image"
//               />
//             </div>
//             <div className="glitch-thumb">
//               <Image
//                 className="w-full xl:h-[490px] lg:h-[400px] md:h-[340px] sm:h-[300px] h-[240px] hover:scale-110 object-cover"
//                 src={profileCover1}
//                 alt="image"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="grid grid-cols-12 gap-30p bg-b-neutral-3 rounded-12 pb-30p">
//           <div className="4xl:col-start-2 4xl:col-end-12 col-span-12 max-4xl:px-48p">
//             <div className="relative flex 3xl:items-end max-3xl:items-center 3xl:justify-between max-3xl:flex-col gap-30p 3xl:mt-[70px] xl:-mt-52 lg:-mt-44 md:-mt-36 sm:-mt-30 -mt-20 4xl:mb-[70px] mb-60p">
//               <div className="3xl:order-1 order-2 flex text-center divide-x divide-shap">
//                 <div className="pr-6">
//                   <h2 className="heading-40 text-w-neutral-1 mb-1">75</h2>
//                   <span className="text-m-medium text-w-neutral-4/70">
//                     Friends
//                   </span>
//                 </div>
//                 <div className="px-24p">
//                   <h2 className="heading-40 text-w-neutral-1 mb-1">140</h2>
//                   <span className="text-m-medium text-w-neutral-4/70">
//                     Winning
//                   </span>
//                 </div>
//                 <div className="pl-6">
//                   <h2 className="heading-40 text-w-neutral-1 mb-1">241</h2>
//                   <span className="text-m-medium text-w-neutral-4/70">
//                     Tournaments
//                   </span>
//                 </div>
//               </div>
//               <div className="3xl:order-2 order-1 3xl:absolute 3xl:bottom-0 3xl:left-1/2 3xl:-translate-x-1/2 max-3xl:flex-col-c z-[4]">
//                 <Image
//                   className="avatar xl:size-60 lg:size-52 md:size-44 sm:size-40 size-28 border border-secondary "
//                   src={user32}
//                   alt="profile"
//                 />
//                 <div className="text-center mt-30p">
//                   <h3 className="heading-3 text-w-neutral-1 mb-3 text-split-top">
//                     Josephine Williams
//                   </h3>
//                   <p className="text-m-medium text-w-neutral-4">
//                     I will destroy all enemies
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Link href="#" className="btn-socal-primary">
//                   <IconBrandFacebook />
//                 </Link>
//                 <Link href="#" className="btn-socal-primary">
//                   <IconBrandTwitch />
//                 </Link>
//                 <Link href="#" className="btn-socal-primary">
//                   <IconBrandInstagram />
//                 </Link>
//                 <Link href="#" className="btn-socal-primary">
//                   <IconBrandDiscord />
//                 </Link>
//                 <Link href="#" className="btn-socal-primary">
//                   <IconBrandYoutube />
//                 </Link>
//               </div>
//               <div className="order-4 3xl:absolute 3xl:right-0 3xl:-top-25 flex items-center justify-center flex-wrap gap-20p z-[3]">
//                 <button
//                   type="button"
//                   className="btn btn-lg btn-primary rounded-12"
//                 >
//                   Add Friend
//                   <i className="ti ti-plus"></i>
//                 </button>
//                 <Link
//                   href="/chat"
//                   className="btn btn-lg btn-neutral-2 rounded-12"
//                 >
//                   Send Message
//                 </Link>
//               </div>
//             </div>
//             <div>
//               <div className="flex items-center max-sm:items-start justify-between max-sm:flex-col gap-32p ">
//                 <ProfileTab />
//                 <div className="flex items-center gap-24p">
//                   <div ref={searchRef} className="dropdown">
//                     <button
//                       onClick={handleSearchToggle}
//                       className="relative btn-c btn-c-xxl btn-neutral-2 text-w-neutral-4"
//                     >
//                       <IconSearch size={24} />
//                     </button>
//                     {searchOpen && (
//                       <div className="absolute sm:right-0 max-sm:left-0 sm:top-18 top-15 z-20">
//                         <form className="flex items-center sm:gap-3 gap-2 min-w-[300px] max-w-[670px] w-full px-20p py-16p bg-b-neutral-2 rounded-full">
//                           <span className="flex-c icon-20 text-white">
//                             <IconSearch size={20} />
//                           </span>
//                           <input
//                             autoComplete="off"
//                             className="bg-transparent w-full"
//                             type="text"
//                             name="search"
//                             id="search"
//                             placeholder="Search..."
//                           />
//                         </form>
//                       </div>
//                     )}
//                   </div>

//                   <Menu as="div" className="dropdown shrink-0 z-20">
//                     <MenuButton className="dropdown-toggle btn-c btn-c-xxl btn-neutral-2 text-w-neutral-4">
//                       <IconDots size={24} />
//                     </MenuButton>
//                     <MenuItems className="dropdown-content">
//                       <Link href="/settings" className="dropdown-item">
//                         Settings
//                       </Link>
//                       <MenuItem as="button" className="dropdown-item">
//                         Follow Profile
//                       </MenuItem>
//                       <MenuItem as="button" className="dropdown-item">
//                         Report Profile
//                       </MenuItem>
//                       <MenuItem as="button" className="dropdown-item">
//                         Block User
//                       </MenuItem>
//                     </MenuItems>
//                   </Menu>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProfileHeader;
