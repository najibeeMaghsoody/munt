import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="ml-6 sticky top-0 left-0 ">
      <aside
        id="default-sidebar"
        className="top-0 left-0 z-40 w-20 h-screen transition-transform -translate-x-full sm:translate-x-0 "
        aria-label="Sidebar"
      >
        <div className="flex justify-center items-center h-screen">
          {/* Light Mode Navbar */}
          <div className="flex flex-col items-center space-y-4 bg-white p-4 rounded-full shadow-md">
            <ul className="space-y-2 font-medium">
              <div className="bg-[#f6f0f0] py-2 px-2 pt-4 pb-4 rounded-full ">
                <li className="mb-7">
                  <Link
                    to={""}
                    className="flex items-center p-3 rounded-full bg-[#bdb395] group cursor-pointer"
                  >
                    <svg
                      className="shrink-0 w-5 h-5 text-zinc-50 transition duration-75"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    to={""}
                    className="flex items-center p-3 rounded-full bg-[#bdb395] group cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5 text-zinc-50 transition duration-75"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 5v3m0 0v3m0-3h-3m3 0h3m-3.3556 7.0913c-1.6389 0-2.58-.2487-3.7085-.9576-1.1285-.709-2.0191-1.7196-2.5631-2.9086-.54402-1.1891-.71806-2.50523-.5009-3.78809.2172-1.28287.8161-2.47705 1.724-3.43701-1.3427.20491-2.60689.74436-3.66765 1.56511-1.06077.82074-1.88149 1.8944-2.38113 3.11496-.49965 1.22056-.66094 2.54583-.46795 3.84493.19298 1.2992.73357 2.5273 1.56839 3.563.83482 1.0358 1.93501 1.8435 3.19194 2.3433 1.2569.4999 2.6272.6745 3.9754.5068 1.3482-.1676 2.6279-.6719 3.7125-1.463 1.0847-.7911 1.937-1.8416 2.4726-3.0478-1.0063.5199-1.9323.664-3.3556.664Z"
                      />
                    </svg>
                  </Link>
                </li>
              </div>
              <div className=" py-2 px-2 pt-3 pb-3 rounded-full ">
                <li className="mb-5">
                  <Link
                    to={"/dashboard"}
                    className="flex items-center p-3 rounded-full bg-[#bdb395] cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5 text-zinc-50 transition duration-75"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link
                    to={"/category"}
                    className="flex items-center p-3 rounded-full bg-[#bdb395] group cursor-pointer"
                  >
                    <svg
                      className="shrink-0 w-5 h-5 text-zinc-50 selection:transition duration-75"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                    </svg>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link
                    to={""}
                    class="flex items-center p-3 rounded-full bg-[#bdb395] group cursor-pointer"
                  >
                    <svg
                      class="w-6 h-6 text-zinc-50 selection:transition duration-75"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link
                    to={"/profile"}
                    className="flex items-center p-3 rounded-full bg-[#bdb395] group cursor-pointer"
                  >
                    <svg
                      className="shrink-0 w-5 h-5 text-zinc-50 transition duration-75"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                    </svg>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link
                    to={"/setting"}
                    className="flex items-center p-3 dark:hover:bg-gray-700 group rounded-full bg-[#bdb395] cursor-pointer"
                  >
                    <svg
                      class="w-6 h-6  text-zinc-50 transition duration-75"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
                      />
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/logout"}
                    className="flex items-center p-3 rounded-full bg-[#bdb395] group cursor-pointer"
                  >
                    <svg
                      className="shrink-0 w-5 h-5 text-zinc-50 transition duration-75"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                      />
                    </svg>
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </aside>
    </nav>
  );
};

export default Navbar;
