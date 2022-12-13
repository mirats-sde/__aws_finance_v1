module.exports = (sq, dt) => {
  const bank_details = sq.define(
    "bank_details",
    {
      bank_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UPI: {
        type: dt.STRING,
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
      IFSC_code: {
        type: dt.STRING,
      },

      SWIFT_code: {
        type: dt.STRING,
      },
      bank_address: {
        type: dt.STRING,
      },
      beneficiary_name: {
        type: dt.STRING,
      },
      routing_number: {
        type: dt.STRING,
      },
      beneficiary_address: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return bank_details;
};
