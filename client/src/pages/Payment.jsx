import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51NPfYqSIGhhZHtggYk1JAnlyrN320NHtOK3imflq3u4JU0bjMJeG0hxsPVLlV3gJyjYggIiIDgxUrf0mM6rSZIhr004FXGcls4"
);
const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};
