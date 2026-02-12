"use client"

import { Mic, Home, Package, MousePointerClick, BarChart3, Shield, ListChecks, Zap, Music, Sparkles, Flag, Target, Type, Flower2, Box, FileText, Circle, Palette, Grid3x3, Play, Network, Image, Star } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Voice Recorder",
    url: "/voice-recorder",
    icon: Mic,
  },
  {
    title: "Animated CTA Button",
    url: "/animated-cta-button",
    icon: MousePointerClick,
  },
  {
    title: "Analytics Card",
    url: "/analytics-card",
    icon: BarChart3,
  },
  {
    title: "Prevent Bento Item",
    url: "/prevent-bento-item",
    icon: Shield,
  },
  {
    title: "Personality Test",
    url: "/personality-test",
    icon: ListChecks,
  },
  {
    title: "Race Track",
    url: "/race-track",
    icon: Zap,
  },
  {
    title: "Audio Visualizer",
    url: "/audio-visualizer",
    icon: Music,
  },
  {
    title: "Radial Burst",
    url: "/radial-burst",
    icon: Sparkles,
  },
  {
    title: "Race Poster",
    url: "/race-poster",
    icon: Flag,
  },
  {
    title: "W-I-START Poster",
    url: "/poster-wistart",
    icon: Target,
  },
  {
    title: "ASCII Blobs",
    url: "/ascii-blobs",
    icon: Type,
  },
  {
    title: "Bunny Ear Cactus",
    url: "/bunny-ear-cactus",
    icon: Flower2,
  },
  {
    title: "Ripple Cube",
    url: "/ripple-cube",
    icon: Box,
  },
  {
    title: "Typewriter Poem",
    url: "/typewriter-poem",
    icon: FileText,
  },
  {
    title: "Metaball Blobs",
    url: "/metaball-blobs",
    icon: Circle,
  },
  {
    title: "Palette Generator",
    url: "/palette-generator",
    icon: Palette,
  },
  {
    title: "Geometric Grid",
    url: "/geometric-grid",
    icon: Grid3x3,
  },
  {
    title: "Motion Grid",
    url: "/motion-grid",
    icon: Play,
  },
  {
    title: "Point Network",
    url: "/point-network",
    icon: Network,
  },
  {
    title: "Shape Display",
    url: "/shape-display",
    icon: Image,
  },
  {
    title: "Particle Formations",
    url: "/particle-formations",
    icon: Star,
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
