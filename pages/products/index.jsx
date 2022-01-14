import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { HiX } from 'react-icons/hi';
import { HiChevronDown, HiFilter, HiMinusSm, HiPlusSm, HiViewGrid } from 'react-icons/hi';

import { classNames } from '@/utils/helpers';

import Main from '@/components/atoms/Main';
import AppLayout from '@/components/templates/AppLayout';

import CardProduct from '@/components/molecules/ProductCard';
import callAPI from '@/config/api';

const sortOptions = [
  { name: 'Paling Populer', href: '#', current: true },
  { name: 'Rating Bagus', href: '#', current: false },
  { name: 'Terbaru', href: '#', current: false },
  { name: 'Harga: Murah ke Mahal', href: '#', current: false },
  { name: 'Harga: Mahal ke Murah', href: '#', current: false },
];
const subCategories = [
  { name: 'Sayuran Hijau', href: '#' },
  { name: 'Sayuran Buah dan Biji', href: '#' },
  { name: 'Buah - Buahan', href: '#' },
  { name: 'Pupuk Kebun', href: '#' },
  { name: 'Alat - Alat Pertanian', href: '#' },
];
const filters = [
  {
    id: 'category',
    name: 'Kategori',
    options: [
      { value: 'kategori-1', label: 'Kategori 1', checked: true },
      { value: 'kategori-2', label: 'Kategori 2', checked: false },
      { value: 'kategori-3', label: 'Kategori 3', checked: false },
      { value: 'kategori-4', label: 'Kategori 4', checked: false },
      { value: 'kategori-5', label: 'Kategori 5', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Ukuran',
    options: [
      { value: '2l', label: '2L', checked: true },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: false },
    ],
  },
];

export default function Products({ data }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data !== null) {
      setProducts(data.data.data);
    }
  }, [data]);

  return (
    <Main className='container bg-white'>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as='div' className='fixed inset-0 z-40 flex lg:hidden' onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'>
              <div className='relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl'>
                <div className='flex items-center justify-between px-4'>
                  <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                  <button
                    type='button'
                    className='flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md'
                    onClick={() => setMobileFiltersOpen(false)}>
                    <span className='sr-only'>Close menu</span>
                    <HiX className='w-6 h-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Filters */}
                <form className='mt-4 border-t border-gray-200'>
                  <h3 className='sr-only'>Categories</h3>
                  <ul role='list' className='px-2 py-3 font-medium text-gray-900'>
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className='block px-2 py-3'>
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure as='div' key={section.id} className='px-4 py-6 border-t border-gray-200'>
                      {({ open }) => (
                        <>
                          <h3 className='flow-root -mx-2 -my-3'>
                            <Disclosure.Button className='flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500'>
                              <span className='font-medium text-gray-900'>{section.name}</span>
                              <span className='flex items-center ml-6'>
                                {open ? (
                                  <HiMinusSm className='w-5 h-5' aria-hidden='true' />
                                ) : (
                                  <HiPlusSm className='w-5 h-5' aria-hidden='true' />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className='pt-6'>
                            <div className='space-y-6'>
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className='flex items-center'>
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type='checkbox'
                                    defaultChecked={option.checked}
                                    className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className='flex-1 min-w-0 ml-3 text-gray-500'>
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <div>
          <div className='relative z-10 flex items-center justify-between pt-24 pb-6 border-b border-gray-200'>
            <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>Semua Produk</h1>

            <div className='flex items-center'>
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <Menu.Button className='inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900'>
                    Sortir
                    <HiChevronDown
                      className='flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
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
                  <Menu.Items className='absolute right-0 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm',
                              )}>
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type='button' className='p-2 ml-5 -m-2 text-gray-400 sm:ml-7 hover:text-gray-500'>
                <span className='sr-only'>View grid</span>
                <HiViewGrid className='w-5 h-5' aria-hidden='true' />
              </button>
              <button
                type='button'
                className='p-2 ml-4 -m-2 text-gray-400 sm:ml-6 hover:text-gray-500 lg:hidden'
                onClick={() => setMobileFiltersOpen(true)}>
                <span className='sr-only'>Filters</span>
                <HiFilter className='w-5 h-5' aria-hidden='true' />
              </button>
            </div>
          </div>

          <section aria-labelledby='products-heading' className='pt-6 pb-24'>
            <h2 id='products-heading' className='sr-only'>
              Products
            </h2>

            <div className='grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10'>
              {/* Filters */}
              <form className='sticky hidden lg:block top-24'>
                <h3 className='sr-only'>Categories</h3>
                <ul role='list' className='pb-6 space-y-4 text-sm font-medium text-gray-900 border-b border-gray-200'>
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure as='div' key={section.id} className='py-6 border-b border-gray-200'>
                    {({ open }) => (
                      <>
                        <h3 className='flow-root -my-3'>
                          <Disclosure.Button className='flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500'>
                            <span className='font-medium text-gray-900'>{section.name}</span>
                            <span className='flex items-center ml-6'>
                              {open ? (
                                <HiMinusSm className='w-5 h-5' aria-hidden='true' />
                              ) : (
                                <HiPlusSm className='w-5 h-5' aria-hidden='true' />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className='pt-6'>
                          <div className='space-y-4'>
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className='flex items-center'>
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type='checkbox'
                                  defaultChecked={option.checked}
                                  className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className='ml-3 text-sm text-gray-600'>
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className='lg:col-span-3'>
                {/* Replace with your content */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-8'>
                  {products.map((product, i) => (
                    <CardProduct key={i} product={product} />
                  ))}
                </div>
                {/* /End replace */}
                <div className='flex justify-center pt-10 space-x-5'>
                  <button type='button' className='w-full py-2 text-white bg-primary-500 rounded-xl'>
                    Sebelumnya
                  </button>
                  <button type='button' className='w-full py-2 text-white bg-primary-500 rounded-xl'>
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Main>
  );
}

Products.layoutProps = {
  Layout: AppLayout,
  meta: {
    title: 'Produk - Produk',
  },
};

export const getServerSideProps = async () => {
  const { data } = await callAPI({
    path: '/api/products',
    method: 'GET',
  });

  return {
    props: {
      data,
    },
  };
};
