const mongoose = require("mongoose");
const { initializeKhaltiPayment } = require("./khalti");

// Route to initialize Khalti payment gateway
const initializeKhalti = async (req, res) => {
  const orderModel = mongoose.model("order");
  try {
    const { orderId } = req.body;

    // Fetch the order details from the database
    const order = await orderModel.findOne({
      _id: orderId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Calculate the total price of the order
    const totalPrice = order.products.reduce(
      (acc, curr) => acc + curr.price,
      0
    );

    // Initialize Khalti payment
    const paymentInitiate = await initializeKhaltiPayment({
      amount: totalPrice * 100,
      purchase_order_id: orderId, // Pass orderId directly
      return_url: `${process.env.Backend_uri}/complete-khalti-payment`,
    });
    res.status(200).json({
      success: true,
      payment: paymentInitiate,
    });
  } catch (error) {
    console.error("Error initializing Khalti payment:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while initializing the payment",
      error,
    });
  }
};

module.exports = initializeKhalti;
