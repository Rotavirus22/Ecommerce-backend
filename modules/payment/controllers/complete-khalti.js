const mongoose = require("mongoose");
const { verifyKhaltiPayment } = require("./khalti");

// Route to complete Khalti payment
const completeKhalti = async (req, res) => {
  const orderModel = mongoose.model("order");
  const { pidx, amount, purchase_order_id, transaction_id } = req.query;

  try {
    // Verify Khalti payment
    const paymentInfo = await verifyKhaltiPayment(pidx);

    // Check if payment is completed and details match
    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete or incorrect payment information",
        paymentInfo,
      });
    }

    // Update order status to completed
    const updatedOrder = await orderModel.findByIdAndUpdate(purchase_order_id, {
      status: "Completed",
    });

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Payment successful, order updated to completed",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error completing Khalti payment:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while completing the payment",
      error,
    });
  }
};

module.exports = completeKhalti;
