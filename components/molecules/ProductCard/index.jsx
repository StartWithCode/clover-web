import { formatRupiah } from '@/utils/helpers';
import Image from 'next/image';
import Link from '@/components/atoms/Link';
import { HiStar } from 'react-icons/hi';
import { MdFavorite, MdAddShoppingCart } from 'react-icons/md';
import { useCartContext } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { dispatch } = useCartContext();

  return (
    <div>
      <div className='relative group'>
        <div className='relative w-full overflow-hidden bg-gray-200 min-h-80 aspect-[4/6] rounded-xl'>
          <Image
            src={product.photos.length > 0 ? product.photos[0].product_image_path : '/images/products/kol.png'}
            alt={product.product_name}
            layout='fill'
            priority={true}
            unoptimized={true} // for handle access for bidden
            className='object-cover object-center w-full h-full lg:w-full lg:h-full'
          />
          <button type='button' className='absolute p-2 text-white top-4 right-4 bg-primary-500 rounded-xl'>
            <MdFavorite className='w-5 h-5' />
          </button>
          <div className='absolute flex items-center justify-between w-full px-4 space-x-3 bottom-4'>
            <Link
              href={`/products/${product.product_slug}`}
              className='block w-full px-3 py-2 text-sm text-center text-white bg-primary-500 rounded-xl'>
              Detail Produk
            </Link>
            <button
              type='button'
              onClick={() =>
                dispatch({
                  type: 'ADD_TO_CART',
                  item: {
                    product: product,
                    store: product.store,
                    category: product.category,
                    sub_category: product.sub_category,
                    photos: product.photos,
                  },
                })
              }
              className='p-2 text-sm text-white bg-primary-500 rounded-xl'>
              <MdAddShoppingCart className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-between mt-2'>
        <div>
          <h3 className='text-base font-semibold text-gray-700'>
            <Link href={`/products/${product.product_slug}`}>
              <span aria-hidden='true' className='' />
              {product.product_name}
            </Link>
          </h3>
          <p className='text-xl font-semibold text-gray-500'>{formatRupiah(product.product_price)}</p>
          <p className='py-1 text-sm text-gray-700'>{product.store.store_name}</p>
          <div className='flex items-center justify-start w-full space-x-3'>
            <div className='flex items-center justify-start space-x-1'>
              <HiStar className='w-4 h-4 text-yellow-300' />
              <span className='text-sm'>5</span>
            </div>
            <span className='w-px h-4 bg-gray-500' aria-hidden='true' />
            <p className='text-sm'>Terjual {product.product_sold}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
