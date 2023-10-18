import expressAsyncHandler from "express-async-handler";
import { v4 as uuidv4 } from 'uuid';
import stripe from "stripe"

const paymentController = expressAsyncHandler(async(req, res) => {
    const { _id: userId,email} = req.user;
    console.log(req.body);
    const idempotencyKey = uuidv4();

     try {
        const customer = await stripe.customers.create({
            email: email,
            source: userId,
            // name: 'Gourav Hammad',
            // address: {
            //     line1: 'TC 9/4 Old MES colony',
            //     postal_code: '452331',
            //     city: 'Indore',
            //     state: 'Madhya Pradesh',
            //     country: 'India',
            // }
        });

        const result = await stripe.charges.create({
            amount: req.body.price * 100, 
            // description: 'Web Development Product',
            //shipping:{}
            receipt_email:email,
            currency: 'INR',
            customer: customer.id
        },{idempotencyKey});
 
        res.status("Success").json(result);  // If no error occurs
    } catch (err) {
        res.send(err);       // If some error occurs
    }

app.listen(port, function(error) {
    if (error) throw error;
    console.log("Server created Successfully");
});







    
    
})

export { paymentController }