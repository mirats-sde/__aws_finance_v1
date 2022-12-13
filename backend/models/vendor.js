module.exports = (sq, dt) => {
  const vendor = sq.define(
    "vendor",
    {
      vendor_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vendor_name: {
        type: dt.STRING,
      },
      company_name: {
        type: dt.STRING,
      },
      tax_id_number: {
        type: dt.STRING,
      },
      GST_registered_name: {
        type: dt.STRING,
      },
      type_of_business: {
        type: dt.STRING,
      },
      phone_number: {
        type: dt.STRING,
      },
      mobile_number: {
        type: dt.STRING,
      },
      account_email_id: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return vendor;
};
