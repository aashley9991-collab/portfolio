/* =========================================================================
   CONTACT — collaboration section with an accessible frontend form.

   IMPORTANT: there is no backend. The form validates input and then prepares
   a fully written email for the visitor's own mail client. It never claims a
   message was delivered.
   ========================================================================= */

import { useEffect, useRef, useState } from "react";
import { initReveals } from "../lib/motion.js";
import { projectTypes, site } from "../data/site.js";
import SectionHead from "./SectionHead.jsx";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

const EMPTY = { name: "", email: "", type: "", message: "" };

/* All validation rules live in one place */
function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!values.type) errors.type = "Please choose a project type.";
  if (values.message.trim().length < 12)
    errors.message = "Please add a little more detail (at least 12 characters).";
  return errors;
}

/* Error message — defined outside Contact so React keeps the same DOM node
   and screen readers announce it once. */
function FieldError({ field, show, message }) {
  if (!show) return null;
  return (
    <p
      id={`contact-${field}-error`}
      role="alert"
      className="mt-2 flex items-start gap-2 text-[0.82rem] text-[#a83c33]"
    >
      <AlertCircle size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
      {message}
    </p>
  );
}

export default function Contact() {
  const rootRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const reveals = initReveals(rootRef.current);
    return () => reveals.revert();
  }, []);

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;
  const showError = (field) => (submitted || touched[field]) && errors[field];

  const update = (field) => (event) =>
    setValues((prev) => ({ ...prev, [field]: event.target.value }));

  const blur = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (!isValid) {
      document.getElementById(`contact-${Object.keys(errors)[0]}`)?.focus();
    }
  };

  const reset = () => {
    setSubmitted(false);
    setTouched({});
    setValues(EMPTY);
  };

  /* A genuinely working action: opens the visitor's mail client, pre-written */
  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Project enquiry — ${values.type || "Collaboration"}`
  )}&body=${encodeURIComponent(
    `Name: ${values.name}\nEmail: ${values.email}\nProject type: ${values.type}\n\n${values.message}`
  )}`;

  const fieldProps = (field) => ({
    id: `contact-${field}`,
    value: values[field],
    onChange: update(field),
    onBlur: blur(field),
    "aria-invalid": showError(field) ? "true" : undefined,
    "aria-describedby": showError(field) ? `contact-${field}-error` : undefined,
  });

  return (
    <section id="contact" ref={rootRef} className="section border-t border-line">
      <div className="shell-wide">
        <SectionHead
          index="06"
          label="Contact"
          title="Have an idea worth bringing to life?"
          lede="Let's explore how augmented reality and interactive design can turn your concept into an engaging digital experience."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-12">
          {/* ---------------- identity panel ---------------- */}
          <div className="lg:col-span-5" data-reveal>
            <div className="rounded-[10px] border border-line bg-canvas-alt p-7 sm:p-9">
              <p className="kicker">Get in touch</p>

              <p className="mt-6 font-display text-[clamp(1.5rem,2.8vw,1.95rem)] font-semibold leading-tight text-charcoal">
                {site.fullName}
              </p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-slate">{site.title}</p>

              <div className="mt-8 space-y-4 border-t border-line pt-7">
                <p className="flex items-center gap-3 text-[0.95rem] text-charcoal">
                  <MapPin size={16} aria-hidden="true" className="shrink-0 text-clay" />
                  {site.location}
                </p>
                <p className="flex items-start gap-3">
                  <Mail size={16} aria-hidden="true" className="mt-1 shrink-0 text-clay" />
                  <a
                    href={`mailto:${site.email}`}
                    className="ulink break-all text-[0.98rem] font-medium text-charcoal"
                  >
                    {site.email}
                  </a>
                </p>
              </div>

              <p className="mt-8 border-t border-line pt-7 text-[0.85rem] leading-relaxed text-slate">
                Prefer your own mail client? Write directly — the address above is a working
                mailto link and reaches me without any form involved.
              </p>
            </div>

            {/* what to include — helps serious enquiries arrive useful */}
            <div className="mt-6 rounded-[10px] border border-line bg-paper p-6">
              <h3 className="kicker">Helpful to include</h3>
              <ul className="mt-3 space-y-2 text-[0.88rem] leading-relaxed text-slate">
                <li>· What you want people to experience</li>
                <li>· Which platform you have in mind</li>
                <li>· Rough timeline, if one exists</li>
              </ul>
            </div>
          </div>

          {/* ---------------- form ---------------- */}
          <div className="lg:col-span-7" data-reveal>
            <form noValidate onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="kicker block">
                    Name
                  </label>
                  <input
                    {...fieldProps("name")}
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    className="field mt-2"
                  />
                  <FieldError field="name" show={showError("name")} message={errors.name} />
                </div>

                <div>
                  <label htmlFor="contact-email" className="kicker block">
                    Email address
                  </label>
                  <input
                    {...fieldProps("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="you@studio.com"
                    className="field mt-2"
                  />
                  <FieldError field="email" show={showError("email")} message={errors.email} />
                </div>
              </div>

              <div>
                <label htmlFor="contact-type" className="kicker block">
                  Project type
                </label>
                <select {...fieldProps("type")} className="field mt-2">
                  <option value="">Select a project type…</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <FieldError field="type" show={showError("type")} message={errors.type} />
              </div>

              <div>
                <label htmlFor="contact-message" className="kicker block">
                  Message
                </label>
                <textarea
                  {...fieldProps("message")}
                  rows={6}
                  placeholder="Tell me about the idea — what it is, who it is for, and what success would look like."
                  className="field mt-2 resize-y"
                />
                <FieldError field="message" show={showError("message")} message={errors.message} />
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <button type="submit" className="btn btn-primary">
                  Send enquiry
                  <Send size={15} aria-hidden="true" />
                </button>
                <p className="max-w-xs text-[0.78rem] leading-relaxed text-mist">
                  Frontend demonstration — nothing is transmitted from this page.
                </p>
              </div>

              {/* ---------------- status region ---------------- */}
              <div role="status" aria-live="polite">
                {submitted && isValid && (
                  <div className="rounded-[10px] border border-cobalt/35 bg-cobalt-wash p-6">
                    <p className="flex items-center gap-3 text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-cobalt">
                      <CheckCircle2 size={16} aria-hidden="true" />
                      Your details are ready
                    </p>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-slate">
                      This form is a frontend demonstration and has{" "}
                      <span className="font-medium text-charcoal">not sent anything</span>. To reach
                      me now, open the message in your email app — it arrives pre-written and
                      addressed to <span className="font-medium text-charcoal">{site.email}</span>.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a href={mailtoHref} className="btn btn-primary btn-sm">
                        Open in email app
                        <Mail size={14} aria-hidden="true" />
                      </a>
                      <button type="button" onClick={reset} className="btn btn-outline btn-sm">
                        Edit message
                      </button>
                    </div>
                  </div>
                )}

                {submitted && !isValid && (
                  <div className="rounded-[10px] border border-[#a83c33]/35 bg-[#fdf3f1] p-6">
                    <p className="flex items-center gap-3 text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-[#a83c33]">
                      <AlertCircle size={16} aria-hidden="true" />
                      Please check the highlighted fields
                    </p>
                    <p className="mt-3 text-[0.9rem] text-slate">
                      {Object.keys(errors).length} field
                      {Object.keys(errors).length > 1 ? "s need" : " needs"} your attention before
                      the message can be prepared.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
