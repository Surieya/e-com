// import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useMutation, useQuery } from "react-query";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { loadStripe } from "@stripe/stripe-js";
// import { useStripe, useElements } from "@stripe/react-stripe-js";
// import useAuth from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// const stripePromise = loadStripe(
//   "pk_test_51NPfYqSIGhhZHtggYk1JAnlyrN320NHtOK3imflq3u4JU0bjMJeG0hxsPVLlV3gJyjYggIiIDgxUrf0mM6rSZIhr004FXGcls4"
// );
// const Payment = () => {
//   const axiosPrivate = useAxiosPrivate();
//   const navigate = useNavigate();
//   const { setAuth } = useAuth();
//   const { data, error, isLoading } = useMutation({
//     mutationFn: async () => {
//       const res = await axiosPrivate.post("api/payment", {});
//       console.log(res.data);
//       return res.data;
//     },
//     onError: () => {
//       setAuth({});
//       navigate("/login", { state: { from: location }, replace: true });
//     },
//     retry: 0,
//   });
//   return (
//     <>
//       {!isLoading && (
//         <Elements stripe={stripePromise} options={{ clientSecret: { data } }}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </>
//   );
// };

// export default Payment;

// const CheckoutForm = () => {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;
//     setIsProcessing(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `${window.location.origin}/completion`,
//       },
//     });
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button disabled={isProcessing}>Pay now</button>
//     </form>
//   );
// };

const Payment = () => {
  const navigate = useNavigate();
  return (
    <main className="bg-slate-900 h-[100vh] w-full flex justify-center items-center">
      <section className="main flex flex-col bg-slate-900 py-2 w-[80%] h-[200px] shadow-md shadow-indigo-500 text-white px-3">
        <h1>Sorry For The Inconvenience</h1>
        <p>Since This is a Demo Website you Can't make the payment</p>
        <button
          className="bg-indigo-400 text-white px-5 py-2 rounded mt-[75px]"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </section>
    </main>
  );
};

export default Payment;
