import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { House, Phone } from "lucide-react";
import logoSmall from "@/assets/logo_full.svg";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background bg-dot-pattern flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="max-w-xl w-full bg-card rounded-3xl shadow-bubble border border-border/50 p-8 sm:p-12 text-center"
      >
        <div className="mx-auto h-20 w-20 rounded-full flex items-center justify-center text-primary-foreground shadow-glow mb-6">
         <img src={logoSmall} alt="USI Living" className="w-12" />
        </div>

        <h1
          className="text-3xl sm:text-4xl font-extrabold text-primary mb-3"
          style={{ fontFamily: "'Montserrat', Inter, sans-serif" }}
        >
          Thank You!
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-3">
          Your details have been received. A Representative
          will reach out to you shortly.
        </p>
         <p className="text-muted-foreground text-base sm:text-md mb-6 font-semibold">
         In case of urgency, kindly call on below numbers.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+919999202250"
            className="text-xs inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-bubble"
          >
            <Phone className="h-3 w-3" /> 9999202250
          </a>
          <a
            href="tel:+919999963162"
            className="text-xs inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-bubble"
          >
            <Phone className="h-3 w-3" /> 9999963162
          </a>
        </div>
        <Link
            replace={true}
            to="https://usiliving.com/"
            className="text-xs w-[30%] mt-4 inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-accent-foreground font-semibold hover:bg-primary/90 transition shadow-glow bg-primary"
          >
            <House className="w-3.5" />
            View Website
          </Link>
      </motion.div>
    </div>
  );
};

export default ThankYou;