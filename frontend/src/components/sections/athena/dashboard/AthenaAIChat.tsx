"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface MessageFormData {
  message: string;
}

interface ChatMessage {
  id: string;
  type: "ai" | "user";
  message: string;
  timestamp: string;
}

interface AthenaAIChatProps {
  videoId?: string;
  chatHistory?: ChatMessage[];
  onMessageSend?: (message: string) => void;
}

const AthenaAIChat = ({ videoId, chatHistory = [], onMessageSend }: AthenaAIChatProps) => {
  const { register, handleSubmit, reset } = useForm<MessageFormData>();
  const [messages, setMessages] = useState<ChatMessage[]>(chatHistory);
  const user = useAuth();

  const onSubmit = (data: MessageFormData) => {
    if (!data.message.trim()) return;

    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: data.message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // 부모 컴포넌트에 메시지 전달
    if (onMessageSend) {
      onMessageSend(data.message);
    }
    
    reset();

    // AI 응답 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        message: "Athena가 분석 중입니다. 잠시만 기다려주세요.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="border border-shap p-40p rounded-12">
      <div className="flex-y flex-wrap justify-between gap-24p pb-40p border-b border-shap">
        <h4 className="heading-4 text-w-neutral-1">Athena AI 채팅</h4>
        <div className="icon-32 text-w-neutral-4">
          <i className="ti ti-arrow-up-right"></i>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-20p py-40p max-h-[540px] overflow-y-auto overflow-x-hidden scrollbar-sm">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'ai' && (
              <div className="avatar size-48p shrink-0 bg-b-neutral-3 rounded-full flex items-center justify-center">
                <span className="text-w-neutral-1 text-sm font-bold">A</span>
              </div>
            )}
            <div className={`max-w-[80%] ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`flex-y gap-2 mb-16p ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className="text-m-medium text-w-neutral-1">
                  {message.type === 'ai' ? 'Athena' : (user?.user?.name || 'User')}
                </span>
                <span className="text-xs !text-w-neutral-4">
                  {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className={`inline-grid gap-y-1 *:inline-flex *:gap-2.5 *:items-center *:px-20p *:py-3 *:text-w-neutral-4 text-sm *:bg-glass-1 *:rounded-24 ${message.type === 'user' ? '*:rounded-tr-none' : '*:rounded-tl-none'}`}>
                <div className="flex items-center gap-2.5">
                  <p className="text-w-neutral-4">{message.message}</p>
                </div>
              </div>
            </div>
            {message.type === 'user' && (
              <div className="avatar size-48p shrink-0 bg-b-neutral-3 rounded-full flex items-center justify-center">
                <span className="text-w-neutral-1 text-sm font-bold">
                  {(user?.user?.name || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-y justify-between gap-3 px-20p py-3 bg-b-neutral-3 rounded-24"
      >
        <div className="flex items-center gap-3">
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
        <button
          type="submit"
          className="btn btn-c-md btn-primary rounded-12"
        >
          <i className="ti ti-send icon-24"></i>
        </button>
      </form>
    </div>
  );
};

export default AthenaAIChat;
