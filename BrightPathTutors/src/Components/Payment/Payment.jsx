import React from 'react';
import { Button } from '@mui/material';

const Payment = ({ amount, currency, receiptId,studentID,tutorID }) => {
    console.log(amount, currency, receiptId,studentID,tutorID);

    const paymentHandler = async (e) => {
        try {

            // Step 2: Create order with Razorpay
            const orderResponse = await fetch("http://localhost:5000/api/transactions/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount,
                    currency,
                    receipt: receiptId
                })
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create order');
            }

            const order = await orderResponse.json();


           var options = {
            key: (import.meta.env.VITE_RAZORPAY_KEY_ID), // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            "name": "Bright Path tutor", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response){

                const body={
                    ...response,
                    receiptId,
                    studentID,
                    tutorID,
                };


                const validateRes=await fetch("http://localhost:5000/api/transactions/order/validate",{
                    method:"POST",
                    body:JSON.stringify(body),
                    headers:{
                        "Content-Type":"application/json",
                    }
                })
                const jsonRes=await validateRes.json();
                console.log(jsonRes);
                
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": "Sneha Rawat", //your customer's name
                "email": "sneharawat240503@gmail.com", 
                "contact": "8303318945"  //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
        window.location.reload();
    } catch (error) {
        console.error('Error handling payment:', error);
        // Handle error scenario
}
};
    return (
    <div>
            <Button  variant='outlined' sx={{ position: 'absolute', marginTop: '.8%', right: "5%", borderRadius: 20 }} onClick={paymentHandler}>PAY</Button>
        </div>
  )
};

export default Payment
