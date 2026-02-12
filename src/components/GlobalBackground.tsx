import { useState, useEffect, Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function GlobalBackground() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLoad = (splineApp: any) => {
        // Set animation speed to 0.3x
        if (splineApp.setVariable) {
            // If the scene has a speed variable, we can try to set it
            // However, a more universal way in Spline runtime is often internal
        }

        // Try to cap the frame rate or slow down the internal clock if possible
        // Note: Spline's runtime API is sometimes limited, but we can try common patterns
        try {
            // Set global time scale to 0.3
            if (splineApp.setLoopSpeed) {
                splineApp.setLoopSpeed(0.3);
            }
        } catch (e) {
            console.warn("Could not set Spline speed:", e);
        }
    };

    return (
        <div className="fixed inset-0 z-[-1] w-full h-full pointer-events-none overflow-hidden">
            <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
                <Spline
                    scene="https://prod.spline.design/kc-ue-UW4L6njbbS/scene.splinecode"
                    onLoad={handleLoad}
                />
            </Suspense>
        </div>
    );
}
