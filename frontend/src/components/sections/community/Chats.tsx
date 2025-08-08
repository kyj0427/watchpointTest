'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import avatar1 from "@public/images/users/avatar1.png";
import avatar3 from "@public/images/users/avatar3.png";
import { chatList } from "@public/data/chatList";
import { IconPhone } from "@tabler/icons-react";
import { useRouter } from 'next/navigation';

// 
interface Chat {
  id: number;
  name: string;
  avatar: any;
  time: string;
  message: string;
}

const Chats = () => {
  const [activeMenu, setActiveMenu] = useState<'chat' | 'duosquad' | 'create'>('chat');
  const [activeTab, setActiveTab] = useState<'list' | 'room'>('list');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const router = useRouter();

  useEffect(() => {
    setSelectedChat(chatList[0]);
  }, []);

  return (
    <section className="section-py">
      <div className="container pt-60p">
        <h2 className="heading-2 text-w-neutral-1 mb-30p">Chats</h2>

        {/* 상단 메뉴 탭 */}
        <div className="mb-30p flex flex-wrap gap-20p">
          <button
            onClick={() => {
              setActiveMenu('chat');
              setActiveTab('list');
            }}
            className={`px-48p py-24p rounded-full border-2 text-xl font-bold transition-all duration-200 flex items-center gap-12p ${
              activeMenu === 'chat'
                ? 'bg-w-neutral-1 text-b-neutral-1 border-w-neutral-1'
                : 'text-w-neutral-3 border-glass-6 hover:border-w-neutral-1 hover:text-w-neutral-1'
            }`}
          >
            <span aria-hidden="true" className="text-2xl">💬</span>
            <span>일반 채팅</span>
          </button>

          <button
            onClick={() => setActiveMenu('duosquad')}
            className={`px-48p py-24p rounded-full border-2 text-xl font-bold transition-all duration-200 flex items-center gap-12p ${
              activeMenu === 'duosquad'
                ? 'bg-w-neutral-1 text-b-neutral-1 border-w-neutral-1'
                : 'text-w-neutral-3 border-glass-6 hover:border-w-neutral-1 hover:text-w-neutral-1'
            }`}
          >
            <span aria-hidden="true" className="text-2xl">🎮</span>
            <span>듀오 스쿼드</span>
          </button>

          <button
            onClick={() => {
              setActiveMenu('create');
              router.push('/community/chat/create');
            }}
            className={`px-48p py-24p rounded-full border-2 text-xl font-bold transition-all duration-200 flex items-center gap-12p ${
              activeMenu === 'create'
                ? 'bg-w-neutral-1 text-b-neutral-1 border-w-neutral-1'
                : 'text-w-neutral-3 border-glass-6 hover:border-w-neutral-1 hover:text-w-neutral-1'
            }`}
          >
            <span aria-hidden="true" className="text-2xl">➕</span>
            <span>채팅방 생성</span>
          </button>

          <button
            onClick={() => {
              
              router.push('/community/SquadOrChat');
            }}
            className={`px-48p py-24p rounded-full border-2 text-xl font-bold transition-all duration-200 flex items-center gap-12p ${
              activeMenu === 'create'
                ? 'bg-w-neutral-1 text-b-neutral-1 border-w-neutral-1'
                : 'text-w-neutral-3 border-glass-6 hover:border-w-neutral-1 hover:text-w-neutral-1'
            }`}
          >
            <span aria-hidden="true" className="text-2xl"></span>
            <span>채팅방 목록</span>
          </button>
        </div>

        <div className="grid grid-cols-12 gap-30p">
          {/* 일반 채팅 */}
          {activeMenu === 'chat' && (
            <>
              {activeTab === 'list' && (
                <div className="col-span-12">
                  <div className="grid grid-cols-1 gap-2 *:py-24p *:px-30p *:flex *:gap-20p *:rounded-12 *:bg-glass-7">
                    {chatList?.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedChat(item);
                          setActiveTab('room');
                        }}
                        className="text-left w-full"
                      >
                        <div className="shrink-0 size-60p relative">
                          <Image
                            className="size-60p rounded-full"
                            src={item?.avatar}
                            width={60}
                            height={60}
                            alt="user"
                          />
                          <span className="absolute right-0 bottom-0 size-5 border-4 border-glass-6 bg-secondary rounded-full"></span>
                        </div>
                        <div className="w-full">
                          <div className="flex-y gap-3 justify-between">
                            <span className="text-l-medium text-w-neutral-1 mb-1 line-clamp-1">
                              {item?.name}
                            </span>
                            <span className="text-base text-w-neutral-4 whitespace-nowrap">
                              {item?.time}
                            </span>
                          </div>
                          <p className="text-base text-w-neutral-4 line-clamp-1">
                            {item?.message}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'room' && selectedChat && (
                <div className="col-span-12">
                  <div className="bg-glass-7 rounded-12">
                    <div className="p-30p flex items-center justify-between gap-20p border-b border-shap">
                      <div className="shrink-0 flex-y gap-20p">
                        <div className="shrink-0 size-80p relative">
                          <Image
                            width={80}
                            height={80}
                            className="size-80p rounded-full"
                            src={avatar1}
                            alt="user"
                          />
                          <span className="absolute right-0 bottom-0 size-5 border-4 border-glass-6 bg-secondary rounded-full"></span>
                        </div>
                        <div>
                          <Link
                            href="/profile"
                            className="heading-4 text-w-neutral-1 md:mb-2 mb-0.5"
                          >
                            {selectedChat.name}
                          </Link>
                          <span className="text-m-regular text-w-neutral-4">Active Now</span>
                        </div>
                      </div>
                      <div className="flex-y lg:gap-32p gap-20p">
                        <button className="icon-32 text-w-neutral-4">
                          <i className="ti ti-video"></i>
                        </button>
                        <button className="icon-32 text-w-neutral-4">
                          <IconPhone size={32} />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 text-right">
                      <button
                        onClick={() => setActiveTab('list')}
                        className="text-sm text-w-neutral-4 hover:underline"
                      >
                        ← Back to list
                      </button>
                    </div>

                    <div className="h-screen overflow-y-auto scrollbar-sm">
                      <div className="p-30p grid grid-cols-1 gap-y-40p">
                        <div className="flex justify-start">
                          <div className="flex gap-x-30p gap-y-20p">
                            <Image className="avatar size-60p" src={avatar1} width={60} height={60} alt="user" />
                            <div className="p-24p bg-glass-1 rounded-t-3xl rounded-br-3xl text-base text-w-neutral-3 max-w-[566px]">
                              <p>Hello, how can I help you today?</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <div className="flex items-end gap-x-30p gap-y-20p">
                            <div className="p-24p bg-glass-8 rounded-t-3xl rounded-bl-3xl text-base text-w-neutral-3 max-w-[566px]">
                              <p>I’m looking to book a session!</p>
                            </div>
                            <Image className="avatar size-60p" src={avatar3} width={60} height={60} alt="user" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <form className="p-30p flex items-center justify-between gap-20p border-t border-shap">
                      <input
                        className="placeholder:text-w-neutral-1 bg-transparent"
                        type="text"
                        placeholder="Type your message here..."
                      />
                      <div className="flex-y gap-x-24p">
                        <button type="button" className="icon-24 text-w-neutral-1">
                          <i className="ti ti-link"></i>
                        </button>
                        <button type="button" className="icon-24 text-w-neutral-1">
                          <i className="ti ti-mood-smile"></i>
                        </button>
                        <button type="submit" className="size-40p icon-24 btn-primary rounded-12">
                          <i className="ti ti-send"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}

          {activeMenu === 'duosquad' && (
            <div className="col-span-12 bg-glass-7 rounded-12 p-30p">
              <p className="text-w-neutral-1 text-base">듀오 스쿼드 매칭방은 여기에 구현됩니다.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Chats;
