module.exports = (sq, dt) => {
  const bank_transaction = sq.define(
    "bank_transaction",
    {
      bank_transaction_id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      transaction_id: {
        type: dt.STRING,
      },
      value_date: {
        type: dt.STRING,
      },
      txn_posted_date: {
        type: dt.STRING,
      },
      Cheque_No: {
        type: dt.STRING,
      },
      Description: {
        type: dt.STRING,
      },
      Cr_Dr: {
        type: dt.STRING,
      },
      transaction_amount: {
        type: dt.STRING,
      },
      available_balance: {
        type: dt.STRING,
      },
    },
    { initialAutoIncrement: 1 }
  );
  return bank_transaction;
};
