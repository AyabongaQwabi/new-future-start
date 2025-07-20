import nodemailer from 'nodemailer';

// Create transporter with your SMTP settings
const transporter = nodemailer.createTransport({
  host: 'mail.futurestart.co.za',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'info@futurestart.co.za',
    pass: '@InfoStart2025',
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000, // 5 seconds
  socketTimeout: 10000, // 10 seconds
});

interface OrderDetails {
  customerName: string;
  customerEmail: string;
  trackingNumber: string;
  quantity: number;
  totalAmount: number;
  deliveryMethod: string;
  paxiCode?: string;
  deliveryAddress?: string;
  promoCode?: string;
  discountAmount?: number;
}

export async function sendThankYouEmail(orderDetails: OrderDetails) {
  console.log('=== Starting Email Send Process ===');
  console.log('Order details:', {
    customerName: orderDetails.customerName,
    customerEmail: orderDetails.customerEmail,
    trackingNumber: orderDetails.trackingNumber,
    quantity: orderDetails.quantity,
    deliveryMethod: orderDetails.deliveryMethod,
  });

  try {
    // Test SMTP connection first
    console.log('Testing SMTP connection...');
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP connection failed:', verifyError);
      return {
        success: false,
        error: `SMTP connection failed: ${
          verifyError instanceof Error
            ? verifyError.message
            : String(verifyError)
        }`,
        errorType: 'SMTP_CONNECTION_ERROR',
      };
    }

    const {
      customerName,
      customerEmail,
      trackingNumber,
      quantity,
      totalAmount,
      deliveryMethod,
      paxiCode,
      deliveryAddress,
      promoCode,
      discountAmount,
    } = orderDetails;

    const bookPrice = 45000; // R450 in cents
    const deliveryFee = deliveryMethod === 'paxi' ? 6000 : 15000; // R60 or R150
    const subtotal = bookPrice * quantity + deliveryFee;
    const discount = discountAmount || 0;

    console.log('Calculated pricing:', {
      bookPrice: bookPrice / 100,
      quantity,
      deliveryFee: deliveryFee / 100,
      discount: discount / 100,
      totalAmount: totalAmount / 100,
    });

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Purchase - Future Start</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .order-details { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .tracking-number { background: #dbeafe; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .tracking-number strong { font-size: 24px; color: #1d4ed8; }
            .price-row { display: flex; justify-content: space-between; padding: 8px 0; }
            .total-row { display: flex; justify-content: space-between; padding: 12px 0; font-weight: bold; font-size: 18px; border-top: 2px solid #e5e7eb; margin-top: 10px; }
            .delivery-info { background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
            .contact-info { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; }
            h1, h2, h3 { margin-top: 0; }
            .discount { color: #059669; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 Thank You for Your Purchase!</h1>
                <p>Your order has been confirmed and is being processed</p>
            </div>
            
            <div class="content">
                <h2>Hello ${customerName},</h2>
                
                <p>Thank you for purchasing <strong>"Conquering Your Years in Tertiary Education"</strong> from Future Start! We're excited to help you on your academic journey.</p>
                
                <div class="tracking-number">
                    <p><strong>Your Tracking Number:</strong></p>
                    <strong>${trackingNumber}</strong>
                </div>
                
                <div class="order-details">
                    <h3>📦 Order Summary</h3>
                    <div class="price-row">
                        <span>Book${
                          quantity > 1 ? 's' : ''
                        }: "Conquering Your Years in Tertiary Education" × ${quantity}</span>
                        <span>R${((bookPrice * quantity) / 100).toFixed(
                          2
                        )}</span>
                    </div>
                    <div class="price-row">
                        <span>Delivery (${
                          deliveryMethod === 'paxi'
                            ? 'PAXI Collection'
                            : 'Door-to-Door'
                        })</span>
                        <span>R${(deliveryFee / 100).toFixed(2)}</span>
                    </div>
                    ${
                      discount > 0
                        ? `
                    <div class="price-row discount">
                        <span>Discount (${promoCode})</span>
                        <span>-R${(discount / 100).toFixed(2)}</span>
                    </div>
                    `
                        : ''
                    }
                    <div class="total-row">
                        <span>Total Paid</span>
                        <span>R${(totalAmount / 100).toFixed(2)}</span>
                    </div>
                </div>
                
                <div class="delivery-info">
                    <h3>🚚 Delivery Information</h3>
                    <p><strong>Method:</strong> ${
                      deliveryMethod === 'paxi'
                        ? 'PAXI Collection'
                        : 'Door-to-Door Delivery'
                    }</p>
                    ${
                      paxiCode
                        ? `
                    <p><strong>PEP Store Code:</strong> ${paxiCode}</p>
                    <p><em>You will receive an SMS from PEP within 1-2 days with collection details.</em></p>
                    `
                        : ''
                    }
                    ${
                      deliveryAddress
                        ? `
                    <p><strong>Delivery Address:</strong> ${deliveryAddress}</p>
                    <p><em>Expected delivery: 3-5 business days</em></p>
                    `
                        : ''
                    }
                </div>
                
                <h3>📋 What Happens Next?</h3>
                <ol>
                    <li><strong>Order Processing:</strong> Your order is being prepared for shipment (1-2 business days)</li>
                    <li><strong>Shipping:</strong> ${
                      deliveryMethod === 'paxi'
                        ? 'Your book will be sent to your selected PEP store'
                        : 'Your book will be shipped to your delivery address'
                    }</li>
                    <li><strong>${
                      deliveryMethod === 'paxi'
                        ? 'Collection Ready'
                        : 'Delivery'
                    }:</strong> ${
      deliveryMethod === 'paxi'
        ? "You'll receive an SMS when ready for collection (3-5 business days)"
        : 'Your book will be delivered (3-7 business days)'
    }</li>
                </ol>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://futurestart.co.za/track-order?tracking=${trackingNumber}" class="button">Track Your Order</a>
                    <a href="https://futurestart.co.za" class="button">Visit Our Website</a>
                </div>
                
                <div class="contact-info">
                    <h3>💬 Need Help?</h3>
                    <p>If you have any questions about your order, feel free to contact us:</p>
                    <p>
                        📧 <strong>Email:</strong> info@futurestart.co.za<br>
                        📞 <strong>Phone:</strong> +27 72 041 9723<br>
                        💬 <strong>WhatsApp:</strong> +27 72 041 9723
                    </p>
                </div>
                
                <p>Thank you for choosing Future Start. We're here to support your academic success!</p>
                
                <p>Best regards,<br>
                <strong>The Future Start Team</strong></p>
            </div>
            
            <div class="footer">
                <p><strong>Future Start</strong> - Empowering learners and students on their academic journey</p>
                <p style="font-size: 12px; color: #6b7280;">
                    This email was sent to ${customerEmail}. If you have any questions, please contact us at info@futurestart.co.za
                </p>
            </div>
        </div>
    </body>
    </html>
    `;

    const mailOptions = {
      from: {
        name: 'Future Start',
        address: 'info@futurestart.co.za',
      },
      to: customerEmail,
      subject: `Thank You for Your Purchase! Order ${trackingNumber}`,
      html: emailHtml,
      text: `
Thank You for Your Purchase!

Hello ${customerName},

Thank you for purchasing "Conquering Your Years in Tertiary Education" from Future Start!

Your Tracking Number: ${trackingNumber}

Order Summary:
- Book${
        quantity > 1 ? 's' : ''
      }: "Conquering Your Years in Tertiary Education" × ${quantity} - R${(
        (bookPrice * quantity) /
        100
      ).toFixed(2)}
- Delivery (${
        deliveryMethod === 'paxi' ? 'PAXI Collection' : 'Door-to-Door'
      }) - R${(deliveryFee / 100).toFixed(2)}
${
  discount > 0
    ? `- Discount (${promoCode}) - -R${(discount / 100).toFixed(2)}\n`
    : ''
}
Total Paid: R${(totalAmount / 100).toFixed(2)}

Delivery Information:
Method: ${
        deliveryMethod === 'paxi' ? 'PAXI Collection' : 'Door-to-Door Delivery'
      }
${
  paxiCode
    ? `PEP Store Code: ${paxiCode}\nYou will receive an SMS from PEP within 1-2 days with collection details.`
    : ''
}
${
  deliveryAddress
    ? `Delivery Address: ${deliveryAddress}\nExpected delivery: 3-5 business days`
    : ''
}

Track your order: https://futurestart.co.za/track-order?tracking=${trackingNumber}

Need help? Contact us:
Email: info@futurestart.co.za
Phone: +27 72 041 9723
WhatsApp: +27 72 041 9723

Best regards,
The Future Start Team
      `,
    };

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      response: info.response,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('=== Email Send Error ===');
    console.error('Error type:', error?.constructor?.name);
    console.error(
      'Error message:',
      error instanceof Error ? error.message : String(error)
    );
    console.error('Error code:', (error as any)?.code);
    console.error(
      'Error stack:',
      error instanceof Error ? error.stack : 'No stack trace'
    );

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown email error',
      errorCode: (error as any)?.code,
    };
  }
}
