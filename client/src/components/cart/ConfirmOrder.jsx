import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, paymentVerification } from "../../redux/actions/order";
import {toast} from "react-hot-toast"
import {useNavigate } from "react-router-dom";
import axios from "axios";
import {backend_url} from "../../redux/store"


const ConfirmOrder = () => {
  const [payment, setPayment] = useState("");
  const [disable, setDisbale] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { cartItems, subTotal, tax, shippingCharges, total, shippingInfo } =
    useSelector((state) => state.cart);

  const {message, error} = useSelector(state => state.order);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisbale(true);
    if (payment === "COD") {
      dispatch(
        createOrder(
          shippingInfo,
          cartItems,
          payment,
          subTotal,
          tax,
          shippingCharges,
          total
        )
      );
    } else {
      const { data : { order, orderOptions }, } = await axios.post(
        `${backend_url}/createOrderOnline`,
        {
          shippingInfo,
          orderItems:cartItems,
          paymentMethod:payment,
          itemsPrice:subTotal,
          taxPrice:tax,
          shippingCharges,            
          totalAmount:total,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      const options = {
        key:"rzp_test_S85Pqp5ZSA1kvT",
        amount:order.amount,
        currency:"INR",
        name: "BurgerStore",
        description:"Burger App",
        order_id:order.id,
        handler : function ( response){
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature} = response;

          dispatch(
            paymentVerification(
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              orderOptions
            )
          );

        },
        
        theme: {
          color: "#9c003c",
        },

      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  useEffect(() => {
     if(message){
      toast.success(message);
      dispatch({type: "clearMessage"});
      dispatch({type:"emptyState"});
      navigate("/paymentSuccess");
     }

     if(error){
      toast.error(error);
      dispatch({type:"clearError"});
      setDisbale(false);
     }
  }, [dispatch, message, navigate, error])
  

  return (
    <section className="confirmOrder">
      <main>
        <h1>Confirm Order</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Cash On Delivery</label>
            <input
              type="radio"
              name="payment"
              onChange={() => setPayment("COD")}
              required
            />
          </div>
          <div>
            <label>Online</label>
            <input
              type="radio"
              name="payment"
              onChange={() => setPayment("Online")}
              required
            />
          </div>

          <button disabled={disable} type="submit">
            Place Order
          </button>
        </form>
      </main>
    </section>
  );
};

export default ConfirmOrder;
