import React, { useState } from 'react';
import { COMPANY_INFO } from '../utils/helpers';
import { useStore } from '../context/StoreContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  HelpCircle
} from 'lucide-react';

const FAQS = [
  {
    q: 'Where do your products ship from?',
    a: 'All orders are securely packaged and dispatched directly from our RAI H PRIME LLC fulfillment facility located at 129 E Orange Ct, Parkville, MD 21234.'
  },
  {
    q: 'How long will delivery take?',
    a: 'Standard Continental US delivery takes 3 to 5 business days. Orders placed before 2:00 PM EST Monday through Friday ship the same day. Express 2-Day Air and Priority Overnight options are also available at checkout.'
  },
  {
    q: 'What is the 30-Day Money-Back Guarantee?',
    a: 'If any grocery or nutrition item arrives damaged, does not match its description, or fails to meet your satisfaction, contact us within 30 days for a prompt full refund or free replacement.'
  },
  {
    q: 'How can I get free shipping?',
    a: 'We offer Free Standard Continental US Shipping on all orders of $50 or more! Use coupon code "RAIHPRIME" for an extra 15% discount on your order.'
  },
  {
    q: 'Do you offer bulk wholesale or business accounts?',
    a: `Yes! We supply gyms, fitness clubs, office pantries, and cafes with protein bars, snacks, and craft coffee. Contact ${COMPANY_INFO.email} with your order requirements.`
  }
];

export default function ContactSection() {
  const { addToast } = useStore();
  const [openFaq, setOpenFaq] = useState(0);
  const [isSent, setIsSent] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    orderId: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    addToast('Your message has been sent to our Parkville, MD support team!', 'success');
    setForm({
      name: '',
      email: '',
      orderId: '',
      subject: 'General Inquiry',
      message: ''
    });
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="bg-slate-50 py-12 lg:py-20 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
            <span>Dedicated Customer Care</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif-title">
            Get in Touch With Raih Prime
          </h1>
          <p className="text-sm text-slate-600">
            Have questions about an order, ingredient information, or wholesale inquiries? 
            Our team is here to assist you 6 days a week.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left 5 Cols: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
              <h3 className="font-bold text-slate-900 text-base font-serif-title">
                Corporate & Fulfillment Headquarters
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-sm">{COMPANY_INFO.legalName}</strong>
                    <p className="text-slate-500">Care of: {COMPANY_INFO.soleMember} (Sole Member)</p>
                    <p>{COMPANY_INFO.fullAddress}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] font-semibold uppercase">Email Support</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-900 font-bold hover:text-amber-600">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] font-semibold uppercase">Telephone</span>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="text-slate-900 font-bold hover:text-amber-600">
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] font-semibold uppercase">Customer Service Hours</span>
                    <p className="text-slate-900 font-semibold">{COMPANY_INFO.operatingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Guarantee Card */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                ⚡ Rapid Support Pledge
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                All emails and support tickets receive a personalized response from a dedicated representative within 
                <strong> 2 to 4 business hours</strong>.
              </p>
            </div>

          </div>

          {/* Right 7 Cols: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg font-serif-title mb-4">
              Send Us a Message
            </h3>

            {isSent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">Message Successfully Sent!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out to RAI H PRIME LLC. Our team in Parkville, MD has received your inquiry.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Order # (Optional)</label>
                    <input
                      type="text"
                      value={form.orderId}
                      onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                      placeholder="e.g. RHP-78421"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Topic</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none cursor-pointer"
                    >
                      <option>General Inquiry</option>
                      <option>Order Status / Tracking</option>
                      <option>Product Ingredients & Certification</option>
                      <option>Returns & Refunds</option>
                      <option>Wholesale & Bulk Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you today?"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Send Message to Support Team</span>
                </button>
              </form>
            )}

          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-20 max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl font-bold font-serif-title text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-amber-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
