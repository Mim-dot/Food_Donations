import React, { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact";
  }, []);
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_l3ium29",    
         "template_flhwjwi",   
        formRef.current,
         "SWlV3urXeG_jpZLaO"       
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "We'll get back to you shortly.",
          });
          formRef.current.reset();
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try again!",
          });
          console.error("EmailJS Error:", error.text);
        }
      );
  };

  return (
    <div className="min-h-screen mt-4 bg-[#F5EFE6] text-[#5C3B1D] py-12 px-6 font-[Comfortaa]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#7B4F28]">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={sendEmail} className="bg-white shadow-md p-6 rounded-xl space-y-4">
            <h2 className="text-2xl font-semibold text-[#7B4F28] mb-2">Send a Message</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 border border-[#E0D6CC] rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 border border-[#E0D6CC] rounded-md"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 border border-[#E0D6CC] rounded-md"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-[#7B4F28] text-white px-5 py-2 rounded-md hover:bg-[#5c3b1d] transition"
            >
              Submit
            </button>
          </form>

          {/* Contact Info + FAQ */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-[#7B4F28] mb-2">Contact Information</h2>
              <p className="flex items-center gap-2">
                <FaEnvelope /> support@foodshare.org
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt /> +880 123-456-789
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> Dhaka, Bangladesh
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#7B4F28] mb-2">FAQs</h2>
              <details className="mb-3">
                <summary className="font-medium">How can I become a charity?</summary>
                <p className="ml-4 mt-1 text-sm">Go to Dashboard → Request Charity Role and complete the payment.</p>
              </details>
              <details className="mb-3">
                <summary className="font-medium">Is there any fee for restaurants?</summary>
                <p className="ml-4 mt-1 text-sm">No. Restaurants can donate food for free after role approval.</p>
              </details>
              <details className="mb-3">
                <summary className="font-medium">How secure is my payment?</summary>
                <p className="ml-4 mt-1 text-sm">We use Stripe for safe, encrypted transactions.</p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
