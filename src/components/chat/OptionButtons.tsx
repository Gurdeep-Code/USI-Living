import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptionButtonsProps {
  options: string[];
  onSelect: (value: string) => void;
  highlightLast?: boolean;
}

export const OptionButtons = ({ options, onSelect, highlightLast }: OptionButtonsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.15 }}
    className="flex flex-wrap gap-1.5 sm:gap-2 pl-9 sm:pl-11"
  >
    {options.map((opt, i) => {
      const isAccent = highlightLast && i === options.length - 1;
      return (
        <motion.button
          key={opt}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(opt)}
          className={cn(
            "px-3 py-2 sm:px-4 sm:py-2.5 rounded-sm sm:rounded-md text-xs sm:text-sm font-semibold transition-colors shadow-bubble",
            isAccent
              ? "bg-primary text-accent-foreground hover:bg-primary/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {opt}
        </motion.button>
      );
    })}
  </motion.div>
);