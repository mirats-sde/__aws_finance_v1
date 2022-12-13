module.exports = (sq, dt) => {
  const vendor_tax_information = sq.define(
    "vendor_tax_information",
    {
      vendor_tax_information_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      PAN_number: {
        type: dt.STRING,
      },
      TAN_number: {
        type: dt.STRING,
      },
      TDS_percentage: {
        type: dt.STRING,
      },
      bank_name: {
        type: dt.STRING,
      },
      currency_type: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return vendor_tax_information;
};
