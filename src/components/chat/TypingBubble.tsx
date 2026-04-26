import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Plane } from "lucide-react";

export const TypingBubble = forwardRef<HTMLDivElement>((_, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex items-end gap-2"
  >
    <div className="h-7 w-7 sm:h-9 sm:w-9 shrink-0 rounded-full bg-gradient-header flex items-center justify-center text-primary-foreground shadow-bubble">
      <Plane className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    </div>
    <div className="bg-card rounded-2xl rounded-bl-sm px-3 py-2 sm:px-4 sm:py-3 shadow-bubble flex items-center gap-1.5">
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  </motion.div>
));
TypingBubble.displayName = "TypingBubble";