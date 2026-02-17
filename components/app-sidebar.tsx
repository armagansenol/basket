"use client"

import {
  Mic,
  Home,
  Package,
  MousePointerClick,
  BarChart3,
  Shield,
  ListChecks,
  Zap,
  Music,
  Sparkles,
  Flag,
  Target,
  Type,
  Flower2,
  Box,
  FileText,
  Circle,
  Palette,
  Grid3x3,
  Play,
  Network,
  Image,
  Star,
  ListTodo,
  Bike,
  ChevronRight,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

type SidebarItem = {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}

const homeItem: SidebarItem = {
  title: "Home",
  url: "/",
  icon: Home,
}

const sections: { title: string; items: SidebarItem[] }[] = [
  {
    title: "UI Components",
    items: [
      { title: "Voice Recorder", url: "/voice-recorder", icon: Mic },
      { title: "Animated CTA Button", url: "/animated-cta-button", icon: MousePointerClick },
      { title: "Analytics Card", url: "/analytics-card", icon: BarChart3 },
      { title: "Prevent Bento Item", url: "/prevent-bento-item", icon: Shield },
      { title: "Personality Test", url: "/personality-test", icon: ListChecks },
      { title: "My Tasks", url: "/my-tasks", icon: ListTodo },
      { title: "Bike Status Card", url: "/bike-status-card", icon: Bike },
    ],
  },
  {
    title: "Posters & Visuals",
    items: [
      { title: "Bloodborne Sprites", url: "/bloodborne-sprite-showcase", icon: Star },
      { title: "Race Track", url: "/race-track", icon: Zap },
      { title: "Race Poster", url: "/race-poster", icon: Flag },
      { title: "W-I-START Poster", url: "/poster-wistart", icon: Target },
      { title: "Audio Visualizer", url: "/audio-visualizer", icon: Music },
    ],
  },
  {
    title: "Generative & Shader",
    items: [
      { title: "Radial Burst", url: "/radial-burst", icon: Sparkles },
      { title: "ASCII Blobs", url: "/ascii-blobs", icon: Type },
      { title: "Bunny Ear Cactus", url: "/bunny-ear-cactus", icon: Flower2 },
      { title: "Ripple Cube", url: "/ripple-cube", icon: Box },
      { title: "Ripple Noise Transition", url: "/ripple-noise-transition", icon: Image },
      { title: "Hero Electron Orbit", url: "/hero-electron", icon: Circle },
      { title: "Typewriter Poem", url: "/typewriter-poem", icon: FileText },
      { title: "Metaball Blobs", url: "/metaball-blobs", icon: Circle },
      { title: "Palette Generator", url: "/palette-generator", icon: Palette },
      { title: "Geometric Grid", url: "/geometric-grid", icon: Grid3x3 },
      { title: "Motion Grid", url: "/motion-grid", icon: Play },
      { title: "Point Network", url: "/point-network", icon: Network },
      { title: "Shape Display", url: "/shape-display", icon: Image },
      { title: "Particle Formations", url: "/particle-formations", icon: Star },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Component Basket
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={homeItem.url}>
                    <homeItem.icon />
                    <span>{homeItem.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {sections.map((section) => (
                <SidebarMenuItem key={section.title}>
                  <details className="group/details" open>
                    <summary className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex cursor-pointer list-none items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold tracking-wide text-sidebar-foreground/80">
                      <span>{section.title}</span>
                      <ChevronRight className="size-3.5 transition-transform duration-200 group-open/details:rotate-90" />
                    </summary>
                    <SidebarMenuSub>
                      {section.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </details>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
