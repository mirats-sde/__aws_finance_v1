module.exports = (sq, dt) => {
  const shipping_address = sq.define(
    "shipping_address",
    {
      shipping_address_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      street1: {
        type: dt.STRING,
      },
      street2: {
        type: dt.STRING,
      },
      area: {
        type: dt.STRING,
      },
      city: {
        type: dt.STRING,
      },
      // state: {
      //   type: dt.STRING,
      // },
      branch_name: {
        type: dt.STRING,
      },
      zip_code: {
        type: dt.STRING,
      },
      place_of_supply: {
        type: dt.STRING,
      },

      country: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return shipping_address;
};
