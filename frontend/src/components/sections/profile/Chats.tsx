import Image from "next/image";
import Link from "next/link";
import avatar1 from "@public/images/users/avatar1.png";
import avatar3 from "@public/images/users/avatar3.png";
import { chatList } from "@public/data/chatList";
import { IconPhone } from "@tabler/icons-react";

const Chats = () => {
  return (
    <section className="section-py">
      <div className="container pt-60p">
        <h2 className="heading-2 text-w-neutral-1 mb-30p">Chats</h2>
        <div className="grid grid-cols-12 gap-30p">
          <div className="xxl:col-span-4 xl:col-span-5 col-span-12 max-xl:hidden">
            <div className="h-screen overflow-y-auto scrollbar-sm">
              <div className="grid grid-cols-1 gap-2 *:py-24p *:px-30p *:flex *:gap-20p *:rounded-12 *:bg-glass-7">
                {chatList?.map((item, idx) => (
                  <Link key={idx} href="#">
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
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="xxl:col-span-8 xl:col-span-7 col-span-12">
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
                      Leslie Alexander
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
              <div className="h-screen overflow-y-auto scrollbar-sm">
                <div className="p-30p grid grid-cols-1 lg:gap-y-60p gap-y-40p">
                  <div className="flex justify-start">
                    <div className="flex sm:items-end max-sm:flex-col gap-x-30p gap-y-20p">
                      <Image
                        className="shrink-0 avatar size-60p"
                        src={avatar1}
                        width={60}
                        height={60}
                        alt="user"
                      />
                      <div className="flex sm:items-end max-sm:flex-col gap-x-30p gap-y-20p">
                        <div className="p-24p bg-glass-1 rounded-t-3xl rounded-br-3xl text-base text-w-neutral-3 max-w-[566px]">
                          <p>
                            We invite you to treat yourself to the gift of
                            relaxation. Whether you&apos;re seeking relief from
                            aches and pains, stress reduction, or a moment of
                            pure indulgence,
                          </p>
                        </div>
                        <span className="shrink-0 text-base text-w-neutral-4 ">
                          3:15 PM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="flex max-sm:flex-col-reverse items-end gap-x-30p gap-y-20p">
                      <div className="flex items-end max-sm:flex-col-reverse gap-x-30p gap-y-20p">
                        <span className="shrink-0 text-base text-w-neutral-4">
                          3:16 PM
                        </span>
                        <div className="p-24p bg-glass-8 rounded-t-3xl rounded-bl-3xl text-base text-w-neutral-3 max-w-[566px]">
                          <p>Our massage therapy has something for everyone.</p>
                        </div>
                      </div>
                      <Image
                        className="shrink-0 avatar size-60p"
                        src={avatar3}
                        width={60}
                        height={60}
                        alt="user"
                      />
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="flex sm:items-end max-sm:flex-col gap-x-30p gap-y-20p">
                      <Image
                        className="shrink-0 avatar size-60p"
                        src={avatar1}
                        width={60}
                        height={60}
                        alt="user"
                      />
                      <div className="flex sm:items-end max-sm:flex-col gap-x-30p gap-y-20p">
                        <div className="p-24p bg-glass-1 rounded-t-3xl rounded-br-3xl text-base text-w-neutral-3 max-w-[566px]">
                          <p>Whether you&apos;re seeking a gentle</p>
                        </div>
                        <span className="shrink-0 text-base text-w-neutral-4 ">
                          3:15 PM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="flex max-sm:flex-col-reverse items-end gap-x-30p gap-y-20p">
                      <div className="flex items-end max-sm:flex-col-reverse gap-x-30p gap-y-20p">
                        <span className="shrink-0 text-base text-w-neutral-4">
                          3:16 PM
                        </span>
                        <div className="p-24p bg-glass-8 rounded-t-3xl rounded-bl-3xl text-base text-w-neutral-3 max-w-[566px]">
                          <p>
                            Your comfort and well-being are of utmost importance
                            to us. If you have any health concerns or specific
                            needs,
                          </p>
                        </div>
                      </div>
                      <Image
                        className="shrink-0 avatar size-60p"
                        src={avatar3}
                        width={60}
                        height={60}
                        alt="user"
                      />
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="flex sm:items-end max-sm:flex-col gap-x-30p gap-y-20p">
                      <Image
                        className="shrink-0 avatar size-60p"
                        src={avatar1}
                        width={60}
                        height={60}
                        alt="user"
                      />
                      <div className="flex sm:items-end max-sm:flex-col gap-x-30p gap-y-20p">
                        <div className="p-24p bg-glass-1 rounded-t-3xl rounded-br-3xl text-base text-w-neutral-3 max-w-[566px]">
                          <p>
                            Soothing music, and the aroma of essential oils all
                            contribute to enhancing your massage experience.
                          </p>
                        </div>
                        <span className="shrink-0 text-base text-w-neutral-4 ">
                          3:15 PM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="flex max-sm:flex-col-reverse items-end gap-x-30p gap-y-20p">
                      <div className="flex items-end max-sm:flex-col-reverse gap-x-30p gap-y-20p">
                        <span className="shrink-0 text-base text-w-neutral-4">
                          3:16 PM
                        </span>
                        <div className="p-24p bg-glass-8 rounded-t-3xl rounded-bl-3xl text-base text-w-neutral-3 max-w-[566px]">
                          <p>Thank You</p>
                        </div>
                      </div>
                      <Image
                        className="shrink-0 avatar size-60p"
                        src={avatar3}
                        width={60}
                        height={60}
                        alt="user"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <form className="p-30p flex items-center justify-between gap-20p border-t border-shap">
                <input
                  className="placeholder:text-w-neutral-1 bg-transparent"
                  type="text"
                  placeholder="Type Your message here....."
                />
                <div className="flex-y gap-x-24p">
                  <button type="button" className="icon-24 text-w-neutral-1">
                    <i className="ti ti-link"></i>
                  </button>
                  <button type="button" className="icon-24 text-w-neutral-1">
                    <i className="ti ti-mood-smile"></i>
                  </button>
                  <button
                    type="button"
                    className="size-40p icon-24 btn-primary rounded-12"
                  >
                    <i className="ti ti-send"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chats;
