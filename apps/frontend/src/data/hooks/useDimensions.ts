import { useState, useEffect } from 'react'

function getWindowSize() {
    if (typeof window !== "undefined") {
        const { innerWidth: width, innerHeight: height } = window
        return {
            width,
            height
        }
    } else {
        return {
            width: -1,
            height: -1,
        }
    }
}

export default function useDimensions() {
    const [windowSize, setwindowSize] = useState(getWindowSize())

    useEffect(() => {
        function sizeChanged() {
            setwindowSize(getWindowSize())
        }

        window.addEventListener('resize', sizeChanged)
        return () => window.removeEventListener('resize', sizeChanged)
    }, [])

    function between(min: number, max: number) {
        return windowSize.width >= min && windowSize.width < max
    }

    const dimensions = {
        ...windowSize,
        xs: between(0, 640),
        sm: between(640, 768),
        md: between(768, 1024),
        lg: between(1024, 1280),
        xl: between(1280, 1536),
        xl2: between(1536, Number.MAX_VALUE),
    }

    return {
        ...dimensions,
        smOrLess: dimensions.xs || dimensions.sm,
        mdOrLess: dimensions.xs || dimensions.sm || dimensions.md,
        lgOrLess: dimensions.xs || dimensions.sm || dimensions.md || dimensions.lg,
        xlOrLess: dimensions.xs || dimensions.sm || dimensions.md || dimensions.lg || dimensions.xl,
        smOrGreater: dimensions.sm || dimensions.md || dimensions.lg || dimensions.xl || dimensions.xl2,
        mdOrGreater: dimensions.md || dimensions.lg || dimensions.xl || dimensions.xl2,
        lgOrGreater: dimensions.lg || dimensions.xl || dimensions.xl2,
        xlOrGreater: dimensions.xl || dimensions.xl2,
    }
}