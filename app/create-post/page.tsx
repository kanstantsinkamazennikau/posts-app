import getCurrentUser from "@/app/actions/getCurrentUser";
import PostForm from "@/app/create-post/PostForm";
import SkeletonPulseButton from "@/components/SkeletonPulseButton";
import { useSession } from "next-auth/react";

const CreatePost = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return "Unauthorized";
  }

  return <PostForm currentUser={currentUser} />;
};

export default CreatePost;
