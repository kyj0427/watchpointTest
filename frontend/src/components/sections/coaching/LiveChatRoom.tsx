"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import user1 from "@public/images/users/user1.png";
import user2 from "@public/images/users/user2.png";
import user3 from "@public/images/users/user3.png";
import user4 from "@public/images/users/user4.png";
import user7 from "@public/images/users/user7.png";

interface MessageFormData {
  message: string;
}

const LiveChatRoom = () => {
  const { register, handleSubmit, reset } = useForm<MessageFormData>();
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "David Malan",
      time: "2m",
      avatar: user1,
      content: [
        { text: "Hey team,", icon: "ti ti-mood-nerd" },
        { text: "Avoid combat, watch the jungle", icon: "ti ti-dots-vertical" },
      ],
    },
    {
      id: 2,
      name: "Rolex Millar",
      time: "4m",
      avatar: user2,
      content: [
        {
          text: "As we wrap up our journey through the world of online gaming",
          icon: "ti ti-mood-nerd",
        },
      ],
    },
    {
      id: 3,
      name: "Sammi Esmit",
      time: "4m",
      avatar: user3,
      content: [{ text: "Great!" }],
    },
    {
      id: 4,
      name: "Adder son",
      time: "4m",
      avatar: user4,
      content: [{ text: "Our massage therapy has something for everyone." }],
    },
    {
      id: 5,
      name: "David Smith",
      time: "9m",
      avatar: user7,
      content: [
        { text: "Your comfort and well-being are of utmost importance to us." },
      ],
    },
  ]);

  const onSubmit = (data: MessageFormData) => {
    // TODO: 여기에 실시간 채팅 서버 전송 추가 가능
    reset();
  };

 return (
  <div className="h-full flex flex-col bg-neutral-900 rounded-lg overflow-hidden">
    {/* 상단 타이틀 영역 */}
    <div className="flex-y flex-wrap justify-between gap-24p p-20p border-b border-shap">
      <h4 className="heading-4 text-w-neutral-1">Live chat room</h4>
      <Link href="/chat" className="icon-32 text-w-neutral-4">
        <i className="ti ti-arrow-up-right"></i>
      </Link>
    </div>

    {/* 메시지 목록 영역: flex-1로 남는 높이를 모두 차지 */}
    <div className="flex-1 overflow-y-auto px-20p py-16p scrollbar-sm">
      <div className="grid grid-cols-1 gap-20p">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-2">
            <Image
              className="avatar size-48p shrink-0"
              src={message.avatar || "/images/default-avatar.png"}
              alt={`${message.name} avatar`}
              width={48}
              height={48}
            />
            <div>
              <div className="flex-y gap-2 mb-16p">
                <Link
                  href="/profile.html"
                  className="text-m-medium text-w-neutral-1 link-1"
                >
                  {message.name}
                </Link>
                <span className="text-xs !text-w-neutral-4">
                  {message.time}
                </span>
              </div>
              <div className="inline-grid gap-y-1 *:inline-flex *:gap-2.5 *:items-center *:px-20p *:py-3 *:text-w-neutral-4 text-sm *:bg-glass-1 *:rounded-24 *:rounded-tl-none">
                {message?.content?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <p className="text-w-neutral-4">{item.text}</p>
                    {"icon" in item && (
                      <span className="icon-24">
                        <i
                          className={`${
                            (item as { icon: string }).icon
                          } text-w-neutral-4`}
                        ></i>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 입력창 영역: 고정 높이로 아래 붙게 */}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-between gap-3 px-20p py-4 bg-b-neutral-3 rounded-24 mt-auto"
    >
      <div className="flex items-center gap-3 w-full">
        <button type="button" className="icon-24 text-w-neutral-4">
          <i className="ti ti-mood-smile"></i>
        </button>
        <input
          type="text"
          className="bg-transparent text-sm text-w-neutral-1 placeholder:text-w-neutral-1 w-full"
          placeholder="Send a message"
          {...register("message", {
            required: "Message is required",
          })}
        />
      </div>
      <button type="submit" className="btn btn-c-md btn-primary rounded-12">
        <i className="ti ti-send icon-24"></i>
      </button>
    </form>
  </div>

 );
}
export default LiveChatRoom;