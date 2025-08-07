"use client";

import Image from "next/image";
import logo from "@public/images/icons/watchpoint_logo_cut.png";
// import userImage from "@public/images/users/user1.png";
import defaultAvater from "@public/images/users/avatar1.png";
import Link from "next/link";
import { useToggle } from "@/hooks";
import { MouseEvent, useEffect, useState, useContext } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { navMenu } from "@public/data/navMenu";
import AnimateHeight from "react-animate-height";
import {
  IconSword,
  IconDeviceGamepad,
  IconTrophy,
  IconBell,
  IconBookmark,
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitch,
  IconBrandYoutube,
  IconChevronDown,
  IconDiamond,
  IconFlame,
  IconLayoutGrid,
  IconMenu2,
  IconMessages,
  IconPlus,
  IconShoppingCart,
  IconSpeakerphone,
  IconStar,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { users } from "@public/data/users";



const NavBar = () => {
  const router = useRouter();
  const {user, loading, logout} = useAuth(); //유저정보
  // console.log("NavBar에서 user 상태:", user); // 디버깅용
  // console.log("NavBar에서 loading 상태:", loading); // 디버깅용
  const path = usePathname();
  const [toggle, setToggle] = useState<number | null>(null);
  const [height, setHeight] = useState<string | number>(0);
  const [scrolled, setScrolled] = useState(false);
  const [hamburgerToggle, setHamburgerToggle] = useState(false);
  const {
    open: userOpen,
    handleToggle: userToggle,
    ref: userRef,
  } = useToggle();
  const [mounted, setMounted] = useState(false);

  const {
    open: notificationOpen,
    handleToggle: notificationDropdown,
    ref: notificationRef
  } = useToggle();

  const [notifications, setNotifications] = useState<Notification[] | null>(null);
  const [notificationLoading, setNotificationLoading] = useState(false);

  const handleBellClick = async()=>{
    notificationDropdown();

    // 드롭다운이 열림 & 알림이 없는 경우
    if(!notificationLoading && !notifications) {
      setNotificationLoading(true);

      try{

        //db값 호출 네트워크 로딩 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 1500));

        //가짜 알림데이터( 나중에 db값으로 교체)
        const fakeNotifications:Notification[]= [
          {id: 1, memberId: 1, text: "새로운 댓글이 달렸습니다.", link: "/community", isRead: false},
          {id: 2, memberId: 1, text: "AI 분석이 완료되었습니다.", link: "/athena", isRead: false},
          {id: 3, memberId: 1, text: "새로운 멘토 요청이 있습니다.", link: "/mentor-menti", isRead: true}
        ]

        setNotifications(fakeNotifications)
      } catch(err) {
        console.error(`알림로딩실패 : ${err}`)
        setNotifications([]); //로딩 실패 시 빈 배열 
      } finally{
        setNotificationLoading(false);
      }
    } 

    
  }
  useEffect(()=>{
    setMounted(true);
  },[]);

  // 툴팁 
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: '',
    top: 0,
    left: 0
  })


  // 마우스 이벤트 핸들러
  const handlerMouseEnter = (e: MouseEvent<HTMLElement>, text: string) =>{
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: text,
      top: rect.top + rect.height /2,
      left: rect.right +12
    })
  }

  const handleMouseLeave = ()=>{
    setTooltip({...tooltip, visible: false})
  }

  const toggleHandle = (idx: number) => {
    if (toggle === idx) {
      setToggle(null);
    } else {
      setToggle(idx);
    }
  };

  const handleHover = (idx: number) => {
    toggleHandle(idx);
  };

  // scroll to add navbar color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 180) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // Add the event listener
    document.addEventListener("scroll", handleScroll);
    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  interface MenuItem {
    id: number;
    name: string;
    isSubMenu: boolean;
    link?: string; // Link is optional for parent menu items
    subMenu?: SubMenuItem[]; // Submenu is an array of SubMenuItem objects
  }

  interface SubMenuItem {
    id: number;
    name: string;
    link: string;
  }

  // 알림
  interface Notification {
    id: number;
    memberId : number;
    text: string;
    link: string;
    isRead: boolean
  }

  // const isMenuActive = (menu: MenuItem) => {
  //   if (menu.isSubMenu && menu.subMenu) {
  //     return menu.subMenu.some((submenu: SubMenuItem) => path === submenu.link);
  //   }
  //   return path === menu.link;
  // };
  
  const isMenuActive = (menu: MenuItem) => {
    if (menu.isSubMenu && menu.subMenu) {
      return menu.subMenu.some(subItem => path.startsWith(subItem.link));
    }
    
    // Home메뉴 : 경로가 / 일 때만 활성화
    if (menu.link === '/'){
      return path === '/';
    }

    // Home이 아닌 일반 메뉴
    if (menu.link) {
      return path.startsWith(menu.link);
    }

    // 그 외 비활성화
    return false;
  };

  // const loggedUser = {
  //   name: "John Doe",
  //   email: "dWZ2l@example.com",
  //   image: userImage,
  //   followers: 270,
  // };

  const iconGroups = [
    {
      className:
        "flex flex-col gap-2 rounded-full bg-b-neutral-1 w-fit p-2 shrink-0",
      items: [
        { href: "/gameinfo", 
          icon: <IconDeviceGamepad stroke={1.5} size={32} />, 
          name: "게임정보" },
        {
          href: "/e-sports",
          icon: <IconTrophy stroke={1.5} size={32} />,
          name: "E-스포츠"
        },
        { href: "/athena", 
          icon: <IconSword stroke={1.5} size={32} /> , 
          name: "게임강의"},
        {
          href: "/community",
          icon: <IconUsersGroup stroke={1.5} size={32} />,
          name: "커뮤니티"
        },
        
      ],
      buttonClass:
        "btn-c btn-c-3xl hover:bg-primary text-white hover:text-b-neutral-4 transition-1",
    },
    {
      className: "flex flex-col gap-2 rounded-full w-fit p-2 shrink-0",
      items: [
        // { href: "/profile", icon: <IconUser stroke={1.5} size={32} /> },
        { href: "/chat", 
          icon: <IconMessages stroke={1.5} size={32} />, 
          name: "채팅"},
        {
          href: "/pricing-plan",
          icon: <IconDiamond stroke={1.5} size={32} />,
          name: "구독"
        },
      ],
      buttonClass: "btn-c btn-c-3xl btn-neutral-4",
    }
  ];

  return (
    <>
      {/* 헤더 */}
      <header
        id="header"
        className={`${
          scrolled
            ? "header-animation shadow-2xl bg-secondary"
            : "bg-transparent absolute"
        }  w-full z-[999] `}
      >
        <div className="mx-auto relative">
          <div
            id="header-nav"
            className="w-full px-24p bg-b-neutral-3 relative"
          >
            <div className="flex items-center justify-between gap-x-2 mx-auto py-20p">
              <nav className="relative xl:grid xl:grid-cols-12 flex justify-between items-center gap-24p text-semibold w-full">
                {/* 로고 */}
                <div className="3xl:col-span-6 xl:col-span-5 flex items-center 3xl:gap-x-10 gap-x-5">
                  <Link href="/" className="shrink-0">
                    <Image
                      className="xl:w-[170px] sm:w-36 w-30 h-auto shrink-0"
                      width={170}
                      src={logo}
                      alt="brand"
                    />
                  </Link>
                  {/* 검색창 */}
                  <form className="hidden lg:flex items-center sm:gap-3 gap-2 min-w-[300px] max-w-[670px] w-full px-20p py-16p bg-b-neutral-4 rounded-full">
                    <span className="flex-c icon-20 text-white">
                      <i className="ti ti-search"></i>
                    </span>
                    <input
                      autoComplete="off"
                      className="bg-transparent w-full"
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search..."
                    />
                  </form>
                </div>
                <div className="3xl:col-span-6 xl:col-span-7 flex items-center xl:justify-between justify-end w-full">
                 {/* 뉴스 */}
                  <Link
                    href="/blogs"
                    className="hidden xl:inline-flex items-center gap-3 pl-1 py-1 pr-6  rounded-full bg-[rgba(242,150,32,0.10)] text-w-neutral-1 text-base"
                  >
                    <span className="size-48p flex-c bg-primary text-b-neutral-4 rounded-full">
                      <IconSpeakerphone stroke={1.5} size={32} />
                    </span>
                    News For You
                  </Link>
                  {/* 알림 */}
                  <div className="flex items-center lg:gap-x-40p gap-x-2">
                    <div className="hidden lg:flex items-center gap-1 shrink-0 mr-4">
                      {/* <Link
                        href="/shopping-cart"
                        className="btn-c btn-c-xxl btn-c-dark-outline"
                      >
                        <IconShoppingCart stroke={1.5} size={32} />
                      </Link> */}
                      {/* 유저 로그인한 경우에만 알림창*/}
                      {user && (                      
                        <div ref={notificationRef} className="hidden lg:flex items-center gap-1 shrink-0 relative">
                          <button className="btn-c btn-c-xxl btn-c-dark-outline w-12 h-12 flex items-center justify-center"
                            onClick={handleBellClick}
                            style={{minWidth: 60, minHeight: 60}}
                          >
                              <span className="block">
                                <IconBell stroke={1.5} size={32} />  
                              </span>
                            {/* 읽지않은 알림 표시  */}
                            {notifications && notifications.some(n => !n.isRead) && (
                            <span className="absolute top-1 right-2 block h-3 w-3 rounded-full bg-red-500"></span>
                            )}              
                          </button>
                                                
                          {notificationOpen && (
                            <div className="dropdown-content w-80 max-w-md">
                              {/* 드롭다운 */}
                              <div className="p-4 border-b border-b-neutral-4">
                                <h5 className="text-lg font-semibold text-white">알림</h5>
                              </div>
                              {notificationLoading ? (
                                <div className="p-4 text-center text-gray-400">로딩 중...</div>
                              ) : notifications && notifications.length > 0 ? (
                                <ul className="p-2 max-h-80 overflow-y-auto">
                                {notifications.map(notif => (
                                  <li key={notif.id}>                                  
                                    <Link 
                                      href={notif.link} 
                                      className={`dropdown-item ${!notif.isRead ? 'text-white' : 'text-gray-400'}`}
                                      onClick={notificationDropdown} // 알림 클릭 시 드롭다운 닫기
                                    >
                                      {notif.text}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              ) : (
                            <div className="p-4 text-center text-gray-400">새로운 알림이 없습니다.</div>
                            )}
                            <div className="p-2 border-t border-t-neutral-4 text-center">
                              <Link href="/notifications" className="text-sm text-primary" onClick={notificationDropdown}>모든 알림 보기</Link>
                            </div>                                                                                
                          </div>  
                        )}
                      </div>                    
                    )}
                      
                    {/* 유저 프로필 : 로그인 상태별 랜더링 */}
                    {!mounted || loading? (
                      // 로딩중일때 UI
                      <div className="h-[60px] w-[200px] bg-b-neutral-4 rounded-full animate-pulse"></div> 
                    ) : user ? (
                      // 로그인상태 프로필 표시 
                      <div
                      ref={userRef}
                      className="dropdown relative shrink-0 lg:block hidden"
                    >
                      <button
                        onClick={userToggle}
                        className="dropdown-toggle gap-24p"
                      >
                        <span className="flex items-center gap-3 ml-4">
                          <Image
                            className="size-60p rounded-full shrink-0"
                            src={user.image? user.image : defaultAvater}
                            alt="profile"
                            width={60}
                            height={60}
                          />
                          <span className="text-left">
                            <span className="text-m-medium text-w-neutral-1 mb-1">
                              {user.name}
                            </span>
                            <span className="text-sm text-w-neutral-4 block">
                              {user.blizardId}# {user.battleTag} 
                            </span>
                          </span>
                        </span>
                        <span
                          className={` ${
                            userOpen ? "rotate-180" : ""
                          } btn-c btn-sm text-w-neutral-4 icon-32 transition-1`}
                        >
                          <IconChevronDown stroke={1.5} size={32} />
                        </span>
                      </button>
                      {/* 프로필 드롭다운 */}
                      {userOpen && (
                        <div className="dropdown-content">
                          <Link href="/profile" className="dropdown-item">
                            Profile
                          </Link>
                          <Link href="/settings" className="dropdown-item">
                            Settings
                          </Link>
                            <button type="button" className="dropdown-item" onClick={()=>{
                              // console.log("로그아웃 버튼 클릭됨"); // 디버깅용
                              userToggle(); //토글창닫기
                              logout(); //로그아웃
                              router.push('/login'); //로그인페이지로이동
                            }}>                          
                              Logout                          
                            </button>
                          <Link href="/contact-us" className="dropdown-item">
                            Help
                          </Link>
                        </div>
                      )}
                    </div>
                    ) : (
                      // 로그아웃 상태
                      <div className="hidden lg:flex items-center gap-3">
                        <Link href="/login" className="btn btn-sm btn-c-dark-outline text-base rounded-12">
                          로그인
                        </Link>
                        <Link href="/sign-up" className="btn btn-sm btn-primary text-base rounded-12">
                          회원가입
                        </Link>
                      </div>
                    )}                 
                    
                    <button
                      onClick={() => setHamburgerToggle((prev) => !prev)}
                      className="lg:hidden btn-c btn-c-xxl btn-c-dark-outline nav-toggole shrink-0"
                    >
                      <IconMenu2 stroke={1.5} size={32} />
                    </button>
                  </div>
                </div>
              </div>
              </nav>
            </div>
          </div>
          <nav className="w-full flex justify-between items-center">
            <div
              className={` ${
                hamburgerToggle
                  ? "md:translate-y-0 max-md:translate-x-0 visible"
                  : "md:translate-y-full max-md:-translate-x-full invisible"
              } small-nav fixed top-0 left-0 h-screen w-full shadow-lg z-[999] transform transition-transform ease-in-out duration-500 `}
            >
              <div className="absolute z-[5] inset-0 bg-b-neutral-3 flex-col-c min-h-screen max-md:max-w-[400px]">
                <div className="container max-md:p-0 md:overflow-y-hidden overflow-y-scroll scrollbar-sm lg:max-h-screen">
                  <div className="p-40p">
                    <div className="flex justify-between items-center mb-10">
                      <Link href="/">
                        <Image
                          width={142}
                          className="w-[142px] h-auto"
                          src={logo}
                          alt="GameCo"
                        />
                      </Link>
                      <button
                        onClick={() => setHamburgerToggle((prev) => !prev)}
                        className="nav-close btn-c btn-c-md btn-c-primary"
                      >
                        <i className="ti ti-x"></i>
                      </button>
                    </div>
                    <div className="grid grid-cols-12 gap-x-24p gap-y-10 sm:p-y-48p">
                      <div className="xl:col-span-8 md:col-span-7 col-span-12">
                        <div className="overflow-y-scroll overflow-x-hidden scrollbar scrollbar-sm xl:max-h-[532px] md:max-h-[400px] md:pr-4">
                          <ul className="flex flex-col justify-center items-start gap-20p text-w-neutral-1">
                            {navMenu?.map((menu, idx) => (
                              <li
                                key={menu.id}
                                className={` ${
                                  isMenuActive(menu) && !menu?.isSubMenu
                                    ? "text-primary"
                                    : "text-white"
                                } ${
                                  menu?.isSubMenu
                                    ? "sub-menu mobail-submenu"
                                    : "mobail-menu"
                                }`}
                                onClick={() => handleHover(menu.id)}
                              >
                                {menu?.isSubMenu ? (
                                  <span
                                    onClick={() =>
                                      setHeight(height === 0 ? "auto" : 0)
                                    }
                                  >
                                    <span
                                      className={`${
                                        isMenuActive(menu)
                                          ? "text-primary"
                                          : "text-white"
                                      } mobail-submenu-btn`}
                                    >
                                      <span className="submenu-btn">
                                        {menu?.name}
                                      </span>
                                      <span
                                        className={`${
                                          toggle === menu.id
                                            ? "rotate-0"
                                            : "rotate-180"
                                        } collapse-icon mobail-submenu-icon`}
                                      >
                                        <IconChevronDown
                                          stroke={1.5}
                                          size={24}
                                        />
                                      </span>
                                    </span>
                                    <AnimateHeight
                                      duration={500}
                                      height={toggle === menu.id ? "auto" : 0}
                                    >
                                      <ul className="grid gap-y-2 px-16p pt-2">
                                        {menu?.subMenu?.map((subItem, idx) => (
                                          <li key={subItem.id}>
                                            <Link
                                              onClick={() =>
                                                setHamburgerToggle(
                                                  (prev) => !prev
                                                )
                                              }
                                              href={subItem?.link}
                                              className={` ${
                                                path === subItem.link
                                                  ? "text-primary"
                                                  : "text-white"
                                              } text-base hover:text-primary transition-1`}
                                            >
                                              - {subItem?.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </AnimateHeight>
                                  </span>
                                ) : (
                                  <Link
                                    onClick={() =>
                                      setHamburgerToggle((prev) => !prev)
                                    }
                                    href={menu?.link!}
                                    className={`${
                                      path === menu.link
                                        ? "text-primary"
                                        : "text-white"
                                    } `}
                                  >
                                    {menu?.name}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="xl:col-span-4 md:col-span-5 col-span-12">
                        <div className="flex flex-col items-baseline justify-between h-full">
                          {/* 검색바 */}
                          <form className="w-full flex items-center justify-between px-16p py-2 pr-1 border border-w-neutral-4/60 rounded-full">
                            <input
                              className="placeholder:text-w-neutral-4 bg-transparent w-full"
                              type="text"
                              name="search-media"
                              placeholder="Search Media"
                              id="search-media"
                            />
                            <button
                              type="submit"
                              className="btn-c btn-c-md text-w-neutral-4"
                            >
                              <i className="ti ti-search"></i>
                            </button>
                          </form>
                          <div className="mt-40p">
                            <Image className="mb-16p" src={logo} alt="logo" />
                            <p className="text-base text-w-neutral-3 mb-32p">
                              오버워치 게임의 모든 것을 Watchpoint에서.
                            </p>
                            <div className="flex items-center flex-wrap gap-3">
                              <Link href="#" className="btn-socal-primary">
                                <IconBrandFacebook />
                              </Link>
                              <Link href="#" className="btn-socal-primary">
                                <IconBrandTwitch />
                              </Link>
                              <Link href="#" className="btn-socal-primary">
                                <IconBrandInstagram />
                              </Link>
                              <Link href="#" className="btn-socal-primary">
                                <IconBrandDiscord />
                              </Link>
                              <Link href="#" className="btn-socal-primary">
                                <IconBrandYoutube />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nav-close min-h-[200vh] navbar-overly"></div>
            </div>
          </nav>
        </div>
      </header>
      {/* 왼쪽 사이드바 */}
      <div>
        <div className="fixed top-0 left-0 lg:translate-x-0 -translate-x-full h-screen z-[30] bg-b-neutral-4 pt-30 px-[27px] transition-1">
          <div className="max-h-screen overflow-y-auto scrollbar-0">
            <div className="flex flex-col items-center xxl:gap-[30px] xl:gap-6 lg:gap-5 gap-4 h-[700px]">
              {/* 네비게이션 토글 버튼 */}
                <button
                  onClick={() => setHamburgerToggle((prev) => !prev)}
                  className="nav-toggole btn-c btn-c-3xl btn-primary icon-32 shrink-0"
                  onMouseEnter={(e) => handlerMouseEnter(e, "메뉴 열기")}
                  onMouseLeave={handleMouseLeave}
                >
                  <IconLayoutGrid stroke={1.5} size={32} />
                </button>
              
              {/* 사이드바 메뉴 */}
              {iconGroups.map((group, groupIdx) => (
                <div key={groupIdx} className={group.className}>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      // className={`${
                      //   path === item.href
                      //     ? "bg-primary !text-b-neutral-4"
                      //     : "text-white"
                      // } ${group.buttonClass}`}
                      className={
                        `group relative ${ path === item.href ? 
                        "bg-primary !text-b-neutral-4" 
                        : "text-white"} 
                        ${group.buttonClass}`}
                        onMouseEnter={(e)=>handlerMouseEnter(e, item.name)}
                        onMouseLeave={handleMouseLeave}
                    >
                      {item.icon}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {tooltip.visible && (
          <div className="fixed px-3 py-2 text-sm font-medium text-w-neutral-1 bg-b-neutral-1 rounded-lg shadow-sm 
            whitespace-nowrap transition-opacity duration-300 z-[99]"
            style={{
              top: tooltip.top,
              left: tooltip.left,
              transform: 'translateY(-50%)'
            }}
          >
            {tooltip.text}
          </div>
        )}
        {/* 유저 목록 */}
        {/* <div className="fixed top-0 right-0 lg:translate-x-0 translate-x-full h-screen z-30 bg-b-neutral-4 pt-30 px-[27px] transition-1">
          <div className="flex flex-col items-center xxl:gap-[30px] xl:gap-6 lg:gap-5 gap-4">
            <div className="flex flex-col items-center gap-16p rounded-full w-fit p-2">
              <Swiper
                loop={true}
                slidesPerView={"auto"}
                spaceBetween={16}
                centeredSlides={false}
                direction="vertical"
                speed={100}
                mousewheel={true}
                className="infinity-slide-vertical messenger-carousel max-h-[288px] w-full"
              >
                {users?.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <Link href="/chat" className="avatar size-60p">
                      <Image
                        width={60}
                        height={60}
                        src={item?.avatar}
                        className="rounded-full"
                        alt="avatar"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Link
                href="#"
                className="btn-c btn-c-xl bg-b-neutral-1 hover:bg-primary text-white hover:text-b-neutral-4 transition-1"
              >
                <IconPlus stroke={1.5} size={24} />
              </Link>
            </div>
            <div className="w-full h-1px bg-b-neutral-1"></div>
            <div className="flex flex-col items-center gap-16p rounded-full w-fit p-2">
              <div className="swiper infinity-slide-vertical messenger-carousel max-h-[136px] w-full">
                <Swiper
                  loop={true}
                  slidesPerView={"auto"}
                  spaceBetween={16}
                  centeredSlides={false}
                  direction="vertical"
                  speed={100}
                  mousewheel={true}
                  className="infinity-slide-vertical messenger-carousel max-h-[136px] w-full"
                >
                  {users?.slice(4)?.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <Link href="/chat" className="avatar size-60p">
                        <Image
                          width={60}
                          height={60}
                          src={item?.avatar}
                          className="rounded-full"
                          alt="avatar"
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default NavBar;