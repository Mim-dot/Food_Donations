import React from 'react';

const RequestDonation = ({ show, onClose, donation, pickupTime, setPickupTime }) => {
  if (!show) return null; // ✅ Don't render unless needed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-bold text-[#7B4F28] mb-4">Request Donation</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Pickup time: ${pickupTime}`);
            onClose(); 
          }}
        >
          <Input label="Donation Title" value={donation.title} readOnly />
          <Input label="Restaurant Name" value={donation.restaurant} readOnly />
          <Input label="Charity Name" value="Your Charity Name" readOnly />
          <Input label="Charity Email" value="charity@example.com" readOnly />
          <Textarea label="Request Description" placeholder="Write your request here..." />

          <label className="block mb-1 font-semibold text-[#5C3B1D]">Pickup Time</label>
          <input
            type="time"
            required
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full mb-6 p-2 border border-[#E0D6CC] rounded"
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-[#7B4F28] rounded text-[#7B4F28] font-semibold hover:bg-[#F5EFE6] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#7B4F28] text-white px-5 py-2 rounded font-semibold hover:bg-[#5c3b1d] transition"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input component
const Input = ({ label, value = "", readOnly = false }) => (
  <>
    <label className="block mb-1 font-semibold text-[#5C3B1D]">{label}</label>
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      className="w-full mb-4 p-2 border border-[#E0D6CC] rounded"
    />
  </>
);

const Textarea = ({ label, placeholder }) => (
  <>
    <label className="block mb-1 font-semibold text-[#5C3B1D]">{label}</label>
    <textarea
      required
      placeholder={placeholder}
      className="w-full mb-4 p-2 border border-[#E0D6CC] rounded resize-none"
      rows={4}
    />
  </>
);

export default RequestDonation;
