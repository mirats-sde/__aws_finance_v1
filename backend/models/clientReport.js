module.exports = (sq, dt) => {
  const client_report = sq.define(
    "client_report",
    {
      client_report_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      client_name: { type: dt.STRING },
      client_email: {
        type: dt.STRING,
      },
      project_name: {
        type: dt.STRING,
      },
      invoice_number: {
        type: dt.STRING,
      },

      invoice_date: {
        type: dt.STRING,
      },
      invoice_due_date: {
        type: dt.STRING,
      },
      po_number: {
        type: dt.STRING,
      },
      qty: {
        type: dt.STRING,
      },
      rate: {
        type: dt.DOUBLE,
      },
      amt_usd: {
        type: dt.DOUBLE,
      },
      total_invoice_amt: {
        type: dt.DOUBLE,
      },
      inr_taxable_amt: {
        type: dt.DOUBLE,
      },
      gst_amt: {
        type: dt.DOUBLE,
      },
      tds: {
        type: dt.DOUBLE,
      },
      net_receivable: {
        type: dt.DOUBLE,
      },
      exchange_rate: {
        type: dt.STRING,
      },
      billing_entity: {
        type: dt.DOUBLE,
      },
      compleat_as_per_console: {
        type: dt.STRING,
      },
      qr: {
        type: dt.STRING,
      },
      project_manager: {
        type: dt.STRING,
      },
      status: {
        type: dt.STRING,
      },
      date_of_receipt: {
        type: dt.STRING,
      },
      remark: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return client_report;
};
