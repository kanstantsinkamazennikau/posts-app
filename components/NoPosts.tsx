import { Post } from "@prisma/client";
import Image from "next/image";
import sadCircle from "@/images/sadCircle.svg";

export default function NoPosts() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="mb-2">There are no posts</div>
      <Image
        src={sadCircle}
        alt="sad-circle"
        width={40}
        height={40}
        className="m-auto"
      />
    </div>
  );
}
