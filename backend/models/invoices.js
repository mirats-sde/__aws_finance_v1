module.exports = (sq, dt) => {
  const invoices = sq.define(
    "invoices",
    {
      invoice_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      invoice_number: { type: dt.STRING },
      customer_id: {
        type: dt.STRING,
      },
      company_id: {
        type: dt.STRING,
      },
      invoice_date: {
        type: dt.STRING,
      },

      invoice_dueDate: {
        type: dt.STRING,
      },
      currency_type: {
        type: dt.STRING,
      },
      status: {
        type: dt.STRING,
      },
      notes: {
        type: dt.STRING,
      },
      taxable_amount: {
        type: dt.DOUBLE,
      },
      adjusted_amount: {
        type: dt.DOUBLE,
      },
      total_amount: {
        type: dt.DOUBLE,
      },
      terms_and_conditions: {
        type: dt.STRING,
      },
      CGST: {
        type: dt.DOUBLE,
      },
      IGST: {
        type: dt.DOUBLE,
      },
      SGST: {
        type: dt.DOUBLE,
      },
      sale_by: {
        type: dt.STRING,
      },
      current_USD_price: {
        type: dt.DOUBLE,
      },
      payment_status: {
        type: dt.STRING,
      },
      received_amount: {
        type: dt.STRING,
      },
      bank_charges: {
        type: dt.STRING,
      },
      tds: {
        type: dt.STRING,
      },
      project_name: {
        type: dt.STRING,
      },
      exchange_rate: {
        type: dt.STRING,
      },
      completes_as_per_console: {
        type: dt.STRING,
      },
      qr: {
        type: dt.STRING,
      },
      project_manager: {
        type: dt.STRING,
      },
      date_of_receipt: {
        type: dt.STRING,
      },
      signature: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return invoices;
};
