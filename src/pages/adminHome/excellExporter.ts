import React from "react";
import * as XLSX from "xlsx";

export const exportToExcel = (jsonData : any, name: string) => {
    console.log('jsonData', jsonData)
    // Convert JSON to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, name);
    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, `${name}_data.xlsx`);
  };