import { useRouter } from "next/router";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
const navigation = [
  { name: "Blog", href: "/blog", current: true },
  { name: "Users", href: "/users", current: false },
];

export default function Navbar() {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  const router = useRouter();
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden  sm:block">
                    <div className="flex space-x-4">
                      <Link
                        href="/blog"
                        className={`inline-flex items-center px-1  text-sm font-medium w-28 text-center justify-center  ${
                          router.pathname == `/blog` ||
                          router.pathname == `/blog/[...slug]`
                            ? "bg-gray-900 text-white block rounded-md py-3 px-10"
                            : "border-transparent text-white"
                        }`}>
                        Blog
                      </Link>
                      <Link
                        href="/users"
                        className={`inline-flex items-center ${
                          router.pathname === "/users"
                            ? "bg-gray-900 text-white block rounded-md py-3 px-10"
                            : "border-transparent text-white"
                        }  px-1 text-sm font-medium   hover:text-white w-28 text-center justify-center !ml-1`}>
                        Users
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Disclosure.Button
                  as="a"
                  href="/blog"
                  className={` ${
                    router.pathname == `/blog` ||
                    router.pathname == `/blog/[...slug]`
                      ? "bg-gray-900 text-white block rounded-md py-3 px-10"
                      : "border-transparent text-white"
                  }  block rounded-md px-3 py-2 text-base font-medium`}>
                  Blog
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/users"
                  className={` ${
                    router.pathname === "/users"
                      ? "bg-gray-900 text-white block rounded-md py-3 px-10"
                      : "border-transparent text-white"
                  }  block rounded-md px-3 py-2 text-base font-medium`}>
                  Users
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* <nav className="lg:bg-indigo-800 shadow fixed z-10 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex  py-5  justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
               
              </div>
              <div className="hidden  sm:flex sm:space-x-8">
                <Link
                  href="/blog"
                  className={`inline-flex items-center px-1  text-sm font-medium w-28 text-center justify-center  ${
                    router.pathname == `/blog` ||
                    router.pathname == `/blog/[...slug]`
                      ? "bg-indigo-500 text-white block rounded-md py-3 px-10"
                      : "border-transparent text-white"
                  }`}>
                  Blog
                </Link>
                <Link
                  href="/users"
                  className={`inline-flex items-center ${
                    router.pathname === "/users"
                      ? "bg-indigo-500 text-white block rounded-md py-3 px-10"
                      : "border-transparent text-white"
                  }  px-1 text-sm font-medium   hover:text-white w-28 text-center justify-center !ml-1`}>
                  Users
                </Link>
              </div>
            </div>

           
          </div>
        </div>

        <div className="sm:hidden mt-2" id="mobile-menu">
          <div className="space-y-1 pb-3 pt-2">
            <a
              href="#"
              className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-white mb-3">
              Blog
            </a>
            <a
              href="#"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
              User
            </a>
          </div>
        </div>
      </nav> */}
    </>
  );
}
