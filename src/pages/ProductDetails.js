import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const product = products.find(item => item.id === parseInt(id));

  if (!product) {
    return <section className='min-h-screen flex justify-center items-center'>Loading...</section>;
  }

  const { title, price, description, image } = product;

  return (
    <section className='py-12 min-h-[calc(100vh-200px)]'> {/* Ubah dari h-screen ke min-h */}
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row items-center'>
          {/* Image */}
          <div className='flex-1 mb-8 lg:mb-0 flex justify-center'>
            <img className='max-w-[200px] lg:max-w-sm' src={image} alt={title} />
          </div>
          
          {/* Text */}
          <div className='flex-1 text-center lg:text-left px-4'>
            <h1 className='text-2xl font-medium mb-4'>{title}</h1>
            <div className='text-xl text-red-500 font-medium mb-6'>${price}</div>
            <p className='mb-8 text-gray-700'>{description}</p>
            <button 
              onClick={() => addToCart(product, product.id)} 
              className='bg-primary hover:bg-primary-dark text-white py-3 px-8 rounded-lg transition-all'
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;