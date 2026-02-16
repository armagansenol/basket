"use client"

import { Check, CirclePlay, Plus } from "lucide-react"
import { LayeredIcon } from "./layered-icon"

type TaskItem = {
  label: string
  tone: "neutral" | "purple" | "green" | "amber"
  done?: boolean
}

const tasks: TaskItem[] = [
  { label: "Create Task", tone: "neutral" },
  { label: "Write Q1 product roadmap", tone: "purple", done: true },
  { label: "Call supplier about packaging", tone: "green" },
  { label: "Prepare design mockups", tone: "amber" },
]

const toneClasses = {
  neutral: {
    ring: "border-neutral-300 bg-neutral-50",
    inner: "bg-neutral-100 text-neutral-500",
    glow: "",
    text: "text-neutral-400",
  },
  purple: {
    ring: "border-violet-200 bg-violet-50",
    inner: "bg-violet-100 text-violet-600",
    glow: "shadow-[0_0_18px_rgba(139,92,246,0.35)]",
    text: "text-violet-600",
  },
  green: {
    ring: "border-lime-200 bg-lime-50",
    inner: "bg-lime-100 text-lime-700",
    glow: "shadow-[0_0_18px_rgba(132,204,22,0.3)]",
    text: "text-neutral-800",
  },
  amber: {
    ring: "border-amber-200 bg-amber-50",
    inner: "bg-amber-100 text-amber-700",
    glow: "shadow-[0_0_18px_rgba(251,191,36,0.3)]",
    text: "text-neutral-800",
  },
} as const

function TaskIcon({ tone }: { tone: TaskItem["tone"] }) {
  if (tone === "neutral") {
    return <LayeredIcon Icon={Plus} color='slate' />
  }

  if (tone === "amber") {
    return <LayeredIcon Icon={CirclePlay} color='amber' />
  }

  if (tone === "green") {
    return <LayeredIcon Icon={Check} color='lime' />
  }

  return <LayeredIcon Icon={Check} color='violet' />
}

export default function MyTasksCard() {
  return (
    <div className='w-full max-w-[920px] rounded-[44px] border border-neutral-200 bg-white p-8 shadow-[0_18px_50px_rgba(0,0,0,0.08)] md:p-14'>
      <h2 className='text-5xl font-semibold tracking-tight text-neutral-900'>My Tasks</h2>

      <div className='mt-10 flex items-end gap-8 border-b border-neutral-200 pb-4 text-3xl font-medium md:text-[56px] md:leading-none'>
        <button className='relative text-neutral-900'>
          Upcoming
          <span className='absolute -bottom-[21px] left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-neutral-900' />
        </button>
        <button className='text-neutral-400'>Overdue</button>
        <button className='text-neutral-400'>Completed</button>
      </div>

      <div className='mt-5'>
        {tasks.map((task, index) => {
          const styles = toneClasses[task.tone]

          return (
            <div
              key={task.label}
              className={`flex items-center gap-6 py-7 md:gap-8 md:py-8 ${
                index !== 0 ? "border-t border-dashed border-neutral-200" : ""
              }`}
            >
              <TaskIcon tone={task.tone} />
              <p
                className={`text-2xl font-medium md:text-[52px] md:leading-none ${styles.text} ${
                  task.done ? "line-through decoration-2" : ""
                }`}
              >
                {task.label}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
