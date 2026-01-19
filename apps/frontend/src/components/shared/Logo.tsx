import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  mini?: boolean
  className?: string
}

export function Logo({ mini = false, className }: LogoProps) {
  const size = mini
    ? { width: 70, height: 70, src: '/favicon.png' }
    : { width: 120, height: 80, src: '/Logo.png' }

  return (
    <Link href="/dashboard" className={className}>
      <Image
        src={size.src}
        alt="Logo"
        width={size.width}
        height={size.height}
        priority
      />
    </Link>
  )
}
