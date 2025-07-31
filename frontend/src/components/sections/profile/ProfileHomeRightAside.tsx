import Image from "next/image";
import Link from "next/link";
import avatar9 from "@public/images/users/avatar9.png";
import avatar10 from "@public/images/users/avatar10.png";
import avatar11 from "@public/images/users/avatar11.png";
import avatar12 from "@public/images/users/avatar12.png";
import avatar13 from "@public/images/users/avatar13.png";
import avatar14 from "@public/images/users/avatar14.png";

import gallery1 from "@public/images/gallery/galleryPhoto1.png";
import gallery2 from "@public/images/gallery/galleryPhoto2.png";
import gallery3 from "@public/images/gallery/galleryPhoto3.png";
import gallery4 from "@public/images/gallery/galleryPhoto4.png";
import gallery5 from "@public/images/gallery/galleryPhoto5.png";
import gallery6 from "@public/images/gallery/galleryPhoto6.png";
import thumbnail3 from "@public/images/videothumbnails/thumbnail3.png";
import thumbnail4 from "@public/images/videothumbnails/thumbnail4.png";

const friends = [
  { id: 1, name: "Robert Fox", image: avatar9 },
  { id: 2, name: "Wade Warren", image: avatar10 },
  { id: 3, name: "Theresa Webb", image: avatar11 },
  { id: 4, name: "Albert Flores", image: avatar12 },
  { id: 5, name: "Albert Flores", image: avatar13 },
  { id: 6, name: "Courtney Henry", image: avatar14 },
];

const photos = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const videos = [
  {
    id: 1,
    thumbnail: thumbnail3,
    url: "https://www.youtube.com/embed/mUxzKVrSAjs",
  },
  {
    id: 2,
    thumbnail: thumbnail4,
    url: "https://www.youtube.com/embed/mUxzKVrSAjs",
  },
];

const ProfileHomeRightAside = () => {
  return (
    <aside className="xxl:sticky xxl:top-30">
      <div className="grid grid-cols-1 gap-30p *:bg-b-neutral-3 *:rounded-12 *:py-32p *:px-40p xxl:max-h-screen xxl:overflow-y-auto scrollbar-sm">
        {/* Friends Section */}
        <div>
          <div className="flex items-center justify-between gap-24p">
            <div>
              <h3 className="heading-3 text-w-neutral-1 mb-1">Friends</h3>
              <span>{friends.length} Friends</span>
            </div>
            <Link
              href="#"
              className="text-medium text-w-neutral-1 hover:text-primary"
            >
              See All
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-x-20p gap-y-30p my-20p">
            {friends.map((friend) => (
              <div key={friend.id}>
                <Image
                  className="w-full sm:h-[136px] h-24 object-cover aspect-square rounded-12 mb-3"
                  src={friend.image}
                  alt={friend.name}
                  width={136}
                  height={136}
                />
                <Link
                  href="/profile"
                  className="text-m-semi-bold text-w-neutral-1 link-1 line-clamp-1"
                >
                  {friend.name}
                </Link>
              </div>
            ))}
          </div>
          <Link href="#" className="btn btn-md btn-neutral-2 rounded-12 w-full">
            See All
          </Link>
        </div>

        {/* Photos Section */}
        <div>
          <h3 className="heading-3 text-w-neutral-1">
            Photos <span className="h3 span text-primary">{photos.length}</span>
          </h3>
          <div className="grid grid-cols-3 gap-x-20p gap-y-30p my-20p">
            {photos.map((photo, index) => (
              <div key={index} className="overflow-hidden rounded-12">
                <Image
                  className="w-full sm:h-[136px] h-24 object-cover aspect-square rounded-12 hover:scale-105 mb-3 transition-1"
                  src={photo}
                  alt="profile photo"
                  width={136}
                  height={136}
                />
              </div>
            ))}
          </div>
          <Link href="#" className="btn btn-md btn-neutral-2 rounded-12 w-full">
            See All
          </Link>
        </div>

        {/* Videos Section */}
        <div>
          <h3 className="heading-3 text-w-neutral-1">
            Videos <span className="h3 span text-primary">{videos.length}</span>
          </h3>
          <div className="grid grid-cols-1 gap-20p mt-20p">
            {videos?.map((video, idx) => (
              <div
                key={idx}
                className="*:w-full *:h-[246px] rounded-12 overflow-hidden"
              >
                <div className="plyr__video-embed player relative">
                  <Image
                    className="plyr_custom_poster"
                    src={video.thumbnail}
                    alt="poster"
                    width={300}
                    height={246}
                  />
                  <iframe
                    src={video.url}
                    allowFullScreen
                    allow="autoplay"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProfileHomeRightAside;
