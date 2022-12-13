module.exports = (sq, dt) => {
  const vendor_invoice = sq.define(
    "vendor_invoice",
    {
      vendor_invoice_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      additionalNote: {
        type: dt.STRING,
      },
      amount: {
        type: dt.STRING,
      },
      billTo: {
        type: dt.STRING,
      },
      poNo: {
        type: dt.STRING,
      },
      invoiceNo: {
        type: dt.STRING,
      },
      refSubLine: {
        type: dt.STRING,
      },
      status: {
        type: dt.STRING,
      },
      client_status: {
        type: dt.STRING,
      },
      invoice_date: {
        type: dt.STRING,
      },
      due_date: {
        type: dt.STRING,
      },
      invoice_link: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return vendor_invoice;
};
