import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Navbar from "@/components/Fragments/navbar";

export default function DetailBlogPage() {
  const router = useRouter();
  const [detailComment, setDetailComment] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchComment = async () => {
    setIsloading(true);
    try {
      setTimeout(async () => {
        const res = await axiosInstance.get(
          `/posts/${router.query.slug}/comments`
        );
        setDetailComment(res.data);
        setIsloading(false);
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const SkeletonCard = () => {
    return (
      <>
        {["", "", "", "", "", ""].map((e, i) => (
          <div key={i} className="flex space-x-4 text-sm text-gray-500">
            <div className="border-t border-gray-200 flex-1 py-10">
              <h3 className="font-medium text-gray-900">
                <Skeleton width={300} height={10} />
              </h3>
              <div>
                <Skeleton width={200} height={10} />
              </div>
              <div className="prose prose-sm mt-4 max-w-none text-gray-500">
                <Skeleton width={200} height={20} />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderComment = () => {
    return detailComment.map((comment: any) => (
      <div key={comment.id} className="flex space-x-4 text-sm text-gray-500">
        <div className="border-t border-gray-200 flex-1 py-10">
          <h3 className="font-medium text-gray-900">{comment.name}</h3>
          <div>{comment.email}</div>
          <div
            className="prose prose-sm mt-4 max-w-none text-gray-500"
            dangerouslySetInnerHTML={{ __html: comment.body }}
          />
        </div>
      </div>
    ));
  };
  useEffect(() => {
    fetchComment();
  },[]);

  return (
    <>
      <Navbar></Navbar>
      <div className="bg-white lg:py-20 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:mt-2 mt-6 ">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Detail Comment
            </h2>
            <div className="mt-10">{isLoading ? SkeletonCard() : renderComment()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
