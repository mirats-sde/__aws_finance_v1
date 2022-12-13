module.exports = (sq, dt) => {
  const contact = sq.define(
    "contact",
    {
      contact_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: dt.STRING,
      },
      last_name: {
        type: dt.STRING,
      },
      contact_email: {
        type: dt.STRING,
      },
      contact_phone: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return contact;
};
