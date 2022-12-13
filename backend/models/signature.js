module.exports = (sq, dt) => {
  const signature = sq.define(
    "signature",
    {
      signature_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      signature_name: {
        type: dt.STRING,
      },
      signature: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return signature;
};
