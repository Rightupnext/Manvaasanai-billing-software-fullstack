import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import RightUpnext from "../images/Rightup next.jpg";
import { FiPlusSquare } from "react-icons/fi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GoPeople } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineControlPointDuplicate } from "react-icons/md";
function Layout({ children }) {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const location = useLocation();
  const handleOpen = () => {
    setSideBarOpen(!sideBarOpen);
  };
  const handleClose = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <>
      <>
        <button
          onClick={handleOpen}
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            sideBarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <nav className="bg-white shadow-xl h-screen fixed top-0 left-0 min-w-[250px] py-6 font-[sans-serif] overflow-auto">
            <div className="relative flex flex-col h-full">
              <a href="javascript:void(0)" className="text-center">
                <img
                  src={RightUpnext}
                  alt="logo"
                  className="w-[160px] inline "
                />
              </a>
              <ul className="space-y-3 my-8 flex-1">
                <li onClick={handleClose}>
                  <Link
                    to="dashboard"
                    className={`text-sm flex items-center px-8 py-4 transition-all ${
                      location.pathname === "/dashboard"
                        ? "text-[#007bff] border-r-[5px] border-[#077bff] bg-gray-100"
                        : "text-black hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-[18px] h-[18px] mr-4"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                        data-original="#000000"
                      />
                    </svg>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li onClick={handleClose}>
                  <Link
                    to="/invoice"
                    className={`text-sm flex items-center px-8 py-4 transition-all ${
                      location.pathname === "/invoice"
                        ? "text-[#007bff] border-r-[5px] border-[#077bff] bg-gray-100"
                        : "text-black hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100"
                    }`}
                  >
                    <FiPlusSquare className="w-[24px] h-[24px] mr-4" />
                    <span>Create</span>
                  </Link>
                </li>
                <li onClick={handleClose}>
                  <Link
                    to="/invoices"
                    className={`text-sm flex items-center px-8 py-4 transition-all ${
                      location.pathname === "/invoices"
                        ? "text-[#007bff] border-r-[5px] border-[#077bff] bg-gray-100"
                        : "text-black hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100"
                    }`}
                  >
                    <LiaFileInvoiceDollarSolid className="w-[24px] h-[24px] mr-4" />
                    <span>Invoices</span>
                  </Link>
                </li>
                <li onClick={handleClose}>
                  <Link
                    to="/customers"
                    className={`text-sm flex items-center px-8 py-4 transition-all ${
                      location.pathname === "/customers"
                        ? "text-[#007bff] border-r-[5px] border-[#077bff] bg-gray-100"
                        : "text-black hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100"
                    }`}
                  >
                    <GoPeople className="w-[24px] h-[24px] mr-4" />
                    <span>Customers</span>
                  </Link>
                </li>
                <li onClick={handleClose}>
                  <Link
                    to="addstock"
                    className={`text-sm flex items-center px-8 py-4 transition-all ${
                      location.pathname === "/addstock"
                        ? "text-[#007bff] border-r-[5px] border-[#077bff] bg-gray-100"
                        : "text-black hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100"
                    }`}
                  >
                    <IoCreateOutline className="w-[22px] h-[22px] mr-4 " />
                    <span>Create-Stock's</span>
                  </Link>
                </li>
                <li onClick={handleClose}>
                  <Link
                    to="addCategory"
                    className={`text-sm flex items-center px-8 py-4 transition-all ${
                      location.pathname === "/addCategory"
                        ? "text-[#007bff] border-r-[5px] border-[#077bff] bg-gray-100"
                        : "text-black hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100"
                    }`}
                  >
                    <MdOutlineControlPointDuplicate className="w-[24px] h-[24px] mr-4" />
                    <span>Add - Category</span>
                  </Link>
                </li>
              </ul>
          <div className="flex flex-wrap items-center cursor-pointer border-t border-gray-300 px-4 py-4">
          <Link to="/settings">
          {/* <img src='https://readymadeui.com/profile.webp' class="w-9 h-9 rounded-full border-white" /> */}
          <div className="ml-4">
            <p className="text-sm text-black">Settings</p>
            <p className="text-xs text-gray-500 mt-0.5">Active your account</p>
          </div>
          </Link>
          </div>
            </div>
          </nav>
        </aside>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            {children}
          </div>
        </div>
      </>
    </>
  );
}

export default Layout;
