module.exports = (sq, dt) => {
  const customer_bank_details = sq.define(
    "customer_bank_details",
    {
      bank_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bank_name: {
        type: dt.STRING,
      },
      account_name: {
        type: dt.STRING,
      },
      account_number: {
        type: dt.STRING,
      },
      account_type: {
        type: dt.STRING,
      },
      IFSC_code: {
        type: dt.STRING,
      },
      branch_name: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return customer_bank_details;
};
