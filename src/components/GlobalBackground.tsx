import React, { Suspense, lazy } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import mobileBg from '@/assets/mobile-bg.png';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function GlobalBackground() {
    const isMobile = useIsMobile();

    return (
        <div className="fixed inset-0 z-[-1] w-full h-full pointer-events-none overflow-hidden bg-black">
            {/* Desktop: Fallback & Layered Background */}
            {!isMobile && (
                <div
                    className="absolute inset-0 opacity-40 transition-opacity duration-1000"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.4) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, rgba(37, 99, 235, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 1) 0%, transparent 100%)
                        `
                    }}
                />
            )}

            {/* Mobile: PNG Background */}
            {isMobile && (
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
                    style={{
                        backgroundImage: `url(${mobileBg})`,
                        opacity: 0.6
                    }}
                />
            )}

            {/* Desktop: Spline 3D Scene */}
            {!isMobile && (
                <Suspense fallback={null}>
                    <div className="absolute inset-0 w-full h-full opacity-60">
                        <Spline
                            scene="https://prod.spline.design/kc-ue-UW4L6njbbS/scene.splinecode"
                        />
                    </div>
                </Suspense>
            )}

            {/* Subtle grain effect */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
