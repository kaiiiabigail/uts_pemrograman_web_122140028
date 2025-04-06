import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { BsEmojiFrown, BsBagCheck, BsCreditCard } from "react-icons/bs";
import CartItem from "../components/CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import Swal from "sweetalert2";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleCheckout = async (e) => {
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

 
    const { value: formValues } = await Swal.fire({
      title: "Payment Information",
      html: `<div class="text-left mb-4">
          <p class="font-semibold">Total Amount: $${total.toFixed(2)}</p>
        </div>
        <input 
          id="cardNumber" 
          type="text" 
          class="swal2-input mb-2" 
          placeholder="Card Number (4242 4242 4242 4242)"
          pattern="[0-9\\s]{16,19}"
          required
        >
        <div class="flex gap-2">
          <input 
            id="expiryDate" 
            type="text" 
            class="swal2-input" 
            placeholder="MM/YY (12/25)"
            pattern="(0[1-9]|1[0-2])\\/([0-9]{2})"
            required
          >
          <input 
            id="cvc" 
            type="text" 
            class="swal2-input" 
            placeholder="CVC (123)"
            pattern="[0-9]{3,4}"
            required
          >
        </div>
        <input 
          id="nameOnCard" 
          type="text" 
          class="swal2-input" 
          placeholder="Name on Card"
          required
        >`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#4f46e5",
      background: "#f8f9fa",
      preConfirm: () => {
        return {
          cardNumber: document.getElementById("cardNumber").value,
          expiryDate: document.getElementById("expiryDate").value,
          cvc: document.getElementById("cvc").value,
          nameOnCard: document.getElementById("nameOnCard").value,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (!formValues) return;


    if (
      !formValues.cardNumber ||
      !formValues.expiryDate ||
      !formValues.cvc ||
      !formValues.nameOnCard
    ) {
      Swal.showValidationMessage("Please fill all payment details");
      return;
    }

  
    setIsProcessingPayment(true);
    Swal.fire({
      title: "Processing Payment...",
      html: "Please wait while we process your payment",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });


    setTimeout(() => {
      setIsProcessingPayment(false);
      Swal.fire({
        title: "Payment Successful!",
        html: `
          <div class="flex flex-col items-center">
            <div class="text-green-500 text-6xl mb-4">
              <BsBagCheck />
            </div>
            <p class="text-lg">Your order has been placed successfully!</p>
            <p class="text-sm text-gray-500 mt-2">Order #${Math.floor(
              Math.random() * 1000000
            )}</p>
            <div class="mt-4 p-3 bg-gray-100 rounded-lg w-full">
              <p class="text-sm font-medium">Payment Details</p>
              <p class="text-xs mt-1">Amount: $${total.toFixed(2)}</p>
              <p class="text-xs">Card: **** **** **** ${formValues.cardNumber.slice(
                -4
              )}</p>
            </div>
          </div>
        `,
        confirmButtonText: "Continue Shopping",
        confirmButtonColor: "#4f46e5",
        background: "#f8f9fa",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          clearCart();
          handleClose();
          window.location.href = "/";
        }
      });
    }, 2000);
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
            disabled={cart.length === 0 || isProcessingPayment}
            className={`block p-3 text-center w-full font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              cart.length === 0 || isProcessingPayment
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-md hover:opacity-90"
            }`}
          >
            {isProcessingPayment ? (
              "Processing..."
            ) : (
              <>
                <BsCreditCard /> Checkout Now
              </>
            )}
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
