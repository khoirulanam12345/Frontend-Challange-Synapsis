import { useMutation } from "@tanstack/react-query";
import { useUsers } from "../api/users/useUsers";
import { useFormik } from "formik";
import { axiosInstance } from "@/lib/axios";
import { ToastContainer, toast } from "react-toastify";
import { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { dialogToast } from "@/components/Dialog/toast";

import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Fragments/navbar";

export default function Users() {
  interface IUser {
    name: string;
  }
  const {
    data: dataUsers,
    isLoading: usersIsLoading,
    refetch: refetchUsers,
  } = useUsers();
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState({
    modal: false,
    userId: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [keyword, setKeyword] = useState();

  const [list, setList] = useState([]);

  const getData = (list: any, keyword: any) => {
    if (keyword.trim() != "" && keyword.length > 0) {
    } else {
      setList(list);
    }
  };

  const handleFormInput = (event: any) => {
    formik.setFieldValue(event.target.name, event.target.value);
    console.log(event.target.value);
    
  };

  //Dialog Delete
  const dialogDelete = () => {
    return (
      <Transition.Root show={open.modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setOpen({ ...open, modal: false })}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900">
                        Delete User
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete user? All of your data
                          will be permanently removed from our servers forever.
                          This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => deleteUsers(open.userId)}>
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen({ ...open, modal: false })}
                      ref={cancelButtonRef}>
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };

  //Function
  const onAddClick = () => {
    setShowForm(!showForm);
    resetForm();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const onEditClick = (users: any) => {
    formik.setFieldValue("id", users.id);
    formik.setFieldValue("name", users.name);
    formik.setFieldValue("email", users.email);
    formik.setFieldValue("gender", users.gender);
    formik.setFieldValue("status", users.status);
    setShowForm(true);
    scrollToTop();
  };

  const renderUsers = (keyword: any) => {
    var list = dataUsers?.data;
    if (keyword?.trim() != "" && keyword?.length > 0) {
      list = dataUsers?.data.filter(
        (e: any) =>
          e.name.toLowerCase().includes(keyword.toLowerCase()) ||
          e.email.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    return list.map((users: any) => (
      <tr key={users.name}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          {users.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {users.email}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {users.gender}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {users.status}
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
          <button
            type="button"
            onClick={() => onEditClick(users)}
            className="rounded-md bg-blue-600 mr-3 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Edit
          </button>

          <button
            type="button"
            onClick={() => setOpen({ ...open, modal: true, userId: users.id })}
            className="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Delete
          </button>
        </td>
      </tr>
    ));
  };
  const resetForm = () => {
    formik.setFieldValue("name", "");
    formik.setFieldValue("email", "");
    formik.setFieldValue("gender", "");
    formik.setFieldValue("status", "");
    formik.setFieldValue("id", "");
  };

  //Formik

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      status: "",
      id: "",
    },
    onSubmit: async () => {
      const { id } = formik.values;

      try {
        if (id) {
          editUsers();
        } else {
          createUsers();
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  //Create Users

  const { mutate: createUsers } = useMutation({
    mutationFn: async () => {
      const { name, email, gender, status, id } = formik.values;
      const usersResponse = await axiosInstance.post("/users", {
        name: name,
        email: email,
        gender: gender,
        status: status,
      });
      return usersResponse;
    },
    onSuccess: () => {
      refetchUsers();
      dialogToast("success", "User Added");
      resetForm();
    },
  });

  //Delete Users

  const { mutate: deleteUsers } = useMutation({
    mutationFn: async (id: any) => {
      const usersResponse = await axiosInstance.delete(`/users/${id}`);
      return usersResponse;
    },
    onSuccess: () => {
      refetchUsers();
      setOpen({
        modal: false,
        userId: "",
      });
      dialogToast("delete", "User Deleted");
    },
  });

  //Edit Users

  const { mutate: editUsers } = useMutation({
    mutationFn: async () => {
      const { name, email, gender, status, id } = formik.values;
      const usersResponse = await axiosInstance.patch(`/users/${id}`, {
        name: name,
        email: email,
        gender: gender,
        status: status,
        id: id,
      });
      return usersResponse;
    },
    onSuccess: () => {
      refetchUsers();
      dialogToast("success", "User Edited");
      resetForm();
    },
  });

  const optionsGender = [
    { value: "male", text: "Male" },
    { value: "female", text: "Female" },
  ];

  const optionsStatus = [
    { value: "active", text: "Active" },
    { value: "inactive", text: "Inactive" },
  ];


  return (
    <>
      <Navbar></Navbar>
      {dialogDelete()}
      <div className=" lg:mt-2 mt-6 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 mt-10">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <div className=" font-semibold text-3xl text-gray-900">Users</div>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name,
                title, email and role.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                onClick={() => onAddClick()}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Add user
              </button>
            </div>
          </div>

          {showForm && (
            <form onSubmit={formik.handleSubmit}>
              <input
                onChange={handleFormInput}
                type="hidden"
                name="id"
                id="id"
                value={formik.values.id}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="sm:col-span-3 mt-10">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleFormInput}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Input your name"
                    value={formik.values.name}
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 mt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleFormInput}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Input your email"
                    value={formik.values.email}
                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3 mt-5">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Gender
                </label>

                <div className="mt-2">
                  <select
                    id="gender"
                    name="gender"
                    className="mt-2 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formik.values.gender}
                    onChange={handleFormInput}>
                    <option disabled={true} value="">
                      Select Gender
                    </option>
                    {optionsGender.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                  
                </div>
              </div>
              <div className="sm:col-span-3 mt-5">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Status
                </label>
                <div className="mt-2">
                <select
                    id="status"
                    name="status"
                    className="mt-2 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formik.values.status}
                    onChange={handleFormInput}>
                    {optionsStatus.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                 
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Save
                </button>
                <ToastContainer />
              </div>
            </form>
          )}

          <form className="mt-6 flex flex-col sm:flex-row lg:mt-6 lg:justify-end">
            <div>
              <input
                id="serach"
                name="search"
                type="text"
                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 lg:max-w-xs"
                placeholder="Search User"
                onKeyUp={(e: any) => setKeyword(e.target.value)}
              />
            </div>
          </form>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Gender
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {usersIsLoading ? "" : renderUsers(keyword)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
