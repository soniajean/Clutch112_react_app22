import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";
import CheckoutForm from "../components/CheckoutForm";
import { useUser } from "reactfire";

const stripePromise = loadStripe("pk_test_51My1ATBmaCyUhyMhlxNbDyiim4xqogMFFAgUWTyyQIl29sQ2VBrgcQIvAlrBYpeKerczkJSHbo7nO2TXXT1sac2v00tpjjlBjy");


const Checkout = () => {

    const [clientSecret, setClientSecret] = useState('');
    const { cart } = useContext(DataContext);
    const{data:user} = useUser();

    useEffect(() => {
        // create payment intent as soon as this component FIRST renders 
        // with an API call to flask
        console.log(user);
        fetch("https://clutch-flask.onrender.com/pay/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({'cart':cart, 'user':user}),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };
    return (
        <>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    )

}

export default Checkout;