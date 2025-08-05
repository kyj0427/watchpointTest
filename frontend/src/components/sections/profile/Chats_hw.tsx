'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import avatar1 from "@public/images/users/avatar1.png";
import avatar3 from "@public/images/users/avatar3.png";
import { chatList } from "@public/data/chatList";
import { IconPhone } from "@tabler/icons-react";


const Chats = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'room'>('list');
  const [selectedChat, setSelectedChat] = useState(chatList[0]);

  return (
    <section className="section-py">
      <div className="container pt-60p">
        <h2 className="heading-2 text-w-neutral-1 mb-30p">Chats</h2>
        <div className="grid grid-cols-12 gap-30p">
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

          {activeTab === 'room' && (
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
                      <span className="text-m-reguler text-w-neutral-4">
                        Active Now
                      </span>
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
                  <button onClick={() => setActiveTab('list')} className="text-sm text-w-neutral-4 hover:underline">
                    ← Back to list
                  </button>
                </div>

                <div className="h-screen overflow-y-auto scrollbar-sm">
                  <div className="p-30p grid grid-cols-1 gap-y-40p">
                    {/* 예시 메시지 1 */}
                    <div className="flex justify-start">
                      <div className="flex gap-x-30p gap-y-20p">
                        <Image className="avatar size-60p" src={avatar1} width={60} height={60} alt="user" />
                        <div className="p-24p bg-glass-1 rounded-t-3xl rounded-br-3xl text-base text-w-neutral-3 max-w-[566px]">
                          <p>Hello, how can I help you today?</p>
                        </div>
                      </div>
                    </div>

                    {/* 예시 메시지 2 */}
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
        </div>
      </div>
    </section>
  );
};

export default Chats;
