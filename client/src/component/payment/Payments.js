import React from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useParams } from "react-router-dom";
import "./Payments.scss";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartSlice";

function Payments() {
  const params = useParams();
  const status = params.status;
  const dispatch = useDispatch();

  const infoData = {
    sucess: {
      maessage: "your order has been placed",
      cta: "shop more",
      icon: <BsFillCartCheckFill />,
    },
    failed: {
      maessage: "Payment failed",
      cta: "Try Again",
      icon: <BiErrorCircle />,
    },
  };

  if (status === "sucess") {
    dispatch(resetCart());
  }
  return (
    <div className="payments">
      <div className="icon">{infoData[status].icon}</div>
      <h2 className="message">{infoData[status].maessage}</h2>
      <button className="btn-primary">{infoData[status].cta}</button>
    </div>
  );
}

export default Payments;
