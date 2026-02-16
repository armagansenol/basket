"use client"

import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

interface LayeredIconProps {
  Icon: LucideIcon
  color?: "violet" | "lime" | "amber" | "blue" | "rose" | "orange" | "emerald" | "slate"
  className?: string
}

const colorVariants = {
  violet: {
    outer: "bg-linear-to-b from-violet-100 via-violet-400 to-violet-100",
    inner: "bg-linear-to-b from-violet-100 via-violet-100 to-violet-100",
    middle: "bg-linear-to-t from-violet-200 to-violet-200",
    center: "bg-linear-to-b from-violet-300 to-violet-200",
    icon: "text-violet-800",
  },
  lime: {
    outer: "bg-linear-to-b from-lime-100 via-lime-400 to-lime-100",
    inner: "bg-linear-to-b from-lime-100 via-lime-100 to-lime-100",
    middle: "bg-linear-to-t from-lime-200 to-lime-200",
    center: "bg-linear-to-b from-lime-300 to-lime-200",
    icon: "text-lime-800",
  },
  amber: {
    outer: "bg-linear-to-b from-amber-100 via-amber-400 to-amber-100",
    inner: "bg-linear-to-b from-amber-100 via-amber-100 to-amber-100",
    middle: "bg-linear-to-t from-amber-200 to-amber-200",
    center: "bg-linear-to-b from-amber-300 to-amber-200",
    icon: "text-amber-800",
  },
  blue: {
    outer: "bg-linear-to-b from-blue-100 via-blue-400 to-blue-100",
    inner: "bg-linear-to-b from-blue-100 via-blue-100 to-blue-100",
    middle: "bg-linear-to-t from-blue-200 to-blue-200",
    center: "bg-linear-to-b from-blue-300 to-blue-200",
    icon: "text-blue-800",
  },
  rose: {
    outer: "bg-linear-to-b from-rose-100 via-rose-400 to-rose-100",
    inner: "bg-linear-to-b from-rose-100 via-rose-100 to-rose-100",
    middle: "bg-linear-to-t from-rose-200 to-rose-200",
    center: "bg-linear-to-b from-rose-300 to-rose-200",
    icon: "text-rose-800",
  },
  orange: {
    outer: "bg-linear-to-b from-orange-100 via-orange-400 to-orange-100",
    inner: "bg-linear-to-b from-orange-100 via-orange-100 to-orange-100",
    middle: "bg-linear-to-t from-orange-200 to-orange-200",
    center: "bg-linear-to-b from-orange-300 to-orange-200",
    icon: "text-orange-800",
  },
  emerald: {
    outer: "bg-linear-to-b from-emerald-100 via-emerald-400 to-emerald-100",
    inner: "bg-linear-to-b from-emerald-100 via-emerald-100 to-emerald-100",
    middle: "bg-linear-to-t from-emerald-200 to-emerald-200",
    center: "bg-linear-to-b from-emerald-300 to-emerald-200",
    icon: "text-emerald-800",
  },
  slate: {
    outer: "bg-linear-to-b from-slate-100 via-slate-400 to-slate-100",
    inner: "bg-linear-to-b from-slate-100 via-slate-100 to-slate-100",
    middle: "bg-linear-to-t from-slate-200 to-slate-200",
    center: "bg-linear-to-b from-slate-300 to-slate-200",
    icon: "text-slate-800",
  },
} as const

export function LayeredIcon({ Icon, color = "violet", className }: LayeredIconProps) {
  const variants = colorVariants[color]

  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className={cn("flex size-20 p-0.5 items-center justify-center rounded-full", variants.outer, className)}
    >
      <motion.div
        variants={{
          initial: { scale: 1 },
          hover: { scale: 0.96, transition: { duration: 0.2, ease: "easeOut" } },
        }}
        className={cn("flex size-full items-center justify-center rounded-full p-0.5", variants.inner)}
      >
        <motion.div
          variants={{
            initial: { scale: 1, rotate: 0 },
            hover: { scale: 1.05, rotate: 2, transition: { duration: 0.3, ease: "backOut" } },
          }}
          className={cn("flex size-full items-center justify-center rounded-full shadow-inner", variants.middle)}
        >
          <motion.div
            variants={{
              initial: { scale: 1, y: 0 },
              hover: { scale: 1.1, y: -1, transition: { duration: 0.3, ease: "backOut" } },
            }}
            className={cn("rounded-full size-[60%] flex items-center justify-center shadow-md", variants.center)}
          >
            <motion.div
              variants={{
                initial: { scale: 1, rotate: 0 },
                hover: { scale: 1.1, rotate: -4, transition: { duration: 0.3, ease: "backOut" } },
              }}
              className="flex items-center justify-center size-full"
            >
              <Icon className={cn("size-[60%] stroke-[2.2]", variants.icon)} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
