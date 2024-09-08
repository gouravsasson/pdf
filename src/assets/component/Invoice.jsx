import React, { useRef } from "react";
import { toWords } from "number-to-words";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";

function Invoice() {
  const location = useLocation();
  const formData = location.state; // Access the passed formData from Input page
  const invoiceRef = useRef();

  const total = formData.items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const grandTotal =
    total +
    parseFloat(formData.forwarding || 0) +
    (parseFloat(formData.qty || 0) * parseFloat(formData.price || 0) +
      parseFloat(formData.forwarding || 0) * 0.18);
  const grandTotalInWords = toWords(grandTotal);

  const downloadPDF = () => {
    html2canvas(invoiceRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("invoice.pdf");
    });
  };
  return (
    <>
      <div className="p-20 flex justify-center">
        <div ref={invoiceRef} className="w-[1000px] p-5 border border-black  ">
          {/* Header Table */}
          <table className="w-full border-collapse mb-2">
            <tbody>
              <tr>
                <td className="w-1/2 text-left">
                  <strong>GSTIN:</strong> {formData.partyGSTIN}
                </td>
                <td className="w-1/2 text-right">
                  <strong>Original Copy</strong>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="text-center text-lg font-bold">
                  TAX INVOICE
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="text-center text-lg font-bold">
                  PARAMHANS FABRICATORS PVT. LTD.
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="text-center text-sm">
                  B-87 Gali No: 12, Shiv Ram Park, Shani Bazar Road, Nangloi,
                  New Delhi-110041
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="text-center text-sm">
                  CIN: U31909DL2006PTC151125 | PAN: AADCP5950E
                  <br />
                  Tel: 09811367890 | Email: paramhans.fabricators@gmail.com
                </td>
              </tr>
            </tbody>
          </table>

          {/* Party Details */}
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td colSpan="4" className="border p-1">
                  <strong>Party Details</strong>
                </td>
                <td colSpan="3" className="border p-1">
                  <strong>Invoice No:</strong> {formData.invoiceNo}
                </td>
              </tr>
              <tr>
                <td colSpan="4" className="border p-1">
                  <strong>Address:</strong> {formData.partyAddress}
                  <br />
                  <strong>Party PAN :</strong> {formData.partyPAN}
                  <br />
                  <strong>Party Mobile No : </strong> {formData.partyMobile}
                  <br />
                  <strong>Party State : </strong> {formData.partyState}
                  <br />
                  <strong>GSTIN / UIN :</strong> {formData.partyGSTIN}
                  <br />
                </td>
                <td colSpan="3" className="border p-1">
                  <strong>Invoice Date:</strong> {formData.invoiceDate}
                  <br />
                  <strong>Place of Supply:</strong> {formData.placeOfSupply}
                  <br />
                  <strong>Reverse Charge :</strong> {formData.reverseCharge}
                  <br />
                  <strong>GR/RR No.:</strong> {formData.grNo}
                  <br />
                  <strong>Transport : </strong> {formData.transport}
                  <br />
                  <strong>Vehicle No.: </strong> {formData.vehicleNo}
                  <br />
                  <strong>Station:</strong> {formData.station}
                  <br />
                  <strong>P O NO.:</strong> {formData.poNo}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full border-collapse mb-2">
            <tbody className="">
              <tr>Kind Attn: Mr. Subhajit Banopadhyay.</tr>
            </tbody>
          </table>

          {/* Items Table */}
          <table className="w-full border-collapse mt-2">
            <thead>
              <tr>
                <th className="border p-1 text-center">S/N</th>
                <th className="border p-1 text-center">Description of Goods</th>
                <th className="border p-1 text-center">HSN/SAC Code</th>
                <th className="border p-1 text-center">Qty.</th>
                <th className="border p-1 text-center">Unit</th>
                <th className="border p-1 text-center">Price</th>
                <th className="border p-1 text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item) => (
                <tr key={item.id}>
                  <td className="border p-1 text-center">{item.sn}</td>
                  <td className="border p-1">{item.description}</td>
                  <td className="border p-1 text-center">{item.hsn}</td>
                  <td className="border p-1 text-center">{item.qty}</td>
                  <td className="border p-1 text-center">NOS</td>
                  <td className="border p-1 text-center">{item.price}</td>
                  <td className="border p-1 text-center">
                    {item.qty * item.price}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="6" className=" border-l-2 p-1 text-right"></td>
                <td className="border-l-2 border-r-2  p-1 text-center">
                  {total}
                </td>
              </tr>
              <tr>
                <td colSpan="6" className=" border-l-2 p-1 text-right">
                  Add: Freight & Forwarding Charges
                </td>
                <td className="border-r-2 border-l-2 p-1 text-center">
                  {formData.forwarding}
                </td>
              </tr>
              <tr>
                <td colSpan="6" className="border-l-2 p-1 text-right">
                  Add: IGST @ 18.00%
                </td>
                <td className="border-l-2 border-r-2 p-1 text-center">
                  {Math.floor(
                    (parseFloat(formData.forwarding || 0) + total) * 0.18
                  )}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  className="border-l-2 border-t-2 p-1 text-right font-bold"
                >
                  Grand Total
                </td>
                <td className="border p-1 text-center font-bold">
                  {total +
                    parseFloat(formData.forwarding || 0) +
                    Math.floor(
                      (parseFloat(formData.forwarding || 0) + total) * 0.18
                    )}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="border-collapse ">
            <thead>
              <tr>
                <th className="border-b-2 border-l-2 px-2 text-center">
                  HSN/SAC
                </th>
                <th className="border-b-2 p-1 px-2 text-center">Tax Rate</th>
                <th className="border-b-2 p-1 px-2 text-center">
                  Taxable Amt.
                </th>
                <th className="border-b-2 p-1 px-2 text-center">IGST Amt.</th>
                <th className="border-b-2 p-1 px-2 text-center">Total Tax</th>
                
                
              </tr>
            </thead>
            <tbody>
              {formData.items.map((tax, index) => (
                <tr key={index}>
                  <td className="border-l-2 p-3 ">{tax.hsn}</td>
                  <td className="p-1 text-center">18%</td>
                  <td className="p-1 text-center">
                    {parseFloat(tax.qty || 0) * parseFloat(tax.price || 0) +
                      parseFloat(formData.forwarding || 0)}
                  </td>
                  <td className="p-1 text-center">
                    {parseFloat(
                      (parseFloat(tax.qty || 0) * parseFloat(tax.price || 0) +
                        parseFloat(formData.forwarding || 0)) *
                        0.18
                    ).toFixed(0)}
                  </td>
                  <td className="p-1 text-center">
                    {parseFloat(
                      (parseFloat(tax.qty || 0) * parseFloat(tax.price || 0) +
                        parseFloat(formData.forwarding || 0)) *
                        0.18
                    ).toFixed(0)}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan="5"
                  className="border-l-2 p-3 text-left font-bold text-xl"
                >
                  Rupees {grandTotalInWords}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Bank Details */}
          <div className="border-t-2 border-l-2 border-r-2 p-4 text-xs">
            <strong>Bank Details:</strong> BANK NAME: {formData.bankName},
            BRANCH: {formData.bankBranch}
            <br />
            A/C No: {formData.accountNo}, IFSC CODE: {formData.ifscCode}
          </div>

          {/* Terms & Conditions */}
          <div className="flex justify-start">
            <div className="basis-[50%] text-xs p-3 border-t-2 border-l-2 border-r-2 border-b-2">
              <strong>Terms & Conditions:</strong>
              <br />
              <h1>E.& O.E.</h1><br />
              <h1>1. Goods once sold will not be taken back.</h1><br />
              <h1>2. Interest @ 18% p.a. will be charged if the payment</h1><br />
              <h1> is not made with in the stipulated time. </h1><br />
              <h1>3. Subject to 'Delhi' Jurisdiction only. </h1><br />
              <h1>4. Amount of Tax Subject to Reverse Charges.</h1><br />
            </div>

            {/* Footer */}
            <div className="basis-[50%]  border-r-2 border-t-2 border-b-2">
              <div className="  border-b-2  text-start">
                <h1 className="py-2 mb-8 font-bold">Receiver's Signature :</h1>
              </div>
              <h1 className="text-right font-bold p-2">
                For PARAMHANS FABRICATORS PVT. LTD.
              </h1>
              <br />
              <br />
              <br />
              <h1 className="text-right font-bold p-2">
              Authorised Signatory
              </h1>
              
            </div>
          </div>
        </div>
      </div>
      <button onClick={downloadPDF} className="mt-4 p-2 bg-blue-500 text-white">
        Download PDF
      </button>
    </>
  );
}

export default Invoice;
