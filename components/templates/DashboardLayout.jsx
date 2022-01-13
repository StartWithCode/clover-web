import React, { Fragment, useEffect, useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Clover from '@/assets/images/logo-clover.png';
import Avatar from '@/assets/images/avatar.jpg';

import { Menu, Transition } from '@headlessui/react';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    current: true,
    icon: (
      <svg width='20' height='20' fill='currentColor' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'>
        <path d='M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z'></path>
      </svg>
    ),
  },
  {
    name: 'All Product',
    href: '/dashboard/all-products',
    current: false,
    icon: (
      <svg width='20' height='20' fill='currentColor' viewBox='0 0 2048 1792' xmlns='http://www.w3.org/2000/svg'>
        <path d='M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z'></path>
      </svg>
    ),
  },
  {
    name: 'Add Product',
    href: '/dashboard/add-product',
    current: false,
    icon: (
      <svg width='20' height='20' fill='currentColor' viewBox='0 0 2048 1792' xmlns='http://www.w3.org/2000/svg'>
        <path d='M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z'></path>
      </svg>
    ),
  },
  {
    name: 'Transaksi',
    href: '/dashboard/transactions',
    current: false,
    icon: (
      <svg width='20' height='20' fill='currentColor' viewBox='0 0 2048 1792' xmlns='http://www.w3.org/2000/svg'>
        <path d='M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z'></path>
      </svg>
    ),
  },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Logout', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DashboardLayout = ({ children, handleLogout }) => {
  return (
    <>
      <main className='bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative font-lato'>
        <div className='flex items-start justify-between'>
          {/* Sidebar */}
          <div className='h-screen hidden lg:block shadow-lg relative w-80'>
            <div className='bg-white h-full dark:bg-gray-700'>
              <div className='flex items-center justify-center pt-6 '>
                <Link href='/'>
                  <a className='cursor-pointer'>
                    <Image src={Clover} alt='Picture of the author' width={220} height={78} quality={100} />
                  </a>
                </Link>
              </div>
              <nav className='mt-6'>
                <div className='px-4'>
                  {/* <a
                    className='w-full text-gray-800 dark:text-white flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 border-purple-500'
                    href='#'
                  /> */}
                  {navigation.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <a
                        className='hover:bg-gray-100 rounded-lg h-12 px-4 w-full text-gray-800 dark:text-white flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start'
                        href='#'>
                        <span className='text-left'>{item.icon}</span>
                        <span className='mx-2 text-sm font-medium'>{item.name}</span>
                      </a>
                    </Link>
                  ))}
                  {/* <a
                    className="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent"
                    href="#"
                  >
                    <span className="text-left">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1728 608v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z"></path>
                      </svg>
                    </span>
                    <span className="mx-4 text-sm font-normal">Resources</span>
                  </a>
                  <a
                    className="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent"
                    href="#"
                  >
                    <span className="text-left">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 2048 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M580 461q0-41-25-66t-66-25q-43 0-76 25.5t-33 65.5q0 39 33 64.5t76 25.5q41 0 66-24.5t25-65.5zm743 507q0-28-25.5-50t-65.5-22q-27 0-49.5 22.5t-22.5 49.5q0 28 22.5 50.5t49.5 22.5q40 0 65.5-22t25.5-51zm-236-507q0-41-24.5-66t-65.5-25q-43 0-76 25.5t-33 65.5q0 39 33 64.5t76 25.5q41 0 65.5-24.5t24.5-65.5zm635 507q0-28-26-50t-65-22q-27 0-49.5 22.5t-22.5 49.5q0 28 22.5 50.5t49.5 22.5q39 0 65-22t26-51zm-266-397q-31-4-70-4-169 0-311 77t-223.5 208.5-81.5 287.5q0 78 23 152-35 3-68 3-26 0-50-1.5t-55-6.5-44.5-7-54.5-10.5-50-10.5l-253 127 72-218q-290-203-290-490 0-169 97.5-311t264-223.5 363.5-81.5q176 0 332.5 66t262 182.5 136.5 260.5zm592 561q0 117-68.5 223.5t-185.5 193.5l55 181-199-109q-150 37-218 37-169 0-311-70.5t-223.5-191.5-81.5-264 81.5-264 223.5-191.5 311-70.5q161 0 303 70.5t227.5 192 85.5 263.5z"></path>
                      </svg>
                    </span>
                    <span className="mx-4 text-sm font-normal">
                      Store feedback
                    </span>
                  </a> */}
                </div>
              </nav>
            </div>
          </div>
          {/* End of Sidebar */}
          <div className='flex flex-col w-full md:space-y-4'>
            <header className='w-full h-16 z-40 flex items-center justify-between'>
              {/* Hamburger Icon */}
              <div className='block lg:hidden ml-6'>
                <button className='flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md'>
                  <svg
                    width='20'
                    height='20'
                    className='text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 1792 1792'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path d='M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z'></path>
                  </svg>
                </button>
              </div>

              <div className='relative z-20 flex flex-col justify-end h-full px-3 md:w-full'>
                <div className='relative p-1 flex items-center w-full space-x-4 justify-end'>
                  {/* Link */}
                  <button className='flex p-2 items-center rounded-full text-gray-400 hover:text-gray-700 bg-white shadow text-md'>
                    <svg
                      width='20'
                      height='20'
                      className=''
                      fill='currentColor'
                      viewBox='0 0 1792 1792'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z'></path>
                    </svg>
                  </button>
                  {/* Chat */}
                  <button className='flex p-2 items-center rounded-full bg-white shadow text-gray-400 hover:text-gray-700 text-md'>
                    <svg
                      width='20'
                      height='20'
                      className='text-gray-400'
                      fill='currentColor'
                      viewBox='0 0 1792 1792'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M912 1696q0-16-16-16-59 0-101.5-42.5t-42.5-101.5q0-16-16-16t-16 16q0 73 51.5 124.5t124.5 51.5q16 0 16-16zm816-288q0 52-38 90t-90 38h-448q0 106-75 181t-181 75-181-75-75-181h-448q-52 0-90-38t-38-90q50-42 91-88t85-119.5 74.5-158.5 50-206 19.5-260q0-152 117-282.5t307-158.5q-8-19-8-39 0-40 28-68t68-28 68 28 28 68q0 20-8 39 190 28 307 158.5t117 282.5q0 139 19.5 260t50 206 74.5 158.5 85 119.5 91 88z'></path>
                    </svg>
                  </button>
                  <span className='w-1 h-8 rounded-lg bg-gray-200'></span>
                  <Menu as='div' className='ml-3 relative'>
                    <div>
                      <Menu.Button className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                        <span className='sr-only'>Open user menu</span>
                        <Image
                          src={Avatar}
                          alt='Picture of the author'
                          width={40}
                          height={40}
                          quality={100}
                          className='rounded-full'
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'>
                      <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => {
                              return item.name === 'Logout' ? (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                  )}
                                  onClick={() => handleLogout()}>
                                  {item.name}
                                </a>
                              ) : (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                  )}>
                                  {item.name}
                                </a>
                              );
                            }}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </header>
            {/* Content */}
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;