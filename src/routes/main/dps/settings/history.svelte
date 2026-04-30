<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { t } from "$lib/utils";
  import SettingsSwitch from "./settings-switch.svelte";
  import SettingsSelect from "./settings-select.svelte";
  import { historyDpsPlayerColumns, historyDpsSkillColumns, historyHealPlayerColumns, historyHealSkillColumns, historyTankedPlayerColumns, historyTankedSkillColumns } from "$lib/column-data";
  import { SETTINGS } from "$lib/settings-store";
  import ChevronDown from "virtual:icons/lucide/chevron-down";

  const SETTINGS_CATEGORY = "history";

  // Collapsible section state - all collapsed by default
  let expandedSections = $state({
    general: false,
    dpsPlayers: false,
    dpsSkills: false,
    healPlayers: false,
    healSkills: false,
    tankedPlayers: false,
    tankedSkills: false,
  });

  function toggleSection(section: keyof typeof expandedSections) {
    expandedSections[section] = !expandedSections[section];
  }
</script>

<Tabs.Content value={SETTINGS_CATEGORY}>
  <div class="space-y-3">
    <div class="rounded-lg border bg-card/40 border-border/60 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]">
      <button
        type="button"
        class="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
        onclick={() => toggleSection('general')}
      >
        <h2 class="text-base font-semibold text-foreground">{$t("generalSettings")}</h2>
        <ChevronDown class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.general ? 'rotate-180' : ''}" />
      </button>
      {#if expandedSections.general}
        <div class="px-4 pb-3 space-y-1">
          <SettingsSelect
            bind:selected={SETTINGS.history.general.state.showYourName}
            values={[
              { label: $t("showYourName"), value: "Show Your Name" },
              { label: $t("showYourClass"), value: "Show Your Class" },
              { label: $t("showYourNameClass"), value: "Show Your Name - Class" },
              { label: $t("showYourNameSpec"), value: "Show Your Name - Spec" },
              { label: $t("hideYourName"), value: "Hide Your Name" },
            ]}
            label={$t("showYourName")}
            description={$t("showYourNameDesc")}
          />
          <SettingsSelect
            bind:selected={SETTINGS.history.general.state.showOthersName}
            values={[
              { label: $t("showOthersName"), value: "Show Others' Name" },
              { label: $t("showOthersClass"), value: "Show Others' Class" },
              { label: $t("showOthersNameClass"), value: "Show Others' Name - Class" },
              { label: $t("showOthersNameSpec"), value: "Show Others' Name - Spec" },
              { label: $t("hideOthersName"), value: "Hide Others' Name" },
            ]}
            label={$t("showOthersName")}
            description={$t("showOthersNameDesc")}
          />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.showYourAbilityScore} label={$t("yourAbilityScore")} description={$t("yourAbilityScoreDesc")} />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.showOthersAbilityScore} label={$t("othersAbilityScore")} description={$t("othersAbilityScoreDesc")} />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.showYourSeasonStrength} label={$t("yourSeasonStrength")} description={$t("yourSeasonStrengthDesc")} />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.showOthersSeasonStrength} label={$t("othersSeasonStrength")} description={$t("othersSeasonStrengthDesc")} />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.relativeToTopDPSPlayer} label={$t("relativeToTopDPSPlayer")} description={$t("relativeToTopDPSPlayerDesc")} />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.relativeToTopDPSSkill} label={$t("relativeToTopDPSSkill")} description={$t("relativeToTopDPSSkillDesc")} />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.relativeToTopHealPlayer} label={$t("relativeToTopHealPlayer")} description={$t("relativeToTopHealPlayerDesc")} />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.relativeToTopHealSkill} label={$t("relativeToTopHealSkill")} description={$t("relativeToTopHealSkillDesc")} />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.relativeToTopTankedPlayer} label={$t("relativeToTopTankedPlayer")} description={$t("relativeToTopTankedPlayerDesc")} />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.relativeToTopTankedSkill} label={$t("relativeToTopTankedSkill")} description={$t("relativeToTopTankedSkillDesc")} />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.shortenTps} label={$t("shortenTps")} description={$t("shortenTpsDesc")} />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.shortenAbilityScore} label={$t("shortenAbilityScore")} description={$t("shortenAbilityScoreDesc")} />
          <SettingsSwitch bind:checked={SETTINGS.history.general.state.shortenDps} label={$t("shortenDps")} description={$t("shortenDpsDesc")} />
          <SettingsSelect
            bind:selected={SETTINGS.history.general.state.abbreviationStyle}
            label={$t("abbreviationStyle")}
            description={$t("abbreviationStyleDesc")}
            values={[
              { label: $t("westernAbbreviation"), value: "western" },
              { label: $t("chineseAbbreviation"), value: "cn" },
            ]}
          />
          <SettingsSelect
            bind:selected={SETTINGS.history.general.state.abbreviatedDecimalPlaces}
            label={$t("abbreviatedDecimalPlaces")}
            description={$t("abbreviatedDecimalPlacesDesc")}
            values={[
              { label: $t("decimalPlace", { n: "1" }), value: 1 },
              { label: $t("decimalPlace", { n: "2" }), value: 2 },
              { label: $t("decimalPlace", { n: "3" }), value: 3 },
              { label: $t("decimalPlace", { n: "4" }), value: 4 },
            ]}
          />
        </div>
      {/if}
    </div>

    <!-- DPS - Player Settings -->
  <div class="bg-popover/40 rounded-lg border border-border/50 overflow-hidden">
      <button
        type="button"
  class="w-full flex items-center justify-between px-4 py-3 hover:bg-popover/50 transition-colors"
        onclick={() => toggleSection('dpsPlayers')}
      >
  <h2 class="text-base font-semibold text-foreground">{$t("dpsPlayersColumns")}</h2>
  <ChevronDown class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.dpsPlayers ? 'rotate-180' : ''}" />
      </button>
      {#if expandedSections.dpsPlayers}
        <div class="px-4 pb-3 space-y-1">
          {#each historyDpsPlayerColumns as col (col.key)}
            <SettingsSwitch bind:checked={SETTINGS.history.dps.players.state[col.key]} label={col.label} description={col.description} />
          {/each}
        </div>
      {/if}
    </div>

    <!-- DPS - Skill Breakdown Settings -->
  <div class="bg-popover/40 rounded-lg border border-border/50 overflow-hidden">
      <button
        type="button"
  class="w-full flex items-center justify-between px-4 py-3 hover:bg-popover/50 transition-colors"
        onclick={() => toggleSection('dpsSkills')}
      >
  <h2 class="text-base font-semibold text-foreground">{$t("dpsSkillsColumns")}</h2>
  <ChevronDown class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.dpsSkills ? 'rotate-180' : ''}" />
      </button>
      {#if expandedSections.dpsSkills}
        <div class="px-4 pb-3 space-y-1">
          {#each historyDpsSkillColumns as col (col.key)}
            <SettingsSwitch bind:checked={SETTINGS.history.dps.skillBreakdown.state[col.key]} label={col.label} description={col.description} />
          {/each}
        </div>
      {/if}
    </div>

    <!-- Heal - Player Settings -->
  <div class="bg-popover/40 rounded-lg border border-border/50 overflow-hidden">
      <button
        type="button"
  class="w-full flex items-center justify-between px-4 py-3 hover:bg-popover/50 transition-colors"
        onclick={() => toggleSection('healPlayers')}
      >
  <h2 class="text-base font-semibold text-foreground">{$t("healPlayersColumns")}</h2>
  <ChevronDown class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.healPlayers ? 'rotate-180' : ''}" />
      </button>
      {#if expandedSections.healPlayers}
        <div class="px-4 pb-3 space-y-1">
          {#each historyHealPlayerColumns as col (col.key)}
            <SettingsSwitch bind:checked={SETTINGS.history.heal.players.state[col.key]} label={col.label} description={col.description} />
          {/each}
        </div>
      {/if}
    </div>

    <!-- Heal - Skill Breakdown Settings -->
  <div class="bg-popover/40 rounded-lg border border-border/50 overflow-hidden">
      <button
        type="button"
  class="w-full flex items-center justify-between px-4 py-3 hover:bg-popover/50 transition-colors"
        onclick={() => toggleSection('healSkills')}
      >
  <h2 class="text-base font-semibold text-foreground">{$t("healSkillsColumns")}</h2>
  <ChevronDown class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.healSkills ? 'rotate-180' : ''}" />
      </button>
      {#if expandedSections.healSkills}
        <div class="px-4 pb-3 space-y-1">
          {#each historyHealSkillColumns as col (col.key)}
            <SettingsSwitch bind:checked={SETTINGS.history.heal.skillBreakdown.state[col.key]} label={col.label} description={col.description} />
          {/each}
        </div>
      {/if}
    </div>

    <!-- Tanked - Player Settings -->
  <div class="bg-popover/40 rounded-lg border border-border/50 overflow-hidden">
      <button
        type="button"
  class="w-full flex items-center justify-between px-4 py-3 hover:bg-popover/50 transition-colors"
        onclick={() => toggleSection('tankedPlayers')}
      >
  <h2 class="text-base font-semibold text-foreground">{$t("tankedPlayersColumns")}</h2>
  <ChevronDown class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.tankedPlayers ? 'rotate-180' : ''}" />
      </button>
      {#if expandedSections.tankedPlayers}
        <div class="px-4 pb-3 space-y-1">
          {#each historyTankedPlayerColumns as col (col.key)}
            <SettingsSwitch bind:checked={SETTINGS.history.tanked.players.state[col.key]} label={col.label} description={col.description} />
          {/each}
        </div>
      {/if}
    </div>

    <!-- Tanked - Skill Breakdown Settings -->
  <div class="bg-popover/40 rounded-lg border border-border/50 overflow-hidden">
      <button
        type="button"
  class="w-full flex items-center justify-between px-4 py-3 hover:bg-popover/50 transition-colors"
        onclick={() => toggleSection('tankedSkills')}
      >
  <h2 class="text-base font-semibold text-foreground">{$t("tankedSkillsColumns")}</h2>
  <ChevronDown class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.tankedSkills ? 'rotate-180' : ''}" />
      </button>
      {#if expandedSections.tankedSkills}
        <div class="px-4 pb-3 space-y-1">
          {#each historyTankedSkillColumns as col (col.key)}
            <SettingsSwitch bind:checked={SETTINGS.history.tanked.skillBreakdown.state[col.key]} label={col.label} description={col.description} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</Tabs.Content>
