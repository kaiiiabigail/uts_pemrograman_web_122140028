import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const { cart, total, itemAmount, removeItem, increaseAmount, decreaseAmount, clearCart } = useContext(CartContext);
  const navigate = useNavigate(); 

  const handleCheckout = () => {
    navigate('/sidebar'); 
  };

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow container mx-auto py-16 px-4 max-w-6xl">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4 text-gray-300">🛒</div>
            <h2 className="text-xl font-medium text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-4">Start adding some amazing products!</p>
            <Link 
              to="/" 
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
    
            <div className="md:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow p-4 flex items-start gap-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-24 h-24 object-contain rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border rounded-lg">
                        <button 
                          onClick={() => decreaseAmount(item.id)}
                          className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="px-3">{item.amount}</span>
                        <button 
                          onClick={() => increaseAmount(item.id)}
                          className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-medium">
                    ${(item.price * item.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow p-6 h-fit md:sticky md:top-16">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({itemAmount} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{total > 50 ? 'FREE' : '$5.99'}</span>
                </div>
                <div className="flex justify-between border-t pt-3 font-bold text-lg">
                  <span>Total</span>
                  <span>${(total > 50 ? total : total + 5.99).toFixed(2)}</span>
                </div>
              </div>

           

              <button 
                onClick={clearCart}
                className="w-full text-red-500 py-2 rounded-lg border border-red-500 hover:bg-red-50 transition flex items-center justify-center gap-2"
              >
                <FiTrash2 /> Clear Cart
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShoppingCart;