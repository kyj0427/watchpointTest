'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/shared/Breadcumb'; 
import { headerBannerType, NavLinkProps } from '@/config/types';

const FaqDetailPage = () => {
  const [tab, setTab] = useState<'write' | 'history'>('write');

  const navLinks: NavLinkProps[] = [
    { id: 1, url: '/', label: '홈' },
    { id: 2, url: '', label: '1 : 1 문의하기' },
  ];

  const headerData: headerBannerType = {
    title: '1 : 1 문의하기',
    navLinks,
  };

  return (
    <>
      <Breadcrumb breadcrumb={headerData} />

      <main className="min-h-screen bg-[#0A0A0A] text-white py-12">
        <div className="container mx-auto max-w-3xl px-4">
          {/* tab button */}
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setTab('write')}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition ${
                tab === 'write'
                  ? 'bg-primary text-white'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              1:1 문의하기
            </button>
            <button
              onClick={() => setTab('history')}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition ${
                tab === 'history'
                  ? 'bg-primary text-white'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              내 문의내역
            </button>
          </div>

          {/*contents */}
          <div className="bg-neutral-800 p-6 rounded-xl shadow-md">
            {tab === 'write' ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">1:1 문의하기</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block mb-1 text-sm">제목</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded bg-neutral-700 text-white"
                      placeholder="문의 제목을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">내용</label>
                    <textarea
                      className="w-full px-4 py-2 rounded bg-neutral-700 text-white h-40"
                      placeholder="문의 내용을 입력하세요"
                    />
                  </div>
                   <div>
                        <label className="block mb-1 text-sm">이미지 첨부</label>
                        <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="block w-full text-sm text-neutral-300 file:mr-4 file:py-2 file:px-4
                                    file:rounded file:border-0 file:text-sm file:font-semibold
                                    file:bg-gray-600 file:text-white hover:file:bg-primary-dark"
                        />
                    </div>

                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
                  >
                    제출하기
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">내 문의내역</h2>
                <ul className="space-y-4">
                  <li className="bg-neutral-700 p-4 rounded">
                    <p className="font-semibold">게임 내 보상 관련 문의</p>
                    <p className="text-sm text-neutral-300">2025.08.01 제출 • 답변 완료</p>
                  </li>
                  <li className="bg-neutral-700 p-4 rounded">
                    <p className="font-semibold">계정 연동 오류</p>
                    <p className="text-sm text-neutral-300">2025.07.28 제출 • 처리중</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default FaqDetailPage;
