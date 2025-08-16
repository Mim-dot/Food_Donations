import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About";
  }, []);
  return (
    <div className="min-h-screen nav bg-[#F5EFE6] text-[#5C3B1D] py-12 px-6 font-[Comfortaa] mt-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl nav-bite font-bold mb-6 text-[#7B4F28]">
          About Us
        </h1>
        <p className="text-lg mb-6 nav-bite">
          Our Local Food Waste Reduction Platform is committed to bridging the
          gap between surplus and need. Restaurants can donate extra food,
          charities can request and pick up donations, and users can explore how
          they can contribute to a more sustainable and compassionate community.
        </p>
        <div className="nav-bite grid gap-8 md:grid-cols-2 mt-10 text-left">
          <div>
            <h2 className="nav-bite text-2xl font-semibold text-[#7B4F28] mb-3">
              🌍 Our Mission
            </h2>
            <p>
              We strive to minimize food waste by connecting food donors with
              trusted charities. Our goal is to make food accessibility better
              while also reducing environmental impact.
            </p>
          </div>
          <div>
            <h2 className="nav-bite text-2xl font-semibold text-[#7B4F28] mb-3">
              👥 Who We Serve
            </h2>
            <p>
              Restaurants, Charities, and Individuals—all working together to
              make a difference. Our platform supports role-based dashboards and
              features that simplify the food donation and pickup process.
            </p>
          </div>
          <div>
            <h2 className="nav-bite text-2xl font-semibold text-[#7B4F28] mb-3">
              🔐 Transparency & Trust
            </h2>
            <p>
              We use secure logins, Stripe payments, and role verification to
              ensure every transaction and request is safe, legitimate, and
              impactful.
            </p>
          </div>
          <div>
            <h2 className="nav-bite text-2xl font-semibold text-[#7B4F28] mb-3">
              📊 Our Impact
            </h2>
            <p>
              With every donation made, meals are saved, hunger is reduced, and
              the community becomes stronger. We track meaningful statistics
              like total meals served and CO₂ emissions reduced.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
