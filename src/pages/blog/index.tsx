"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Dialog } from "@headlessui/react";
import Navbar from "@/components/Fragments/navbar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// import SkeletonBlog from "@/app/components/CardSkeleton";

export default function BlogPage() {
  const [blog, setBlog] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchBlog = async () => {
    setIsloading(true);
    try {
      setTimeout(async () => {
        const res = await axiosInstance.get("/posts");
        setBlog(res.data);
        setIsloading(false);
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const skeletonCard = () => {
    return (
      <>
        <SkeletonTheme>
          {["", "", "", "", "", ""].map((e, i) => (
            <div key={i}>
              <div className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900">
                  <Skeleton width={200} height={20} />
                </p>
                <p className="mt-3 text-base text-gray-500">
                  <Skeleton width="100%" height={100} />
                </p>
              </div>
              <div className="mt-3 flex border-t border-gray-100 pt-8">
                <div className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  <Skeleton width={200} height={20} />
                </div>
              </div>
            </div>
          ))}
        </SkeletonTheme>
      </>
    );
  };

  const renderBlog = () => {
    return (
      blog.length > 0 &&
      blog.map((blog: any) => (
        <div key={blog.title}>
          <Link href={`/blog/${blog.id}`} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900">{blog.title}</p>
            <p className="mt-3 text-base text-gray-500">{blog.body}</p>
          </Link>
          <div className="mt-3 flex border-t border-gray-100 pt-8">
            <Link
              href={`/blog/${blog.id}`}
              className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              See Comments <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      ))
    );
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div>
        <div className="bg-white lg:py-20 sm:py-20 relative">
          
          <div
            className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl "
            aria-hidden="true">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="relative mx-auto max-w-7xl lg:mt-2 mt-6  px-6 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                List Blog
              </h2>
              <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-5">
                <p className="text-xl text-gray-500">
                  Learn how to grow your business with our expert advice.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-16 pt-2 lg:pt-10 lg:grid-cols-1 lg:gap-x-5 lg:gap-y-12">
              {isLoading ? skeletonCard() : renderBlog()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
