import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm } from '../../api/contact';

/**
 * ContactModal Component - Redesigned as a glassy frosted-blur modal
 * matching the attached screenshot style.
 */
export default function ContactModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    // Hover tooltip tracking
    const [tooltipMsg, setTooltipMsg] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (msg) => {
        setTooltipMsg(msg);
    };

    const handleMouseLeave = () => {
        setTooltipMsg(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Dynamically clear validation alerts
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (validationErrors.contact && (name === 'email' || name === 'phone')) {
            setValidationErrors(prev => ({ ...prev, contact: '' }));
        }
    };

    const handleClear = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
        setValidationErrors({});
        setStatus('idle');
        setErrorMsg('');
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required.";
        }
        if (!formData.message.trim()) {
            errors.message = "Message is required.";
        }
        // At least one of email or phone must be filled out
        if (!formData.email.trim() && !formData.phone.trim()) {
            errors.contact = "Please provide either an Email or a Phone Number.";
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setStatus('submitting');
        setErrorMsg('');

        try {
            await submitContactForm(formData);
            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
            setErrorMsg(err.response?.data?.message || 'Failed to submit form. Please check your backend connection.');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Dark overlay backdrop */}
                    <motion.div 
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Window Container */}
                    <div className="fixed inset-0 flex items-center justify-center p-4 z-[1000] pointer-events-none">
                        <motion.div 
                            // className="bg-white/20 backdrop-blur-2xl text-[#111] w-full max-w-lg border border-white/20 rounded-[10px] p-12 shadow-2xl relative pointer-events-auto select-none"
                            className="bg-white/20 backdrop-blur-2xl text-[#111] w-full max-w-lg border border-white/20 rounded-[20px] shadow-2xl relative pointer-events-auto select-none"
    style={{
        padding: "48px 50px 40px 50px"
    }}
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                        >
                            {/* Close Button - Golden filled circle matching screenshot */}
                            <button 
                                className="absolute top-6 right-6 w-9 h-9 bg-[#FFC300] hover:bg-[#FFAA00] text-[#111] rounded-full flex items-center justify-center font-bold transition-all cursor-target cursor-none z-[100]"
                                onClick={onClose}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {status === 'success' ? (
//                                 <div className="text-center py-8">
//                                     <div className="text-6xl mb-4">🎉</div>
//                                     <h3 className="text-2xl font-extrabold font-outfit mb-3">Message Sent!</h3>
//                                     <p className="text-sm text-gray-800 font-outfit mb-8">
//                                         Thanks for reaching out! I'll connect with you soon.
//                                     </p>
//                                     <button 
//                                         className="w-full py-4 bg-[#111115] hover:bg-[#222228] text-[#FFC300] rounded-2xl flex items-center justify-center gap-2 font-bold transition-all duration-300 shadow-md cursor-target cursor-none font-outfit"
//                                         style={{
//     borderRadius: "15px",
//     height: "45px",
//     paddingLeft: "24px",
//     paddingRight: "24px",
//     fontSize: "20px"
// }}
//                                         onClick={() => {
//                                             handleClear();
//                                             onClose();
//                                         }}
//                                     >
//                                         Close
//                                     </button>
//                                 </div>
<div
    className="flex flex-col items-center text-center"
    style={{
        paddingTop: "10px",
        paddingBottom: "20px",
        gap: "10px"      // <-- Controls spacing between everything
    }}
>
    <div
        style={{
            fontSize: "72px"
        }}
    >
        🎉
    </div>

    <div
        className="font-extrabold font-outfit"
        style={{
            fontSize: "38px"
        }}
    >
        Message Sent!
    </div>

    <p
        className="text-gray-800 font-outfit"
        style={{
            fontSize: "18px",
            maxWidth: "380px"
        }}
    >
        Thanks for reaching out! I'll connect with you soon.
    </p>

    <button
        className="w-full bg-[#111115] hover:bg-[#222228] text-[#FFC300] font-bold font-outfit transition-all"
        style={{
            marginTop: "15px",      // <-- Extra space above button
            height: "45px",
            borderRadius: "15px"
        }}
        onClick={() => {
            handleClear();
            onClose();
        }}
    >
        Close
    </button>
</div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="mb-2" style={{
        marginBottom: "15px"
    }}>
                                        <div className="text-3xl font-extrabold font-outfit tracking-tight text-black">Contact Me</div>
                                        {/* <p className="text-sm text-gray-700 font-outfit mt-1">I'd love to hear from you! Fill out the form and I'll get back to you soon.</p> */}
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-3.5 border border-red-500/30 bg-red-500/10 backdrop-blur-md text-red-900 text-xs font-bold rounded-xl font-outfit"
                                        style={{
    borderRadius: "15px",
    padding: "9px 18px",
    minHeight: "15px"
}}
                                        >
                                            ⚠️ {errorMsg}
                                        </div>
                                    )}

                                    {validationErrors.contact && (
                                        <div className="p-3.5 border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-amber-900 text-xs font-bold rounded-xl font-outfit"
                                        style={{
    borderRadius: "15px",
    padding: "9px 18px",
    minHeight: "15px"
}}
                                        >
                                            ⚠️ {validationErrors.contact}
                                        </div>
                                    )}

                                    {/* Name input (Required) */}
                                    <div className="relative w-full">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700 pointer-events-none">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <input 
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-black/10 border border-amber-500/30 text-[#111] placeholder-[#111]/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-outfit text-base cursor-target cursor-none ${validationErrors.name ? 'border-red-500/50 focus:ring-red-400/50' : ''}`}
                                            style={{
    borderRadius: "15px",
    height: "20px",
    paddingLeft: "45px",
    paddingRight: "20px",
    paddingTop: "18px",
    paddingBottom: "18px"
}}
                                            onMouseEnter={() => handleMouseEnter("Knock knock! Who's there?")}
                                            onMouseLeave={handleMouseLeave}
                                            onMouseMove={handleMouseMove}
                                            placeholder="Name"
                                        />
                                        {validationErrors.name && (
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600 text-xs font-bold font-outfit">{validationErrors.name}</span>
                                        )}
                                    </div>

                                    {/* Email input */}
                                    <div className="relative w-full">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700 pointer-events-none">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        <input 
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/10 border border-amber-500/30 text-[#111] placeholder-[#111]/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-outfit text-base cursor-target cursor-none"
                                            style={{
    borderRadius: "15px",
    height: "20px",
    paddingLeft: "45px",
    paddingRight: "20px",
    paddingTop: "18px",
    paddingBottom: "18px"
}}
                                            onMouseEnter={() => handleMouseEnter("How should I get back to you?")}
                                            onMouseLeave={handleMouseLeave}
                                            onMouseMove={handleMouseMove}
                                            placeholder="Email"
                                        />
                                    </div>

                                    {/* Phone input (Placed below Email) */}
                                    <div className="relative w-full">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700 pointer-events-none">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </span>
                                        <input 
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/10 border border-amber-500/30 text-[#111] placeholder-[#111]/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-outfit text-base cursor-target cursor-none"
                                            style={{
    borderRadius: "15px",
    height: "20px",
    paddingLeft: "45px",
    paddingRight: "20px",
    paddingTop: "18px",
    paddingBottom: "18px"
}}
                                            onMouseEnter={() => handleMouseEnter("How should I get back to you?")}
                                            onMouseLeave={handleMouseLeave}
                                            onMouseMove={handleMouseMove}
                                            placeholder="Phone"
                                        />
                                    </div>

                                    {/* Message Textarea (Required) */}
                                    <div className="relative w-full">
                                        <span className="absolute left-4 top-5 text-amber-700 pointer-events-none">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </span>
                                        <textarea 
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className={`w-full pl-12 pr-4 pt-4 pb-4 rounded-2xl bg-black/10 border border-amber-500/30 text-[#111] placeholder-[#111]/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-outfit text-base cursor-target cursor-none resize-none ${validationErrors.message ? 'border-red-500/50 focus:ring-red-400/50' : ''}`}
                                            style={{
    borderRadius: "15px",
    height: "120px",
    paddingLeft: "45px",
    paddingRight: "20px",
    paddingTop: "18px",
    paddingBottom: "20px"
}}
                                            onMouseEnter={() => handleMouseEnter("Spill the beans. ☕")}
                                            onMouseLeave={handleMouseLeave}
                                            onMouseMove={handleMouseMove}
                                            placeholder="Message"
                                        />
                                        {validationErrors.message && (
                                            <span className="absolute right-4 bottom-4 text-red-600 text-xs font-bold font-outfit">{validationErrors.message}</span>
                                        )}
                                    </div>

                                    {/* Action Button - Capsule styled with paper airplane icon matching reference screenshot */}
                                    <div className="flex flex-col gap-2.5 mt-2">
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="w-full py-4 bg-[#111115] hover:bg-[#222228] text-[#FFC300] rounded-2xl flex items-center justify-center gap-2.5 font-bold transition-all duration-300 shadow-md cursor-target cursor-none font-outfit disabled:opacity-50"
                                            style={{
    borderRadius: "15px",
    height: "45px",
    paddingLeft: "24px",
    paddingRight: "24px",
    fontSize: "20px"
}}
                                        >
                                            <svg className="w-5 h-5 transform rotate-45 -translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                                        </button>
                                        
                                        {/* Low-impact Clear button to preserve reference image visuals */}

                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                width: "100%"
                                            }}
                                        >
                                        <button
                                            type="button"
                                            onClick={handleClear}
                                            className="text-xs text-gray-700 hover:text-black font-semibold font-outfit transition-colors underline cursor-target cursor-none py-1 w-fit mx-auto"
                                        >
                                            Clear Form
                                        </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>

                    {/* Mouse-following Form Fields Tooltip */}
                    <AnimatePresence>
                        {tooltipMsg && (
                            <div 
                                style={{
                                    position: 'fixed',
                                    left: mousePos.x,
                                    top: mousePos.y,
                                    transform: 'translate(20px, -50%)',
                                    pointerEvents: 'none',
                                    zIndex: 99999,
                                }}
                            >
                                <motion.div 
                                    className="avatar-message-pop font-outfit"
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                                >
                                    {tooltipMsg}
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </AnimatePresence>
    );
}
