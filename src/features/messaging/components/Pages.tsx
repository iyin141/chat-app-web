import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/features/messaging/store/uiStore";
import { useThemeStore } from "@/lib/utils/theme";

type Props = {
  children: React.ReactNode[];
  length: number;
  page_length: number;
};

const Pages = ({ children, length, page_length }: Props) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const min = useAuthStore((s: any) => s.min);
  const max = useAuthStore((s: any) => s.max);
  const setMax = useAuthStore((s: any) => s.setmax);
  const setMin = useAuthStore((s: any) => s.setmin);
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const { isDark } = useThemeStore();

  useEffect(() => {
    setMin(0);
    setMax(page_length);
  }, [page_length]);

  function next() {
    if (max < length) {
      setMin((prevMin: number) => prevMin + page_length);
      setMax((prevMax: number) => prevMax + page_length);
    }
  }

  function prev() {
    if (min > 0) {
      setMin((prevMin: number) => prevMin - page_length);
      setMax((prevMax: number) => prevMax - page_length);
    }
  }

  return (
    <div
      className={`transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {children}

      <div className="flex flex-col items-center gap-5 mt-8">
        <p
          className={`font-semibold text-base ${
            isDark ? "text-white" : "text-black"
          } select-none`}
        >
          Showing {min + 1} – {Math.min(max, length)} of {length}
        </p>

        <div className="flex gap-5">
          {/* Previous Button */}
          <button
            onClick={prev}
            disabled={min === 0}
            className={`flex items-center gap-2 rounded-full px-6 py-2 border-2 text-base font-semibold transition-all duration-300
              ${
                isDark
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-black text-black hover:bg-black hover:text-white"
              }
              disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current
            `}
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          {/* Next Button */}
          <button
            onClick={next}
            disabled={max >= length}
            className={`flex items-center gap-2 rounded-full px-6 py-2 border-2 text-base font-semibold transition-all duration-300
              ${
                isDark
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-black text-black hover:bg-black hover:text-white"
              }
              disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current
            `}
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pages;
