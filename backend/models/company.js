module.exports = (sq, dt) => {
  const company = sq.define(
    "company",
    {
      company_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_name: {
        type: dt.STRING,
      },
      tax_id_no: {
        type: dt.STRING,
      },
      company_registration_number: {
        type: dt.STRING,
      },
      company_email_id: {
        type: dt.STRING,
      },
      LUT_code: {
        type: dt.STRING,
      },
      CIN_no: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return company;
};
