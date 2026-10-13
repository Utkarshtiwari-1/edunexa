import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineGlobeAlt,
  HiOutlinePhone,
} from "react-icons/hi2";

import Contactform from "../Components/common/Contactform";
import Footer from "../Components/common/Footer";
import RatingandReviewslider from "../Components/common/RatingandReviewslider";

// Keep the contact details in one place so they're easy to edit
const contactDetails = [
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "Chat with us",
    description: "Our friendly team is here to help.",
    value: "info@example.com",
    href: "mailto:info@example.com",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Visit us",
    description: "Come and say hello at our office HQ.",
    value: "Your office address goes here",
    href: null,
  },
  {
    icon: HiOutlinePhone,
    title: "Call us",
    description: "Mon - Fri, 8am to 5pm",
    value: "+123 456 7890",
    href: "tel:+1234567890",
  },
];

function ContactInfoItem({ icon: Icon, title, description, value, href }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-richblack-700 text-yellow-50">
        <Icon className="text-2xl" />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-richblack-5">{title}</h2>
        <p className="text-sm text-richblack-200">{description}</p>
        {href ? (
          <a
            href={href}
            className="w-fit text-sm font-medium text-richblack-5 underline-offset-4 transition-colors hover:text-yellow-50 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-50"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-richblack-5">{value}</p>
        )}
      </div>
    </div>
  );
}

function Contactuspage() {
  return (
    <div className="relative overflow-hidden">
      {/* Soft glow behind the hero, purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-yellow-50/10 blur-[120px]"
      />

      {/* Intro + main content */}
      <section className="relative mx-auto w-11/12 max-w-maxContent pt-16 sm:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold text-richblack-5 sm:text-4xl lg:text-5xl">
            Got an idea? We’ve got the skills. Let’s team up.
          </h1>
          <p className="mt-4 text-base text-richblack-300">
            Tell us more about yourself and what you have in mind. We usually
            reply within one business day.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-8 pb-16 lg:flex-row lg:items-start lg:gap-10">
          {/* Contact info card */}
          <aside className="flex flex-col gap-8 rounded-2xl border border-richblack-600 bg-richblack-800 p-8 sm:p-10 lg:sticky lg:top-24 lg:w-[38%]">
            {contactDetails.map((item, index) => (
              <div key={item.title} className="flex flex-col gap-8">
                <ContactInfoItem {...item} />
                {index !== contactDetails.length - 1 && (
                  <hr className="border-richblack-600" />
                )}
              </div>
            ))}
          </aside>

          {/* Form card */}
          <div className="rounded-2xl border border-richblack-600 bg-richblack-800 p-8 sm:p-10 lg:w-[62%]">
            <h2 className="text-2xl font-semibold text-richblack-5">
              Send us a message
            </h2>
            <p className="mb-8 mt-2 text-sm text-richblack-300">
              Fill in the form below and we’ll get back to you by email.
            </p>
            <Contactform />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="relative mx-auto w-11/12 max-w-maxContent pb-16">
        <h2 className="mb-10 text-center text-3xl font-semibold text-richblack-5 sm:text-4xl">
          Reviews from other learners
        </h2>
        <RatingandReviewslider />
      </section>

      <Footer />
    </div>
  );
}

export default Contactuspage;