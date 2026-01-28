import { CheckCircle2, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";

function HoldToDelete() {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const springConfig: Transition = {
    type: "spring",
    bounce: 0,
    duration: 0.25,
  };

  const startHold = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsDeleted(true), 1000);
  };

  const stopHold = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="h-screen w-full grid place-content-center">
      <motion.div
        layout
        transition={springConfig}
        style={{ borderRadius: isDeleted ? "28px" : "9999px" }}
        className="bg-[#f6f5f5] text-[#21201c] relative overflow-hidden border border-black/[0.04] shadow-sm"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!isDeleted ? (
            <motion.button
              key="delete-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={springConfig}
              onPointerDown={startHold}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              className="relative group h-12 px-6 flex items-center justify-center font-medium select-none"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Trash className="w-4 h-4" />
                <span>Hold to Delete</span>

                <div
                  aria-hidden="true"
                  className="absolute inset-0 [clip-path:inset(0px_100%_0px__0px)] 
                    group-active:[clip-path:inset(0px_0px_0px__0px)] transition-[clip-path]
                    duration-1000 ease-linear bg-[#ffdbdc] text-[#e5484d] 
                    flex items-center justify-center gap-2"
                >
                  <Trash className="w-4 h-4" />
                  Hold to Delete
                </div>
              </motion.div>
            </motion.button>
          ) : (
            <motion.div
              key="alert-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={springConfig}
              className="p-10 flex flex-col items-center min-w-[340px]"
            >
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>

              <div className="text-center space-y-2 mb-6">
                <h3 className="text-xl font-bold">Success!</h3>
                <p className="text-gray-500 text-sm">
                  Item permanently removed.
                </p>
              </div>

              <button
                onClick={() => setIsDeleted(false)}
                className="px-6 py-2 rounded-full text-sm font-medium"
              >
                Reset Action
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default HoldToDelete;
