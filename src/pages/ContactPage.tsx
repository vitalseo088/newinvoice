import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Clock,
  HelpCircle,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface ContactPageProps {
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const ref = 'INV-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(ref);
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('General Feedback');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-[#1A3263] transition font-medium cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-gray-900 font-semibold">Contact Us</span>
      </nav>

      {/* Header */}
      <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs p-6 sm:p-10 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-[#1A3263]/10 text-[#1A3263] border border-[#1A3263]/15 mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
          We’d love to hear from you.
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
          Have a question about our free invoice generator, an idea for a new feature, or want to report
          feedback? Our support team is ready to help.
        </p>
      </div>

      {/* Form + Direct Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Message Received!</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Thank you for reaching out to Invoiceo.online. Your reference confirmation is{' '}
                <strong className="text-gray-900 font-mono">{ticketId}</strong>. We review all messages
                promptly.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 transition cursor-pointer"
                >
                  Send Another Message
                </button>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="px-4 py-2 bg-[#1A3263] hover:bg-[#132549] rounded-xl text-xs font-bold text-white transition cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Back to Invoicing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <MessageSquare className="w-5 h-5 text-[#1A3263]" />
                <h2 className="text-lg font-bold text-gray-900">Send Us a Direct Message</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-gray-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1A3263] focus:ring-1 focus:ring-[#1A3263] transition"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-gray-700 mb-1.5">
                    Your Email Address <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1A3263] focus:ring-1 focus:ring-[#1A3263] transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-topic" className="block text-xs font-bold text-gray-700 mb-1.5">
                  Subject / Topic
                </label>
                <select
                  id="contact-topic"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1A3263] focus:ring-1 focus:ring-[#1A3263] bg-white transition"
                >
                  <option value="General Feedback">General Feedback & Suggestions</option>
                  <option value="Feature Request">Request a New Feature or Document Tool</option>
                  <option value="Question">Usage or Calculation Question</option>
                  <option value="Partnership">Partnership & Media Inquiry</option>
                  <option value="Other">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-gray-700 mb-1.5">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind or how we can make Invoiceo even better..."
                  className="w-full text-sm border border-gray-300 rounded-xl p-3.5 outline-none focus:border-[#1A3263] focus:ring-1 focus:ring-[#1A3263] transition"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-500">
                  We respect your privacy. No spam, ever.
                </span>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A3263] hover:bg-[#132549] disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-sm transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Info Sidebar (1 col) */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
              Direct Contact Details
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-gray-500 block">General Support</span>
                <a
                  href="mailto:support@invoiceo.online"
                  className="font-semibold text-[#1A3263] hover:underline"
                >
                  support@invoiceo.online
                </a>
              </div>

              <div>
                <span className="text-xs text-gray-500 block">Partnerships & Feedback</span>
                <a
                  href="mailto:partnerships@invoiceo.online"
                  className="font-semibold text-[#1A3263] hover:underline"
                >
                  partnerships@invoiceo.online
                </a>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-start gap-2.5 text-xs text-gray-600">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Typical response:</strong> Within 24-48 business hours. We review user feedback daily.
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 text-xs text-gray-600">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
              <HelpCircle className="w-4 h-4 text-[#1A3263]" />
              <span>Looking for Quick Answers?</span>
            </div>
            <p>
              Check our built-in <strong>FAQ & Complete Invoicing Guide</strong> located on the main
              page for immediate explanations on VAT/tax setups, payment terms, and browser backups.
            </p>
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-[#1A3263] font-bold hover:underline block pt-1 cursor-pointer"
            >
              Open FAQ & Invoicing Guide →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
