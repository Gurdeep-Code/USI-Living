import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Plane, Phone, MessageCircle } from "lucide-react";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background bg-dot-pattern flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="max-w-xl w-full bg-card rounded-3xl shadow-bubble border border-border/50 p-8 sm:p-12 text-center"
      >
        <div className="mx-auto h-20 w-20 rounded-full bg-gradient-header flex items-center justify-center text-primary-foreground shadow-glow mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3" style={{ fontFamily: "'Montserrat', Inter, sans-serif" }}>
          Thank You! ✈️
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-8">
          Your details have been received. A counsellor from <span className="font-semibold text-secondary">Tritya Aviation Academy</span> will reach out to you shortly with course information, fees, and scholarship details.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+919999999999"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-bubble"
          >
            <Phone className="h-4 w-4" /> Call Us
          </a>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 transition shadow-bubble"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition shadow-glow"
          >
            <Plane className="h-4 w-4" /> Start Over
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;