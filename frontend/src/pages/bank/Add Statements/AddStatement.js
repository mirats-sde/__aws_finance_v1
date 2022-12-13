import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { read, utils } from "xlsx";
const AddStatement = () => {
  const [tableData, setTableData] = useState(null);
  const [exceldata, setExceldata] = useState([]);
  function formatDate(date) {
    let split = date?.split("/");
    var t = new Date(`${split[1]},${split[0]},${split[2]}`)?.toString();
    return t;
  }
  const handleChange = async (e) => {
    let file = e.target.files[0];
    const data = await file.arrayBuffer();
    let wb = read(data);
    // Object.entries(wb.Sheets[wb.SheetNames])?.map(([key, value], i) => {
    //   console.log("key=>", key);
    //   console.log("value=>", value);
    //   let jsonExcel = utils.sheet_to_json(value);
    //   console.log(jsonExcel);
    // });
    console.log(wb.Sheets);
    console.log(wb.SheetNames);
    let sheets = [];
    let jsonExcel;
    wb.SheetNames?.map((shName, i) => {
      Object.entries(wb.Sheets[wb.SheetNames[i]])?.map(([key, value], ind) => {
        // console.log(utils.sheet_to_json(wb.Sheets[shName]));
        jsonExcel = utils.sheet_to_json(wb.Sheets[shName]);
        jsonExcel.shift();
        jsonExcel.shift();
      });
      sheets.push(...jsonExcel);
    });
    console.log(sheets);
    setTableData(sheets);
  };
  const uploadData = () => {
    tableData?.map((data, i) => {
      axios.post(
        "https://finance.miratsoneservices.com/api/create-bank-transaction",
        {
          transaction_id: data?.__EMPTY,
          value_date: formatDate(data?.__EMPTY_2),
          txn_posted_date: data?.__EMPTY_2,
          Cheque_No: data?.__EMPTY_3,
          Description: data?.__EMPTY_4,
          Cr_Dr: data?.__EMPTY_5,
          transaction_amount: data?.__EMPTY_6,
          available_balance: data?.__EMPTY_7,
        }
      );
    });
  };
  console.log(exceldata);
  // console.log(
  //   new Date(tableData[0]?.__EMPTY_2?.split(" ")[0])?.toLocaleDateString(
  //     "en-us",
  //     { weekday: "long", year: "numeric", month: "short", day: "numeric" }
  //   )
  // );

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={uploadData}>Push</button>
      <table>
        <thead>
          <th>No.</th>
          <th>Transaction ID</th>
          <th>Value Date</th>
          <th>Txn Posted Date</th>
          <th>ChequeNo.</th>
          <th>Description</th>
          <th>Cr/Dr</th>
          <th>Transaction Amount(INR)</th>
          <th>Available Balance(INR)</th>
        </thead>
        <tbody>
          {tableData?.map((data) => (
            <tr>
              <td> {data?.["DETAILED STATEMENT"]}</td>
              <td>{data.__EMPTY}</td>
              <td>
                {/* {new Date(data?.__EMPTY_2)?.toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} */}
                {formatDate(data?.__EMPTY_2)}
              </td>
              {/* <td>{data?.__EMPTY_2?.slice(" ")[0]}</td> */}
              <td>{data.__EMPTY_2}</td>
              <td>{data.__EMPTY_3}</td>
              <td>{data.__EMPTY_4}</td>
              <td>{data.__EMPTY_5}</td>
              <td>{data.__EMPTY_6}</td>
              <td>{data.__EMPTY_7}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddStatement;
