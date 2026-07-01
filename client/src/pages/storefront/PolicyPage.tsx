import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";

interface Section {
  heading?: string;
  body: string;
}

interface PolicyConfig {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  sections: Section[];
}

const CONTACT_BLOCK = `Fishtokri is a brand owned and operated by ATHA FOODS PRIVATE LIMITED, having its registered/operating address at Shop No. 2, Wing R7/214, Khartan Road, Thane West - 400601.

Phone: +91 92202 00100
Email: info@fishtokri.com
Hours: Mon - Sun: 6:00 AM - 9:00 PM
GSTIN: 27AAOCA7628P1ZT`;

const POLICIES: Record<string, PolicyConfig> = {
  terms: {
    title: "Terms of Service",
    subtitle: "FISHTOKRI (operated by ATHA FOODS PRIVATE LIMITED)",
    lastUpdated: "1st July 2026",
    sections: [
      {
        body: 'These Terms of Service govern your access to and use of www.fishtokri.com, the Fishtokri mobile application, and any related ordering channels operated by FISHTOKRI (operated by ATHA FOODS PRIVATE LIMITED) (together, the "Platform"). "You" or "User" refers to any person who accesses the Platform or purchases products through it. By using the Platform, you agree to be bound by this Agreement.\n\nIf you do not agree to these Terms, please stop using the Platform immediately.',
      },
      {
        heading: "1. Eligibility",
        body: "You represent that you are at least 18 years of age and legally competent to enter into a binding contract. We reserve the right to refuse access to, or terminate the account of, any person who does not meet this requirement.",
      },
      {
        heading: "2. Use of the Platform",
        body: 'We grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Platform for your personal, non-commercial use, subject to this Agreement. All content on the Platform is owned by or licensed to us and may not be copied, reproduced, or distributed without our prior written consent.\n\nYou agree not to:\n\u2022 Post or transmit content that is unlawful, defamatory, obscene, harassing, or infringes another person\'s rights;\n\u2022 Impersonate any person or misrepresent your affiliation with any person or entity;\n\u2022 Upload viruses or other malicious code, or attempt to disrupt or gain unauthorised access to the Platform;\n\u2022 Scrape, harvest, or collect information about other users;\n\u2022 Reverse-engineer, decompile, or attempt to extract the source code of any part of the Platform.',
      },
      {
        heading: "3. Products, Ordering & Pricing",
        body: "We currently deliver in select serviceable areas within Thane and surrounding regions. Serviceable pincodes are indicated on the Platform at checkout and may change from time to time without prior notice.\n\nOur products (fresh fish, seafood, meat, and related items) are perishable and subject to availability. We reserve the right to limit quantities, reject or cancel an order (in whole or part), or discontinue a product at our discretion, even after an order has been placed.\n\nWe take care to accurately describe and photograph our products, but natural variation in size, cut, and appearance is inherent to fresh produce and does not constitute a defect. Prices displayed on the Platform are indicative; the final bill is based on the actual weight of the product supplied.\n\nPrices, delivery charges, and applicable taxes may change at any time without notice and will be reflected in your final invoice.",
      },
      {
        heading: "4. Delivery & Charges",
        body: "Delivery timelines shown at checkout are estimates and may vary due to traffic, weather, or operational factors. We will make reasonable efforts to keep you informed of any significant delay. A delivery/handling fee, and where applicable a minimum-order or small-cart fee, will be shown at checkout prior to payment.",
      },
      {
        heading: "5. User Account",
        body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Please notify us immediately at info@fishtokri.com if you suspect unauthorised use of your account. Providing false information, or using the Platform for fraudulent or unlawful purposes, will result in immediate termination of this Agreement.",
      },
      {
        heading: "6. Payments",
        body: "Payments made on the Platform are processed through third-party, RBI-authorised payment gateways. By making a payment, you also agree to the applicable terms of that payment provider. We are not responsible for delays or failures caused by your bank, card issuer, or payment provider.",
      },
      {
        heading: "7. Intellectual Property",
        body: "The Fishtokri name, logo, and all related branding are the exclusive property of FISHTOKRI (operated by ATHA FOODS PRIVATE LIMITED). Nothing in this Agreement grants you any right to use our trademarks or branding without our prior written permission.",
      },
      {
        heading: "8. Disclaimer of Warranties",
        body: 'The Platform and products are provided on an "as is" and "as available" basis. To the extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability and fitness for a particular purpose.',
      },
      {
        heading: "9. Limitation of Liability",
        body: "To the extent permitted by applicable law, our aggregate liability arising out of or relating to this Agreement or your use of the Platform shall not exceed the amount you paid for the order giving rise to the claim. We shall not be liable for indirect, incidental, or consequential damages, except where such limitation is not permitted by law.",
      },
      {
        heading: "10. Indemnification",
        body: "You agree to indemnify and hold harmless Fishtokri, its officers, employees, and affiliates from any claims, damages, or expenses (including reasonable legal fees) arising from your breach of this Agreement or misuse of the Platform.",
      },
      {
        heading: "11. Modification & Termination",
        body: "We may amend this Agreement at any time by posting the updated version on the Platform, with the effective date indicated at the top. We may also suspend or terminate your access to the Platform if we reasonably believe you have violated these Terms.",
      },
      {
        heading: "12. Governing Law & Dispute Resolution",
        body: "This Agreement is governed by the laws of India. Any disputes arising out of or in connection with this Agreement shall first be attempted to be resolved amicably, and failing that, shall be subject to arbitration under the Arbitration & Conciliation Act, 1996, seated in Thane, Maharashtra, with courts in Thane, Maharashtra having exclusive jurisdiction.",
      },
      {
        heading: "13. Force Majeure",
        body: "We shall not be liable for any delay or failure in performance resulting from causes beyond our reasonable control, including natural disasters, strikes, pandemics, or government restrictions.",
      },
      {
        heading: "14. Contact & Grievance Officer",
        body: `For any questions regarding these Terms, or to raise a grievance, please contact:\n\n${CONTACT_BLOCK}`,
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    subtitle: "FISHTOKRI (operated by ATHA FOODS PRIVATE LIMITED)",
    lastUpdated: "1st July 2026",
    sections: [
      {
        body: "FISHTOKRI (operated by ATHA FOODS PRIVATE LIMITED) operates the website www.fishtokri.com, the Fishtokri mobile application, and related ordering channels through which we offer fresh fish, seafood, meat, and related products for delivery. This Privacy Policy explains what personal information we collect, how we use it, and the choices you have.\n\nWe may update this Policy from time to time to reflect changes in our practices or applicable law. We encourage you to review this page periodically. Continued use of the Platform after an update constitutes your acceptance of the revised Policy.",
      },
      {
        heading: "1. Information We Collect",
        body: "Account & Order Information: To browse certain features you may register using your mobile number. To place an order, we require your name, mobile number, email address, delivery address, and pincode.\n\nPayment & KYC Information: When you make a payment, your card details, UPI ID, net-banking details, or other payment instrument information are collected and processed directly by our RBI-authorised payment gateway partner(s). We do not store your complete card or banking credentials on our own servers.\n\nFeedback & Support Data: When you contact our customer support team by phone, chat, or email, we may keep a record of that communication for quality, training, and dispute-resolution purposes.\n\nGift / Third-Party Orders: If you place an order to be delivered to someone else, you must provide their name, address, and contact number. You confirm that you have that person's consent to share this information with us.\n\nUsage & Device Data: We automatically collect information about how you interact with the Platform, such as pages or screens viewed, browser or device type, and approximate location (where permitted).\n\nCookies & Similar Technologies: We use cookies and similar technologies to remember your preferences, keep you signed in, and understand how the Platform is used.\n\nAdvertising Data: We may work with third-party advertising partners who use pixel tags or similar technologies to measure the effectiveness of promotions.",
      },
      {
        heading: "2. How We Use Your Information",
        body: "We use the information described above to:\n\u2022 Process and deliver your orders and confirm order status;\n\u2022 Verify your identity and secure your account;\n\u2022 Respond to queries, complaints, and support requests;\n\u2022 Personalise your experience and recommend products;\n\u2022 Send transactional updates and, where you have opted in, promotional communications;\n\u2022 Improve the performance, safety, and functionality of the Platform;\n\u2022 Detect, investigate, and prevent fraud, abuse, or violations of our Terms of Service;\n\u2022 Comply with applicable legal and regulatory obligations, including under the Digital Personal Data Protection Act, 2023.",
      },
      {
        heading: "3. Sharing of Information",
        body: "Fishtokri does not sell your personal information. We share information only in the following circumstances:\n\u2022 Delivery & Logistics Partners - to enable order fulfilment and last-mile delivery;\n\u2022 Payment Partners - to process payments and refunds securely;\n\u2022 Service Providers - vendors who support our operations, bound by confidentiality obligations;\n\u2022 Legal & Regulatory Authorities - where required to comply with law;\n\u2022 Business Transfers - in connection with a merger, acquisition, or sale of assets;\n\u2022 With Your Consent - for any other purpose you have explicitly agreed to.",
      },
      {
        heading: "4. Data Security",
        body: "We use reasonable administrative, technical, and physical safeguards to protect your personal information, including firewalls, access controls, encryption of payment data in transit, and periodic security reviews. However, no method of transmission over the internet is completely secure.",
      },
      {
        heading: "5. Data Retention",
        body: "We retain personal information only for as long as necessary to fulfil the purposes described in this Policy, or as required by applicable law. Once information is no longer required, we take reasonable steps to delete or anonymise it.",
      },
      {
        heading: "6. Your Rights & Choices",
        body: 'You may access, correct, update, or request deletion of your personal information, or withdraw your consent to its use, by writing to us at info@fishtokri.com with "Privacy Request" in the subject line.',
      },
      {
        heading: "7. Children's Privacy",
        body: "The Platform is intended for use by individuals who are 18 years of age or older. We do not knowingly collect personal information from anyone under 18.",
      },
      {
        heading: "8. Grievance Officer",
        body: `For any concerns regarding the processing of your personal information, please contact our Grievance Officer:\n\n${CONTACT_BLOCK}`,
      },
      {
        heading: "9. Governing Law",
        body: "This Policy is governed by the laws of India. This document is an electronic record generated by a computer system and does not require a physical or digital signature.",
      },
    ],
  },

  refund: {
    title: "Order Cancellation & Refund Policy",
    subtitle: "FISHTOKRI (operated by ATHA FOODS PRIVATE LIMITED)",
    lastUpdated: "1st July 2026",
    sections: [
      {
        body: "This Order Cancellation and Reschedule Policy applies to all orders placed on the Fishtokri Platform, operated by FISHTOKRI (operated by ATHA FOODS PRIVATE LIMITED). By placing an order, you agree to this Policy.",
      },
      {
        heading: "1. Cancellation of Orders",
        body: "Scheduled Orders: Free cancellation is available up to 2 hours before the start of your selected delivery slot. Cancellations made after this window may attract a cancellation fee of up to 100% of the order value.\n\nExpress Orders: Free cancellation is available within 5 minutes of placing the order. Cancellations made after this window may attract a cancellation fee of up to 100% of the order value.\n\nFast/Priority Express Orders (where offered): Free cancellation is available within 2 minutes of placing the order.\n\nWe reserve the right to limit, suspend, or decline free cancellations for Users with a pattern of repeated cancellations or suspected misuse of this Policy.\n\nA cancellation fee of up to 100% of the order value may also apply where an order cannot be fulfilled due to:\n\u2022 An incorrect address or an address outside our delivery zone;\n\u2022 Inability to reach the User by phone at the time of delivery;\n\u2022 Failure to provide necessary information or authorisation required to complete delivery.\n\nNo cancellation fee will be charged where the cancellation arises from a reason attributable to Fishtokri.",
      },
      {
        heading: "2. Refunds",
        body: "Once a refund is approved, it is typically credited to your original payment method within 5-7 business days, depending on your bank. Wallet credits may be processed faster.\n\nRefunds are considered where:\n\u2022 The item is delivered after its expiry;\n\u2022 The packaging is damaged in transit;\n\u2022 The wrong item was delivered.\n\nPlease raise any such concern at the time of delivery or shortly after by calling +91 92202 00100.",
      },
      {
        heading: "3. Rescheduling of Orders",
        body: "Scheduled Orders may be rescheduled free of charge up to two (2) times, provided the request is made at least 2 hours before the original slot start time.\n\nExpress Orders may be rescheduled free of charge one (1) time, at any point before the order is out for delivery.",
      },
      {
        heading: "4. Amendments",
        body: "We may update or amend this Policy at any time, at our discretion, without prior notice. Continued use of the Platform constitutes acceptance of the then-current Policy.",
      },
      {
        heading: "5. Contact Us",
        body: `For assistance with an order cancellation, reschedule, or refund request, please contact us:\n\n${CONTACT_BLOCK}`,
      },
    ],
  },

  faq: {
    title: "Frequently Asked Questions",
    subtitle: "FISHTOKRI (operated by ATHA FOODS PRIVATE LIMITED)",
    sections: [
      {
        body: "For any queries not answered below, please reach out to us at info@fishtokri.com or call us at +91 92202 00100 (Mon - Sun: 6:00 AM - 9:00 PM).",
      },
      { heading: "Orders & Payments", body: "" },
      {
        heading: "Is GST included in the price?",
        body: "FishTokri is registered under GST. Taxes are levied in accordance with prevailing GST regulations. The applicable GST rate depends on the nature of the product or service and will be reflected in the order summary and tax invoice.",
      },
      {
        heading: "Why isn't my coupon code applying?",
        body: "Coupon codes are generally not valid on already-discounted products unless stated otherwise. If your cart also contains non-discounted items that meet the offer's minimum order value, the coupon should apply to those items.",
      },
      {
        heading: "Can I order more than one of the same item?",
        body: "Yes. Simply adjust the quantity for that item in your cart before checkout.",
      },
      {
        heading: "What payment methods do you accept?",
        body: "We accept major debit/credit cards, UPI, net banking, and popular digital wallets, as shown at checkout. Cash/UPI on delivery may also be available in select areas.",
      },
      {
        heading: "I was charged but did not receive an order confirmation.",
        body: "This can occasionally happen due to a delay on your bank's end. In most cases the amount is auto-reversed within 72 hours. If it is not, please write to us at info@fishtokri.com or call +91 92202 00100.",
      },
      {
        heading: "I'm getting an error at checkout.",
        body: "Please double-check your card number, expiry date, and CVV. If the issue persists, contact our support team for assistance.",
      },
      { heading: "Delivery", body: "" },
      {
        heading: "Which areas do you currently deliver to?",
        body: "We currently deliver across serviceable pincodes in Thane and nearby areas. You can check serviceability by entering your pincode on the Platform.",
      },
      {
        heading: "How long will my delivery take?",
        body: "Delivery timelines depend on the slot selected at checkout - express or scheduled. Estimated times are shown before you confirm your order.",
      },
      {
        heading: "Can I schedule a delivery in advance?",
        body: "Yes, you can pre-book an order for a future date and time slot, subject to availability.",
      },
      {
        heading: "Can I deliver to multiple addresses in one order?",
        body: "At this time, each order can only be delivered to a single address. Please place separate orders for different delivery locations.",
      },
      {
        heading: "How do I track my order?",
        body: "Once your order is confirmed, you can track it in real time from the My Orders section in your profile.",
      },
      { heading: "Cancellations, Refunds & Quality", body: "" },
      {
        heading: "How do I cancel my order?",
        body: "Go to My Orders and tap Cancel Order. Cancellations made within the applicable free-cancellation window are not charged; cancellations after that window may attract a cancellation fee. Please see our Refund Policy for full details.",
      },
      {
        heading: "My order arrived damaged, expired, or incorrect. What do I do?",
        body: "Please raise this with us at the time of delivery, or shortly after, by calling +91 92202 00100. Returns/refunds are considered where the item is delivered after its expiry, the packaging is damaged in transit, or the wrong item was delivered.",
      },
      {
        heading: "How long do refunds take?",
        body: "Once a refund is approved, it is typically credited to your in-app wallet, which can be used for your next order on our application, within 5–7 business days, depending on your issue.",
      },
      {
        heading: "What is the difference between fresh and frozen products?",
        body: "Our fish, seafood, and meat are sourced and delivered fresh, held at controlled chilled temperatures, and are not frozen. Frozen products, where offered, will be clearly labelled as such.",
      },
      {
        heading: "Am I charged for wastage during cleaning/cutting?",
        body: "No. Our products are cleaned, scaled, or cut before weighing and billing, so you are only charged for the usable product delivered to you.",
      },
      {
        heading: "Do you use antibiotics or growth hormones?",
        body: "No. We do not add antibiotics or growth-promoting hormones to any of our products.",
      },
      { heading: "Account", body: "" },
      {
        heading: "Do I need an account to place an order?",
        body: "Yes, registering with your mobile number is required to place an order.",
      },
      {
        heading: "I can't log in to my account.",
        body: "Please try the OTP login option first. If the issue continues, write to us at info@fishtokri.com with your registered mobile number.",
      },
      {
        heading: "How do I update my delivery address?",
        body: "Go to your Profile and edit or add a new address. You can save multiple addresses for future orders.",
      },
      {
        heading: "How do I unsubscribe from promotional messages?",
        body: "Use the unsubscribe link in any promotional email, or write to us at info@fishtokri.com and we will update your preferences.",
      },
    ],
  },
};

function renderBody(text: string) {
  return text.split("\n").map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    if (line.startsWith("\u2022")) {
      return (
        <p key={i} className="flex gap-2 text-slate-600 text-sm leading-relaxed">
          <span className="text-primary mt-0.5 shrink-0">&bull;</span>
          <span>{line.slice(1).trim()}</span>
        </p>
      );
    }
    return <p key={i} className="text-slate-600 text-sm leading-relaxed">{line}</p>;
  });
}

export function PolicyPage({ policy }: { policy: "terms" | "privacy" | "refund" | "faq" }) {
  const config = POLICIES[policy];
  const isFaq = policy === "faq";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 pb-16">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium mb-6 hover:opacity-75 transition-opacity">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-[#364F9F] px-6 sm:px-8 py-8">
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1">{config.subtitle}</p>
            <h1 className="text-white text-2xl sm:text-3xl font-bold">{config.title}</h1>
            {config.lastUpdated && (
              <p className="text-white/60 text-xs mt-2">Last Updated: {config.lastUpdated}</p>
            )}
          </div>

          <div className="px-6 sm:px-8 py-8 space-y-6">
            {config.sections.map((section, idx) => {
              const isCategory = isFaq && section.heading && section.body === "" && idx > 0;
              if (isCategory) {
                return (
                  <div key={idx} className="pt-4">
                    <h2 className="text-base font-bold text-[#364F9F] uppercase tracking-wide border-b border-slate-200 pb-2">
                      {section.heading}
                    </h2>
                  </div>
                );
              }
              return (
                <div key={idx} className={section.heading ? "space-y-2" : ""}>
                  {section.heading && !isCategory && (
                    <h3 className={`font-semibold ${isFaq && section.body ? "text-foreground text-sm" : "text-foreground text-base"}`}>
                      {section.heading}
                    </h3>
                  )}
                  {section.body && (
                    <div className="space-y-2">
                      {renderBody(section.body)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
