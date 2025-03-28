import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { BsEmojiFrown, BsBagCheck } from "react-icons/bs";
import CartItem from "../components/CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import Swal from "sweetalert2";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  const handleCheckout = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      Swal.fire({
        title: "Empty Cart",
        text: "You haven't added any items to your cart yet. Please add items before checkout.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        background: "#f8f9fa",
        backdrop: `
          rgba(0,0,0,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
      });
      return;
    }

    Swal.fire({
      title: "Checkout Successful!",
      html: `
        <div class="flex flex-col items-center">
          <div class="text-green-500 text-6xl mb-4">
            <BsBagCheck />
          </div>
          <p class="text-lg">Your order has been placed successfully!</p>
          <p class="text-sm text-gray-500 mt-2">Order #${Math.floor(
            Math.random() * 1000000
          )}</p>
        </div>
      `,
      confirmButtonText: "Continue Shopping",
      confirmButtonColor: "#4f46e5",
      background: "#f8f9fa",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        window.location.href = "/";
      }
    });
  };

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-500 ease-in-out z-30 px-4 lg:px-[35px] flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold flex items-center">
          <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
            {itemAmount}
          </span>
          Shopping Bag
        </div>
        <button
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="Close cart"
        >
          <IoMdArrowForward className="text-2xl text-gray-600" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto border-b py-4">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
            <BsEmojiFrown className="text-5xl mb-4 opacity-70" />
            <p className="text-lg font-medium mb-2">Your cart feels lonely</p>
            <p className="text-sm max-w-xs text-center">
              Add some amazing products to make it happy!
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-200 text-sm font-medium"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-y-4">
            {cart.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="py-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold text-lg">
            <span className="text-gray-500 mr-2">Total:</span>
            <span className="text-primary">
              ${parseFloat(total).toFixed(2)}
            </span>
          </div>
          <button
            onClick={clearCart}
            disabled={cart.length === 0}
            className={`cursor-pointer p-3 rounded-full flex justify-center items-center text-xl transition-all duration-200 ${
              cart.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-100 text-red-500 hover:bg-red-500 hover:text-white"
            }`}
            aria-label="Clear cart"
          >
            <FiTrash2 />
          </button>
        </div>

        <div className="space-y-3">
          <Link
            to="/cart"
            className={`block p-3 text-center w-full font-medium rounded-lg transition-all duration-200 ${
              cart.length === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-primary hover:bg-gray-200 hover:shadow-sm"
            }`}
          >
            View Cart
          </Link>
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className={`block p-3 text-center w-full font-medium rounded-lg transition-all duration-200 ${
              cart.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-md hover:opacity-90"
            }`}
          >
            Checkout Now
          </button>
        </div>

        {cart.length > 0 && (
          <p className="text-xs text-gray-400 text-center mt-4">
            Free shipping on orders over $50
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
