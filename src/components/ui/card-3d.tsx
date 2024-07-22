import { cn } from '@/lib/utils'
import React, {
    createContext,
    useState,
    useContext,
    useRef,
    useEffect,
} from 'react'

const MouseEnterContext = createContext<
    [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined)

export const Card3d = ({
    children,
    className,
    containerClassName,
    perspective,
}: {
    children?: React.ReactNode
    className?: string
    containerClassName?: string
    perspective?: number
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isMouseEntered, setIsMouseEntered] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const { left, top, width, height } =
            containerRef.current.getBoundingClientRect()
        const x = (e.clientX - left - width / 2) / 25
        const y = (e.clientY - top - height / 2) / 25
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
    }

    const handleMouseEnter = () => {
        setIsMouseEntered(true)
        if (!containerRef.current) return
    }

    const handleMouseLeave = () => {
        if (!containerRef.current) return
        setIsMouseEntered(false)
        containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
    }
    return (
        <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
            <div
                className={cn(containerClassName)}
                style={{
                    perspective: perspective || 450,
                }}
            >
                <div
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                        'rounded-3xl border bg-card text-card-foreground shadow-sm',
                        className
                    )}
                    style={{
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {children}
                </div>
            </div>
        </MouseEnterContext.Provider>
    )
}

export const Card3dContent = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div
            className={cn(
                'p-6 pt-0 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]',
                className
            )}
        >
            {children}
        </div>
    )
}
export const Card3dHeader = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div
            className={cn(
                'flex flex-col space-y-1.5 p-6 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]',
                className
            )}
        >
            {children}
        </div>
    )
}

export const Card3dItem = ({
    as: Tag = 'div',
    children,
    className,
    translateX = 0,
    translateY = 0,
    translateZ = 0,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    ...rest
}: {
    as?: React.ElementType
    children: React.ReactNode
    className?: string
    translateX?: number | string
    translateY?: number | string
    translateZ?: number | string
    rotateX?: number | string
    rotateY?: number | string
    rotateZ?: number | string
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [isMouseEntered] = useMouseEnter()

    const handleAnimations = () => {
        if (!ref.current) return
        if (isMouseEntered) {
            ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
        } else {
            ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`
        }
    }

    useEffect(() => {
        handleAnimations()
    }, [isMouseEntered])

    return (
        <Tag
            ref={ref}
            className={cn('transition duration-200 ease-linear', className)}
            {...rest}
        >
            {children}
        </Tag>
    )
}

// Create a hook to use the context
export const useMouseEnter = () => {
    const context = useContext(MouseEnterContext)
    if (context === undefined) {
        throw new Error(
            'useMouseEnter must be used within a MouseEnterProvider'
        )
    }
    return context
}
