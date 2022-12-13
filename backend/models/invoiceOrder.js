module.exports = (sq, dt) => {
  const order = sq.define(
    "order",
    {
      order_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      item: {
        type: dt.STRING,
      },
      description: {
        type: dt.STRING,
      },
      quantity: {
        type: dt.STRING,
      },
      rate: {
        type: dt.STRING,
      },
      gst: {
        type: dt.STRING,
      },
      amount: {
        type: dt.DOUBLE,
      },
      taxable_amount: {
        type: dt.DOUBLE,
      },
      gstAmount: {
        type: dt.DOUBLE,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return order;
};
