module.exports = (sq, dt) => {
  const address = sq.define(
    "address",
    {
      address_id: {
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
      state: {
        type: dt.STRING,
      },
      zip_code: {
        type: dt.STRING,
      },
      country: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return address;
};
