/**
 * @file This file defines the tool routes for the toolbox sidebar.
 */
import ActivityIcon from "virtual:icons/lucide/activity";
import CalculatorIcon from "virtual:icons/lucide/calculator";
import HourglassIcon from "virtual:icons/lucide/hourglass";
import PaletteIcon from "virtual:icons/lucide/palette";
import SettingsIcon from "virtual:icons/lucide/settings";
import ShieldAlertIcon from "virtual:icons/lucide/shield-alert";
import SwordsIcon from "virtual:icons/lucide/swords";
import type { Component } from "svelte";
import type { TranslationKey } from "$lib/utils";

interface RouteDefinition {
  label: TranslationKey;
  icon: Component<any>;
}

// Tool-level routes for the left sidebar
export const TOOL_ROUTES: Record<string, RouteDefinition> = {
  "/main/dps": { label: "dpsDetection", icon: ActivityIcon },
  "/main/module-calc": { label: "moduleCalc", icon: CalculatorIcon },
  "/main/skill-monitor": { label: "liveMonitor", icon: SwordsIcon },
  "/main/monster-monitor": { label: "monsterMonitor", icon: ShieldAlertIcon },
};

// Sub-routes for DPS tool (tabs in the right panel)
export const DPS_SUB_ROUTES: Record<string, RouteDefinition> = {
  "/main/dps/history": { label: "tabHistory", icon: HourglassIcon },
  "/main/dps/themes": { label: "themes", icon: PaletteIcon },
  "/main/dps/settings": { label: "settings", icon: SettingsIcon },
};

// Legacy export for backward compatibility (if needed)
export const SIDEBAR_ROUTES = DPS_SUB_ROUTES;
