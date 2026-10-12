import Link from "next/link";
import { FlowMeta, Icon } from "@/components/sketchbot/primitives";
import { FLOW_IDS, ROUTES } from "@/lib/routes";

type Corner = "tl" | "tr" | "bl" | "br";

const CORNER: Record<Corner, { pos: string; path: string }> = {
  tl: { pos: "-top-1 -left-1", path: "M 0,9 L 0,0 L 9,0" },
  tr: { pos: "-top-1 -right-1", path: "M 0,0 L 9,0 L 9,9" },
  bl: { pos: "-bottom-1 -left-1", path: "M 0,1 L 0,10 L 9,10" },
  br: { pos: "-bottom-1 -right-1", path: "M 10,1 L 10,10 L 1,10" },
};

function Bracket({ at }: { at: Corner }) {
  const c = CORNER[at];
  return (
    <span className={`absolute ${c.pos} w-2.5 h-2.5 pointer-events-none stroke-primary-container`}>
      <svg className="w-full h-full fill-none stroke-current stroke-2" viewBox="0 0 10 10">
        <path d={c.path} />
      </svg>
    </span>
  );
}

interface PreviewCardProps {
  testId: string;
  position: string;
  corners: [Corner, Corner];
  initials: string;
  avatarClass: string;
  name: string;
  time: string;
  message: string;
  withChatIcon?: boolean;
  online?: boolean;
}

/** Floating chat preview card on the hero stage. */
export function PreviewCard({ testId, position, corners, initials, avatarClass, name, time, message, withChatIcon, online }: PreviewCardProps) {
  return (
    <div
      className={`absolute ${position} z-20 hidden md:flex items-center gap-space-sm bg-surface-container/80 backdrop-blur-xl p-space-md rounded shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-xs group cursor-pointer`}
      data-testid={testId}
    >
      <Bracket at={corners[0]} />
      <Bracket at={corners[1]} />
      <div className={`relative w-10 h-10 rounded-full flex items-center justify-center font-label-md text-label-md font-bold shadow-inner ${avatarClass}`}>
        {initials}
        {online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary-container rounded-full shadow-[0_0_8px_#6FD3FF]" />}
      </div>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate">{name}</span>
          <span className="font-annotation text-annotation text-on-surface-variant text-[10px]">{time}</span>
        </div>
        {withChatIcon ? (
          <div className="flex items-center gap-1 text-on-surface-variant">
            <Icon name="chat" className="text-[14px] text-primary" />
            <p className="font-body-sm text-body-sm truncate">{message}</p>
          </div>
        ) : (
          <p className="font-body-sm text-body-sm text-on-surface-variant truncate">{message}</p>
        )}
      </div>
    </div>
  );
}

function MobileChip({ initials, avatarClass, text }: { initials: string; avatarClass: string; text: string }) {
  return (
    <div className="flex items-center gap-space-sm bg-surface-container/90 p-space-sm rounded shadow-md">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-sm text-primary font-bold ${avatarClass}`}>{initials}</div>
      <div className="flex flex-col min-w-0">
        <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">{text}</span>
      </div>
    </div>
  );
}



export function LandingPage() {
  return (
    <div className="sb-root bg-background font-body-md text-on-surface blueprint-grid min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <FlowMeta flowId={FLOW_IDS.landing} route={ROUTES.landing} device="responsive" stateDependency={["useAuthStore"]} />



      <main className="w-full pt-16 bg-background min-h-screen" id="overview">
        <div className="flex flex-col w-full relative overflow-hidden bg-gradient-to-br from-[#0B0D10] via-surface to-[#4B5E6C]/30 text-on-surface">
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
            <svg className="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <line stroke="#6FD3FF" strokeDasharray="6,8" strokeWidth="1" x1="0" x2="100%" y1="180" y2="180" />
              <line stroke="#6FD3FF" strokeDasharray="4,12" strokeWidth="0.75" x1="0" x2="100%" y1="560" y2="560" />
              <line stroke="#BDC7D4" strokeDasharray="8,8" strokeWidth="0.5" x1="18%" x2="18%" y1="0" y2="100%" />
              <line stroke="#BDC7D4" strokeDasharray="8,8" strokeWidth="0.5" x1="82%" x2="82%" y1="0" y2="100%" />
              {[
                [144, 180],
                [1080, 180],
                [480, 560],
                [960, 560],
              ].map(([x, y]) => (
                <path key={`${x}-${y}`} d="M -8,0 L 8,0 M 0,-8 L 0,8" stroke="#6FD3FF" strokeWidth="1.2" transform={`translate(${x}, ${y})`} />
              ))}
            </svg>
          </div>

          <section className="relative min-h-[942px] flex flex-col justify-between px-gutter-mobile md:px-margin pt-space-lg pb-space-xl z-10">
            <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm tracking-widest uppercase">
              <div className="flex items-center gap-space-sm bg-surface-container-low/70 backdrop-blur-md px-space-md py-1.5 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-ping" />
                <span>LAT: 47.6062° N // LON: 122.3321° W</span>
                <span className="text-outline">|</span>
                <span className="text-primary">GRID: 24PX_SYNC</span>
              </div>
              <div className="hidden sm:flex items-center gap-space-md bg-surface-container-low/70 backdrop-blur-md px-space-md py-1.5 rounded-full shadow-sm">
                <span>FREQ: 1420.405 MHZ</span>
                <span className="text-primary-container">BUFFER: OK</span>
              </div>
            </div>

            <div className="relative max-w-7xl mx-auto w-full my-auto py-space-xl">
              <PreviewCard
                testId="chat-preview-1"
                position="-top-6 left-0 lg:left-4"
                corners={["tl", "br"]}
                initials="AL"
                avatarClass="bg-surface-container-high text-primary"
                name="Alex Rivera"
                time="2m ago"
                message="Drafting the weekend trip itinerary 📍"
              />
              <PreviewCard
                testId="chat-preview-3"
                position="-top-2 right-0 lg:right-6"
                corners={["tr", "bl"]}
                initials="SR"
                avatarClass="bg-secondary-container text-secondary-fixed"
                name="Sam Roth"
                time="5m ago"
                message="Are we meeting in the design lab?"
                withChatIcon
              />

              <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-full bg-surface-container-high/90 shadow-md mb-space-lg">
                  <Icon name="draw" className="text-[16px] text-primary-fixed" />
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">AUTONOMOUS DRAFTING LAB v2.4</span>
                </div>
                <h1 className="font-headline-xl text-headline-xl md:text-[54px] md:leading-[60px] text-on-surface tracking-tight mb-space-md max-w-2xl font-bold">
                  A friendly robot sketched this app on a dark drafting table.
                </h1>
                <p className="font-body-lg text-body-lg text-secondary max-w-xl mb-space-xl">
                  Quiet, intelligent, hand-drawn logic paired with precision-engineered telemetry. The companion designed for thinkers, builders, and
                  nocturnal engineers.
                </p>
                <div className="relative flex flex-col sm:flex-row items-center justify-center gap-space-md w-full">
                  <div className="absolute -top-12 left-1/2 -translate-x-36 sm:-translate-x-44 hidden sm:flex items-center gap-2 pointer-events-none select-none z-30">
                    <span className="font-annotation text-annotation text-primary-container italic text-[14px] drop-shadow-[0_0_8px_rgba(111,211,255,0.4)]">
                      say hi
                    </span>
                    <svg className="w-14 h-8 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 60 32">
                      <path d="M 2,8 C 22,2 40,16 52,24" strokeDasharray="1 1" strokeLinecap="round" strokeWidth="1.8" />
                      <path d="M 44,25 L 53,25 L 51,17" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                    </svg>
                  </div>
                  <Link
                    href={ROUTES.login}
                    data-testid="auth-submit"
                    className="relative group px-space-xl py-space-md rounded-full bg-on-background text-surface-container-lowest font-headline-md text-[16px] font-semibold flex items-center justify-center gap-2 shadow-2xl hover:shadow-[0_0_24px_rgba(111,211,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>Start chatting</span>
                    <Icon name="arrow_forward" className="text-[20px] transition-transform group-hover:translate-x-1" />
                  </Link>

                </div>
              </div>

              <PreviewCard
                testId="chat-preview-2"
                position="-bottom-10 left-4 lg:left-12"
                corners={["tl", "br"]}
                initials="MK"
                avatarClass="bg-surface-variant text-primary"
                name="Maya Chen"
                time="Just now"
                message="The SignalR bridge is synced smoothly."
                online
              />
              <PreviewCard
                testId="chat-preview-4"
                position="-bottom-8 right-2 lg:right-10"
                corners={["tr", "bl"]}
                initials="EL"
                avatarClass="bg-surface-container-high text-tertiary"
                name="Elena Vance"
                time="12m ago"
                message="Checked in the latest blueprints ✨"
              />
            </div>

            <div className="flex md:hidden flex-col gap-space-sm w-full my-space-md">
              <MobileChip initials="AL" avatarClass="bg-surface-container-high" text="Alex Rivera: Drafting the weekend trip itinerary 📍" />
              <MobileChip initials="MK" avatarClass="bg-surface-variant" text="Maya Chen: The SignalR bridge is synced smoothly." />
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}
