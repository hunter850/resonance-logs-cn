<script lang="ts">
  /**
   * @file Settings page for the DPS detection tool.
   * Contains Live settings, Network settings, Shortcuts, History, and Debug tabs.
   */
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import GeneralSettings from "./general.svelte";
  import LiveSettings from "./live.svelte";
  import NetworkSettings from "./network.svelte";
  import ShortcutsSettings from "./shortcuts.svelte";
  import HistorySettings from "./history.svelte";
  import DebugSettings from "./debug.svelte";
  import { t } from "$lib/utils";

  let settingsTabs = $derived([
    { id: "general", label: $t("tabGeneral") },
    { id: "live", label: $t("tabLive") },
    { id: "network", label: $t("tabNetwork") },
    { id: "shortcuts", label: $t("tabShortcuts") },
    { id: "history", label: $t("tabHistory") },
    { id: "debug", label: $t("tabDebug") },
  ]);

  let activeTab = $state("general");
</script>

<div class="space-y-4">
  <Tabs.Root bind:value={activeTab}>
    <Tabs.List>
      {#each settingsTabs as tab (tab.id)}
        <Tabs.Trigger value={tab.id}>{tab.label}</Tabs.Trigger>
      {/each}
    </Tabs.List>

    <Tabs.Content value="general">
      <GeneralSettings />
    </Tabs.Content>

    <LiveSettings />

    <Tabs.Content value="network">
      <NetworkSettings />
    </Tabs.Content>

    <Tabs.Content value="shortcuts">
      <ShortcutsSettings />
    </Tabs.Content>

    <Tabs.Content value="history">
      <HistorySettings />
    </Tabs.Content>

    <Tabs.Content value="debug">
      <DebugSettings />
    </Tabs.Content>
  </Tabs.Root>
</div>
