export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 z-[-1] w-full h-full pointer-events-none overflow-hidden bg-black">
            {/* Main glow */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.4) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(37, 99, 235, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 1) 0%, transparent 100%)
                    `
                }}
            />
            {/* Subtle grain effect */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
