import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle, AlertCircle, Receipt } from "lucide-react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    console.log("E : ", email, message);

    if (!message || !message.trim()) {
      setStatus("error");
      setErrorMessage("Please enter a message");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      // use relative API path (works on Vercel)
      const response = await fetch(
        `/api/send-comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email || "", comment: message }),
        }
      );

      console.log("Response status:", response.status);

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");

      // safely parse response body
      let payload = null;
      if (isJson) {
        // parse JSON but guard against empty body
        try {
          payload = await response.json();
        } catch (err) {
          console.warn("Failed to parse JSON response:", err);
          payload = null;
        }
      } else {
        // try text fallback
        const text = await response.text();
        if (text) {
          try {
            payload = JSON.parse(text);
          } catch {
            payload = { message: text };
          }
        }
      }

      if (!response.ok) {
        // pick a readable message from payload or fallback to status text
        const serverMsg =
          payload?.message ||
          payload?.error ||
          payload?.details ||
          response.statusText ||
          `HTTP ${response.status}`;
        console.error("Server returned error:", serverMsg);
        setStatus("error");
        setErrorMessage(String(serverMsg));
        return;
      }

      // success
      console.log("Submit success payload:", payload);
      setStatus("success");
      setEmail("");
      setMessage("");
      setErrorMessage(""); // clear any previous error
    } catch (err) {
      console.error("Error submitting form:", err);
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Any Message for Me?
          </h2>
          <p className="text-base sm:text-lg text-[#4a4a4a]">
            Feel free to drop me a message. I'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#FFFEF9] rounded-2xl p-6 sm:p-8 border-2 border-[rgba(99,102,241,0.1)] shadow-lg"
        >
          <form className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#1a1a1a] mb-2"
              >
                Your Email{" "}
                <span className="text-[#4a4a4a] font-normal text-xs">
                  (One copy will be sent to you - optional)
                </span>
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a4a4a]"
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-[rgba(99,102,241,0.15)] bg-white text-[#1a1a1a] placeholder-[#9ca3af] focus:border-nav-color focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-[#1a1a1a] mb-2"
              >
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Feel free to write anything..."
                rows="6"
                className="w-full px-4 py-3 rounded-lg border-2 border-[rgba(99,102,241,0.15)] bg-white text-[#1a1a1a] placeholder-[#9ca3af] focus:border-nav-color focus:outline-none transition-colors resize-none"
                required
              />
            </div>

            {/* Status Messages */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              >
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
              >
                <CheckCircle size={18} />
                <span>
                  Message sent successfully! Thank you for reaching out.
                </span>
              </motion.div>
            )}

            {/* Submit Button */}
            <div
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="w-full hover:cursor-pointer py-3 px-6 bg-gradient-to-r from-nav-color to-accent-1 text-white rounded-lg font-semibold text-base hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
