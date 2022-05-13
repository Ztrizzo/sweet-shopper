const express = require('express');
const app = express();

// app.post('/create-checkout-session', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'T-shirt',
//             },
//             unit_amount: 2000,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'localhost:8080/success',
//       cancel_url: 'ocalhost:8080/cancel',
//     });
  
//     res.redirect(303, session.url);
//   });

