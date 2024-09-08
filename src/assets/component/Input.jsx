import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Input({ onSubmit }) {
  const [formData, setFormData] = useState({
    partyAddress: "",
    partyPAN: "",
    partyMobile: "",
    partyState: "",
    partyGSTIN: "",
    invoiceNo: "",
    invoiceDate: "",
    placeOfSupply: "",
    reverseCharge: "",
    grNo: "",
    transport: "",
    vehicleNo: "",
    station: "",
    poNo: "",
    forwarding: "",
    bankName:"",
    bankBranch:"",
    accountNo:"",
    ifscCode:"",
    items: [{ id: 1, sn: "", description: "", hsn: "", qty: "", price: "" }],
  });

  const navigate = useNavigate(); // For navigation

  // Handle input changes for static fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle input changes for dynamically added fields
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  // Function to add more item fields
  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { id: formData.items.length + 1, sn: "", description: "", hsn: "", qty: "", price: "" },
      ],
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the parent function to pass form data
    onSubmit(formData);

    // Navigate to the Invoice page with formData
    navigate(`/pdf/1`, { state: formData }); // Sending the formData in the state object
  };
  return (
    <>
    
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col flex-wrap justify-center gap-10 p-6 bg-gray-50 rounded-lg shadow-md">
          <div className="w-full sm:w-auto flex flex-wrap gap-5">
            {/* Static Fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Party Address
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="partyAddress"
                placeholder="Enter party address"
                value={formData.partyAddress}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Party PAN
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="partyPAN"
                placeholder="Enter PAN"
                value={formData.partyPAN}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Party Mobile No
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="partyMobile"
                placeholder="Enter mobile number"
                value={formData.partyMobile}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Party State
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="partyState"
                placeholder="Enter state"
                value={formData.partyState}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GSTIN / UIN
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="partyGSTIN"
                placeholder="Enter GSTIN/UIN"
                value={formData.partyGSTIN}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="w-full flex flex-wrap gap-5 sm:w-auto">
            {/* Another group of static fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice No
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="invoiceNo"
                placeholder="Enter invoice number"
                value={formData.invoiceNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Date
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="invoiceDate"
                placeholder="Enter invoice date"
                value={formData.invoiceDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Place of Supply
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="placeOfSupply"
                placeholder="Enter place of supply"
                value={formData.placeOfSupply}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reverse Charge
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="reverseCharge"
                placeholder="Enter reverse charge"
                value={formData.reverseCharge}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GR/RR No
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="grNo"
                placeholder="Enter GR/RR No"
                value={formData.grNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transport
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="transport"
                placeholder="Enter transport"
                value={formData.transport}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle No.
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="vehicleNo"
                placeholder="Enter vehicle number"
                value={formData.vehicleNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Station
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="station"
                placeholder="Enter station"
                value={formData.station}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                P O NO.
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="poNo"
                placeholder="Enter P O No."
                value={formData.poNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Forwarding Charges
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full sm:w-auto"
              type="number"
              name="forwarding"
              placeholder="Enter forwarding charges"
              value={formData.forwarding}
              onChange={handleInputChange}
            />
          </div>
            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank Name
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full sm:w-auto"
              type="text"
              name="bankName"
              placeholder="Enter bankName"
              value={formData.bankName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank Branch
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full sm:w-auto"
              type="text"
              name="bankBranch"
              placeholder="Enter bankBranch"
              value={formData.bankBranch}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Account No.
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full sm:w-auto"
              type="number"
              name="accountNo"
              placeholder="Enter accountNo "
              value={formData.accountNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Ifsc Code
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full sm:w-auto"
              type="text"
              name="ifscCode"
              placeholder="Enter ifsc"
              value={formData.ifscCode}
              onChange={handleInputChange}
            />
          </div>

          </div>
        </div>
       
<div className=" p-20 flex flex-col justify-center">
        {/* Dynamically added fields */}
        {formData.items.map((item, index) => (
          <div key={item.id} className="flex gap-5">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                S.N.
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="sn"
                placeholder={`Enter S.N. ${item.id}`}
                value={item.sn}
                onChange={(e) => handleItemChange(index, e)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description of Goods
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="description"
                placeholder="Enter description"
                value={item.description}
                onChange={(e) => handleItemChange(index, e)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                HSN/SAC
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="hsn"
                placeholder="Enter HSN/SAC"
                value={item.hsn}
                onChange={(e) => handleItemChange(index, e)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qty.
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="qty"
                placeholder="Enter quantity"
                value={item.qty}
                onChange={(e) => handleItemChange(index, e)}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
                type="text"
                name="price"
                placeholder="Enter price"
                value={item.price}
                onChange={(e) => handleItemChange(index, e)}
              />
            </div>
            
          </div>
        ))}

        {/* Button to add new set of fields */}
        <button
          type="button"
          onClick={addItem}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Add More
        </button>

        {/* Submit Button */}
        <button type="submit" className="mt-4 mx-4 bg-green-500 text-white p-2 rounded">
          Submit
        </button>
        
          </div>
      </form>
    </>
  );
}

export default Input;
