import React from "react";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I apply for an apartment?",
      answer:
        "Go to the Apartments page, select an available unit, and click 'Request Agreement'. You’ll receive admin confirmation soon.",
    },
    {
      question: "Can I pay my rent online?",
      answer:
        "Yes! You can make rent payments securely through our Make Payment page using Stripe.",
    },
    {
      question: "What if my agreement request gets rejected?",
      answer:
        "You can reapply for another available apartment once your previous request status changes to 'Ready for Agreement'.",
    },
    {
      question: "How can I use a coupon?",
      answer:
        "While paying rent, enter a valid coupon code in the payment form to get a discount.",
    },
    {
      question: "Who do I contact for maintenance issues?",
      answer:
        "You can report any maintenance issue from your Member Dashboard under 'Maintenance Requests'.",
    },
  ];

  return (
    <section className="w-full bg-base-100 py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            tabIndex={0}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
          >
            <input type="checkbox" />
            <div className="collapse-title text-lg  font-medium accordion">
              
              {faq.question}
            </div>
            <div className="collapse-content text-sm text-base-content/80">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
