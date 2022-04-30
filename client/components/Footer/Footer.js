import React from "react";

import FooterColumn from "../FooterColumn";

import "./Footer.scss";


export default () => {
  return (
    <div className="footer">
      <FooterColumn data={companyColumn} />
      <FooterColumn data={customerCareColumn} />
    </div>
  );
};

const companyColumn = {
  title: "Company",
  items: [
    { title: "About", url: "" },
    { title: "Careers", url: "" },
    { title: "Our Apps", url: "" },
  ],
};

const customerCareColumn = {
  title: "Customer Care",
  items: [
    { title: "Track Order", url: "" },
    { title: "Return", url: "" },
    { title: "FAQs", url: "" },
    { title: "Contact Us", url: "" },
    { title: "Privacy Policy", url: "" },
    { title: "Cookie Policy", url: "" },
    { title: "Terms & Conditions", url: "" },
  ],
};
