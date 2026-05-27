import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useCustomer } from "@/context/CustomerContext";
import Lottie from "lottie-react";
import fishAnimation from "@assets/fish_1776404909449.json";
import otpAnimation from "@assets/animation-original_1776421716629.json";
import successAnimation from "@assets/animation-original_(10)_1777277220026.json";
import flagImg from "@assets/flag_(1)_1776403319572.png";
import { FishTokriLogo } from "@/components/storefront/FishTokriLogo";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import userImg from "@assets/user_(1)_1774707188827.png";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";

const BRAND_BLUE = "#364F9F";
const BRAND_RED = "#F05B4E";
const BRAND_ORANGE = "#F97316";

interface OtpModalProps {
  open: boolean;
  onClose: () => void;
}

function SolidButton({
  color,
  onClick,
  disabled,
  loading,
  loadingText,
  children,
  testId,
}: {
  color: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  testId?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setHovered(true)}
      onMouseUp={() => setHovered(false)}
      className="w-full py-4 rounded-full font-bold text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] border-2"
      style={{
        background: hovered ? "white" : color,
        color: hovered ? color : "white",
        borderColor: color,
      }}
      data-testid={testId}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          {loadingText}
        </span>
      ) : children}
    </button>
  );
}

export function OtpModal({ open, onClose }: OtpModalProps) {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [focusedOtpIndex, setFocusedOtpIndex] = useState<number | null>(null);
  const [showWhatsAppNotif, setShowWhatsAppNotif] = useState(false);
  const { toast } = useToast();
  const { refetch } = useCustomer();
  const queryClient = useQueryClient();

  const phoneRef = useRef<HTMLInputElement>(null);
  const o0 = useRef<HTMLInputElement>(null);
  const o1 = useRef<HTMLInputElement>(null);
  const o2 = useRef<HTMLInputElement>(null);
  const o3 = useRef<HTMLInputElement>(null);
  const otpRefs = [o0, o1, o2, o3];

  useEffect(() => {
    if (open) {
      setPhone("");
      setOtpSent(false);
      setShowSuccess(false);
      setOtp(["", "", "", ""]);
      setTimeout(() => phoneRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    if (otpSent) {
      setTimeout(() => otpRefs[0].current?.focus(), 350);
    }
  }, [otpSent]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
  };

  const handlePhoneSubmit = async () => {
    if (phone.length !== 10) {
      toast({ title: "Enter a valid 10-digit phone number", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/customer/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to send OTP");
      }
      setOtpSent(true);
      setShowWhatsAppNotif(true);
      setTimeout(() => setShowWhatsAppNotif(false), 3500);
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (text.length === 4) {
      e.preventDefault();
      setOtp(text.split(""));
      otpRefs[3].current?.focus();
    }
  };

  const handleOtpSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      toast({ title: "Enter the 4-digit OTP", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/customer/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone, otp: otpValue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP");
      // Directly populate the cache with the returned customer data.
      // Do NOT call refetch() here — a refetch hitting a 401 would
      // overwrite this data and log the user back out immediately.
      queryClient.setQueryData(["/api/customer/me"], data);
      setShowSuccess(true);
      setTimeout(() => onClose(), 2500);
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const isFull = phone.length === 10;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[420px] p-0 overflow-y-auto border-0 shadow-2xl flex flex-col bg-white"
        data-testid="auth-sheet"
        aria-describedby={undefined}
      >
        <VisuallyHidden>
          <SheetTitle>Login to FishTokri</SheetTitle>
        </VisuallyHidden>

        {/* WhatsApp OTP notification pill */}
        <AnimatePresence>
          {showWhatsAppNotif && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="fixed top-4 left-1/2 z-[100] -translate-x-1/2 pointer-events-none"
            >
              <div className="flex items-center gap-2 px-5 py-2 rounded-full shadow-lg" style={{ backgroundColor: "#16a34a" }}>
                <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.743a.5.5 0 0 0 .614.676l6.076-1.583A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.853 0-3.593-.504-5.088-1.383l-.364-.215-3.762.98.999-3.657-.236-.376A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                <span className="text-white text-sm font-semibold whitespace-nowrap">OTP sent on your registered WhatsApp number</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header — matches Order Summary style */}
        <SheetHeader className="px-5 py-4 border-b border-border/30 bg-white sticky top-0 z-10">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
            <img src={userImg} alt="Login" className="w-5 h-5 object-contain" />
            Login
          </SheetTitle>
        </SheetHeader>

        {/* Success Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-start bg-white pt-16 px-6"
            >
              <div className="mt-4 mb-6">
                <FishTokriLogo className="h-16 w-auto" />
              </div>
              <div className="w-72 h-72">
                <Lottie animationData={successAnimation} loop={false} autoplay />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col flex-1 px-7 pt-8 pb-8">
          {/* Logo — always visible */}
          <div className="flex justify-center mb-5">
            <FishTokriLogo className="h-16 w-auto" />
          </div>

          {!otpSent ? (
            <>
              {/* Hero */}
              <div className="flex flex-col items-center mb-7">
                <div className="w-28 h-28">
                  <Lottie animationData={fishAnimation} loop autoplay />
                </div>
                <h2 className="text-[21px] font-bold text-center leading-snug mt-2">
                  <span style={{ color: BRAND_RED }}>Welcome!</span>{" "}
                  <span style={{ color: BRAND_BLUE }}>Fresh Seafood & Meat</span>
                  <br /><span className="text-slate-800">at your doorstep</span>
                </h2>
                <p className="text-sm mt-2 text-center font-medium text-slate-800">
                  Enter your mobile number to continue
                </p>
              </div>

              {/* Phone Input — underline style, no card */}
              <div className="mb-6">
                <div
                  className="flex items-center gap-3 pb-3 border-b-2 transition-all duration-200"
                  style={{ borderColor: focused ? BRAND_RED : isFull ? `${BRAND_BLUE}88` : "#e2e8f0" }}
                >
                  <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-slate-200">
                    <img src={flagImg} alt="India" className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-base font-bold text-slate-700">+91</span>
                  </div>
                  <input
                    ref={phoneRef}
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={handlePhoneChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="0000000000"
                    className="flex-1 bg-transparent outline-none text-2xl font-bold tracking-[0.15em] text-slate-800 placeholder:text-slate-300 placeholder:font-light placeholder:text-xl placeholder:tracking-normal w-full"
                    style={{ caretColor: BRAND_RED }}
                    data-testid="input-phone"
                  />
                </div>
              </div>

              {/* Login button — red */}
              <SolidButton
                color={BRAND_RED}
                onClick={handlePhoneSubmit}
                disabled={loading || !isFull}
                loading={loading}
                loadingText="Sending OTP..."
                testId="button-send-otp"
              >
                Login
              </SolidButton>

              <p className="text-[11px] text-center mt-3 text-slate-400">
                By continuing, you agree to our{" "}
                <span className="underline cursor-pointer" style={{ color: BRAND_BLUE }}>Terms</span>
                {" & "}
                <span className="underline cursor-pointer" style={{ color: BRAND_BLUE }}>Privacy Policy</span>
              </p>
            </>
          ) : (
            <>
              {/* OTP Section */}
              <div className="flex flex-col items-center mb-4">
                <div className="w-28 h-28">
                  <Lottie animationData={otpAnimation} loop autoplay />
                </div>
                <h3 className="text-lg font-bold text-center text-slate-800">Verify it's you!</h3>
                <p className="text-sm text-slate-500 mt-1 text-center">Code sent on WhatsApp</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-sm font-semibold text-slate-700">+91 {phone}</p>
                  <button
                    className="text-xs font-bold underline"
                    style={{ color: BRAND_RED }}
                    onClick={() => { setOtpSent(false); setOtp(["", "", "", ""]); }}
                    data-testid="button-back-to-phone"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* OTP Boxes — white inside, blue border, orange on focus */}
              <div className="flex gap-3 justify-center mb-5">
                {otpRefs.map((ref, i) => {
                  const isFocused = focusedOtpIndex === i;
                  return (
                    <input
                      key={i}
                      ref={ref}
                      type="tel"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[i]}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      onPaste={handleOtpPaste}
                      onFocus={() => setFocusedOtpIndex(i)}
                      onBlur={() => setFocusedOtpIndex(null)}
                      className="w-[62px] h-[62px] text-center text-2xl font-bold rounded-2xl outline-none border-2 focus:scale-[1.05] transition-all duration-200"
                      style={{
                        borderColor: isFocused ? BRAND_ORANGE : BRAND_BLUE,
                        background: "white",
                        color: "#1e293b",
                        caretColor: BRAND_ORANGE,
                        boxShadow: isFocused ? `0 0 0 3px ${BRAND_ORANGE}33` : "none",
                      }}
                      data-testid={`input-otp-digit-${i}`}
                    />
                  );
                })}
              </div>

              {/* Verify button — blue */}
              <SolidButton
                color={BRAND_BLUE}
                onClick={handleOtpSubmit}
                disabled={loading || otp.join("").length !== 4}
                loading={loading}
                loadingText="Verifying..."
                testId="button-verify-otp"
              >
                Verify
              </SolidButton>

              <p className="text-[11px] text-center mt-4 text-slate-400">
                Didn't get it?{" "}
                <span
                  className="font-semibold cursor-pointer"
                  style={{ color: BRAND_RED }}
                  onClick={handlePhoneSubmit}
                >
                  Resend OTP
                </span>
              </p>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
