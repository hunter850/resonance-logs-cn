<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { t } from "$lib/utils";
  import SettingsSwitch from "./settings-switch.svelte";
  import SettingsSelect from "./settings-select.svelte";
  import SettingsSlider from "./settings-slider.svelte";
  import { SETTINGS } from "$lib/settings-store";
  import ChevronDown from "virtual:icons/lucide/chevron-down";
  import {
    liveDpsPlayerColumns,
    liveDpsSkillColumns,
    liveHealPlayerColumns,
    liveHealSkillColumns,
    liveTankedPlayerColumns,
    liveTankedSkillColumns,
  } from "$lib/column-data";

  const SETTINGS_CATEGORY = "live";
  // Collapsible section state - all collapsed by default
  let expandedSections = $state({
    general: false,
    trainingDummy: false,
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
  // Drag state for column reordering (unused - keeping for potential future use)
</script>

<Tabs.Content value={SETTINGS_CATEGORY}>
  <div class="space-y-3">
    <div
      class="rounded-lg border bg-card/40 border-border/60 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
        onclick={() => toggleSection("general")}
      >
        <h2 class="text-base font-semibold text-foreground">
          {$t("generalSettings")}
        </h2>
        <ChevronDown
          class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.general
            ? 'rotate-180'
            : ''}"
        />
      </button>
      {#if expandedSections.general}
        <div class="px-4 pb-3 space-y-1">
          <SettingsSelect
            bind:selected={SETTINGS.live.general.state.showYourName}
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
            bind:selected={SETTINGS.live.general.state.showOthersName}
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
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.showYourAbilityScore}
            label={$t("yourAbilityScore")}
            description={$t("yourAbilityScoreDesc")}
          />
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.showOthersAbilityScore}
            label={$t("othersAbilityScore")}
            description={$t("othersAbilityScoreDesc")}
          />
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.showYourSeasonStrength}
            label={$t("yourSeasonStrength")}
            description={$t("yourSeasonStrengthDesc")}
          />
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.showOthersSeasonStrength}
            label={$t("othersSeasonStrength")}
            description={$t("othersSeasonStrengthDesc")}
          />
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.relativeToTopDPSPlayer}
            label={$t("relativeToTopDPSPlayer")}
            description={$t("relativeToTopDPSPlayerDesc")}
          />
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.relativeToTopDPSSkill}
            label={$t("relativeToTopDPSSkill")}
            description={$t("relativeToTopDPSSkillDesc")}
          />
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.relativeToTopHealPlayer}
            label={$t("relativeToTopHealPlayer")}
            description={$t("relativeToTopHealPlayerDesc")}
          />
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.relativeToTopHealSkill}
            label={$t("relativeToTopHealSkill")}
            description={$t("relativeToTopHealSkillDesc")}
          />
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.relativeToTopTankedPlayer}
            label={$t("relativeToTopTankedPlayer")}
            description={$t("relativeToTopTankedPlayerDesc")}
          />
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.relativeToTopTankedSkill}
            label={$t("relativeToTopTankedSkill")}
            description={$t("relativeToTopTankedSkillDesc")}
          />
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.shortenTps}
            label={$t("shortenTps")}
            description={$t("shortenTpsDesc")}
          />
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.shortenAbilityScore}
            label={$t("shortenAbilityScore")}
            description={$t("shortenAbilityScoreDesc")}
          />
          <SettingsSwitch
            bind:checked={SETTINGS.live.general.state.shortenDps}
            label={$t("shortenDps")}
            description={$t("shortenDpsDesc")}
          />
          <SettingsSelect
            bind:selected={SETTINGS.live.general.state.abbreviationStyle}
            label={$t("abbreviationStyle")}
            description={$t("abbreviationStyleDesc")}
            values={[
              { label: $t("westernAbbreviation"), value: "western" },
              { label: $t("chineseAbbreviation"), value: "cn" },
            ]}
          />
          <SettingsSelect
            bind:selected={SETTINGS.live.general.state.abbreviatedDecimalPlaces}
            label={$t("abbreviatedDecimalPlaces")}
            description={$t("abbreviatedDecimalPlacesDesc")}
            values={[
              { label: $t("decimalPlace", { n: "1" }), value: 1 },
              { label: $t("decimalPlace", { n: "2" }), value: 2 },
              { label: $t("decimalPlace", { n: "3" }), value: 3 },
              { label: $t("decimalPlace", { n: "4" }), value: 4 },
            ]}
          />
          <SettingsSlider
            bind:value={SETTINGS.live.general.state.eventUpdateRateMs}
            label={$t("eventUpdateRateMs")}
            description={$t("eventUpdateRateMsDesc")}
            min={50}
            max={2000}
            step={50}
            unit="ms"
          />
        </div>
      {/if}
    </div>

    <div
      class="rounded-lg border bg-card/40 border-border/60 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
        onclick={() => toggleSection("trainingDummy")}
      >
        <h2 class="text-base font-semibold text-foreground">
          {$t("trainingDummyMode")}
        </h2>
        <ChevronDown
          class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.trainingDummy
            ? 'rotate-180'
            : ''}"
        />
      </button>
      {#if expandedSections.trainingDummy}
        <div class="px-4 pb-3 space-y-1">
          <SettingsSelect
            bind:selected={SETTINGS.trainingDummy.state.defaultMonsterId}
            values={[
              { label: $t("eliteEnemyDummy"), value: 115 },
              { label: $t("eliteGuardianDummy"), value: 122 },
            ]}
            label={$t("defaultMonsterId")}
            description={$t("defaultMonsterIdDesc")}
          />
        </div>
      {/if}
    </div>

    <!-- DPS - Player Settings -->
    <div
      class="rounded-lg border bg-card/40 border-border/60 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
        onclick={() => toggleSection("dpsPlayers")}
      >
        <h2 class="text-base font-semibold text-foreground">
          {$t("dpsPlayersColumns")}
        </h2>
        <ChevronDown
          class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.dpsPlayers
            ? 'rotate-180'
            : ''}"
        />
      </button>
      {#if expandedSections.dpsPlayers}
        <div class="px-4 pb-3 space-y-1">
          <p class="text-xs text-muted-foreground mb-2">
            {$t("columnOrderHint")}
          </p>
          {#each SETTINGS.live.columnOrder.dpsPlayers.state.order as colKey, idx (colKey)}
            {@const col = liveDpsPlayerColumns.find((c) => c.key === colKey)}
            {#if col}
              <div
                class="flex items-center gap-2 px-2 py-1 rounded bg-muted/20 border border-border/30"
              >
                <div class="flex flex-col">
                  <button
                    type="button"
                    class="text-xs px-1 hover:bg-muted/50 rounded disabled:opacity-30"
                    disabled={idx === 0}
                    onclick={() => {
                      const arr = [...SETTINGS.live.columnOrder.dpsPlayers.state.order];
                      const prev = arr[idx - 1];
                      const curr = arr[idx];
                      if (prev !== undefined && curr !== undefined) {
                        arr.splice(idx - 1, 2, curr, prev);
                        SETTINGS.live.columnOrder.dpsPlayers.state.order = arr;
                      }
                    }}>▲</button
                  >
                  <button
                    type="button"
                    class="text-xs px-1 hover:bg-muted/50 rounded disabled:opacity-30"
                    disabled={idx === SETTINGS.live.columnOrder.dpsPlayers.state.order.length - 1}
                    onclick={() => {
                      const arr = [...SETTINGS.live.columnOrder.dpsPlayers.state.order];
                      const curr = arr[idx];
                      const next = arr[idx + 1];
                      if (curr !== undefined && next !== undefined) {
                        arr.splice(idx, 2, next, curr);
                        SETTINGS.live.columnOrder.dpsPlayers.state.order = arr;
                      }
                    }}>▼</button
                  >
                </div>
                <SettingsSwitch
                  bind:checked={
                    SETTINGS.live.dps.players.state[
                      col.key as keyof typeof SETTINGS.live.dps.players.state
                    ]
                  }
                  label={col.label}
                  description={col.description}
                />
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <!-- DPS - Skill Breakdown Settings -->
    <div
      class="rounded-lg border bg-card/40 border-border/60 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
        onclick={() => toggleSection("dpsSkills")}
      >
        <h2 class="text-base font-semibold text-foreground">
          {$t("dpsSkillsColumns")}
        </h2>
        <ChevronDown
          class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.dpsSkills
            ? 'rotate-180'
            : ''}"
        />
      </button>
      {#if expandedSections.dpsSkills}
        <div class="px-4 pb-3 space-y-1">
          <p class="text-xs text-muted-foreground mb-2">
            {$t("columnOrderHint")}
          </p>
          {#each SETTINGS.live.columnOrder.dpsSkills.state.order as colKey, idx (colKey)}
            {@const col = liveDpsSkillColumns.find((c) => c.key === colKey)}
            {#if col}
              <div
                class="flex items-center gap-2 px-2 py-1 rounded bg-muted/20 border border-border/30"
              >
                <div class="flex flex-col">
                  <button
                    type="button"
                    class="text-xs px-1 hover:bg-muted/50 rounded disabled:opacity-30"
                    disabled={idx === 0}
                    onclick={() => {
                      const arr = [...SETTINGS.live.columnOrder.dpsSkills.state.order];
                      const prev = arr[idx - 1];
                      const curr = arr[idx];
                      if (prev !== undefined && curr !== undefined) {
                        arr.splice(idx - 1, 2, curr, prev);
                        SETTINGS.live.columnOrder.dpsSkills.state.order = arr;
                      }
                    }}>▲</button
                  >
                  <button
                    type="button"
                    class="text-xs px-1 hover:bg-muted/50 rounded disabled:opacity-30"
                    disabled={idx === SETTINGS.live.columnOrder.dpsSkills.state.order.length - 1}
                    onclick={() => {
                      const arr = [...SETTINGS.live.columnOrder.dpsSkills.state.order];
                      const curr = arr[idx];
                      const next = arr[idx + 1];
                      if (curr !== undefined && next !== undefined) {
                        arr.splice(idx, 2, next, curr);
                        SETTINGS.live.columnOrder.dpsSkills.state.order = arr;
                      }
                    }}>▼</button
                  >
                </div>
                <SettingsSwitch
                  bind:checked={
                    SETTINGS.live.dps.skillBreakdown.state[
                      col.key as keyof typeof SETTINGS.live.dps.skillBreakdown.state
                    ]
                  }
                  label={col.label}
                  description={col.description}
                />
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <!-- Heal - Player Settings -->
    <div
      class="rounded-lg border bg-card/40 border-border/60 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
        onclick={() => toggleSection("healPlayers")}
      >
        <h2 class="text-base font-semibold text-foreground">
          {$t("healPlayersColumns")}
        </h2>
        <ChevronDown
          class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.healPlayers
            ? 'rotate-180'
            : ''}"
        />
      </button>
      {#if expandedSections.healPlayers}
        <div class="px-4 pb-3 space-y-1">
          <p class="text-xs text-muted-foreground mb-2">
            {$t("columnOrderHint")}
          </p>
          {#each SETTINGS.live.columnOrder.healPlayers.state.order as colKey, idx (colKey)}
            {@const col = liveHealPlayerColumns.find((c) => c.key === colKey)}
            {#if col}
              <div
                class="flex items-center gap-2 px-2 py-1 rounded bg-muted/20 border border-border/30"
              >
                <div class="flex flex-col">
                  <button
                    type="button"
                    class="text-xs px-1 hover:bg-muted/50 rounded disabled:opacity-30"
                    disabled={idx === 0}
                    onclick={() => {
                      const arr = [...SETTINGS.live.columnOrder.healPlayers.state.order];
                      const prev = arr[idx - 1];
                      const curr = arr[idx];
                      if (prev !== undefined && curr !== undefined) {
                        arr.splice(idx - 1, 2, curr, prev);
                        SETTINGS.live.columnOrder.healPlayers.state.order = arr;
                      }
                    }}>▲</button
                  >
                  <button
                    type="button"
                    class="text-xs px-1 hover:bg-muted/50 rounded disabled:opacity-30"
                    disabled={idx === SETTINGS.live.columnOrder.healPlayers.state.order.length - 1}
                    onclick={() => {
                      const arr = [...SETTINGS.live.columnOrder.healPlayers.state.order];
                      const curr = arr[idx];
                      const next = arr[idx + 1];
                      if (curr !== undefined && next !== undefined) {
                        arr.splice(idx, 2, next, curr);
                        SETTINGS.live.columnOrder.healPlayers.state.order = arr;
                      }
                    }}>▼</button
                  >
                </div>
                <SettingsSwitch
                  bind:checked={
                    SETTINGS.live.heal.players.state[
                      col.key as keyof typeof SETTINGS.live.heal.players.state
                    ]
                  }
                  label={col.label}
                  description={col.description}
                />
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <!-- Heal - Skill Breakdown Settings -->
    <div
      class="rounded-lg border bg-card/40 border-border/60 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
        onclick={() => toggleSection("healSkills")}
      >
        <h2 class="text-base font-semibold text-foreground">
          {$t("healSkillsColumns")}
        </h2>
        <ChevronDown
          class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.healSkills
            ? 'rotate-180'
            : ''}"
        />
      </button>
      {#if expandedSections.healSkills}
        <div class="px-4 pb-3 space-y-1">
          <p class="text-xs text-muted-foreground mb-2">
            {$t("columnOrderHint")}
          </p>
          {#each SETTINGS.live.columnOrder.healSkills.state.order as colKey, idx (colKey)}
            {@const col = liveHealSkillColumns.find((c) => c.key === colKey)}
            {#if col}
              <div
                class="flex items-center gap-2 px-2 py-1 rounded bg-muted/20 border border-border/30"
              >
                <div class="flex flex-col">
                  <button
                    type="button"
                    class="text-xs px-1 hover:bg-muted/50 rounded disabled:opacity-30"
                    disabled={idx === 0}
                    onclick={() => {
                      const arr = [...SETTINGS.live.columnOrder.healSkills.state.order];
                      const prev = arr[idx - 1];
                      const curr = arr[idx];
                      if (prev !== undefined && curr !== undefined) {
                        arr.splice(idx - 1, 2, curr, prev);
                        SETTINGS.live.columnOrder.healSkills.state.order = arr;
                      }
                    }}>▲</button
                  >
                  <button
                    type="button"
                    class="text-xs px-1 hover:bg-muted/50 rounded disabled:opacity-30"
                    disabled={idx === SETTINGS.live.columnOrder.healSkills.state.order.length - 1}
                    onclick={() => {
                      const arr = [...SETTINGS.live.columnOrder.healSkills.state.order];
                      const curr = arr[idx];
                      const next = arr[idx + 1];
                      if (curr !== undefined && next !== undefined) {
                        arr.splice(idx, 2, next, curr);
                        SETTINGS.live.columnOrder.healSkills.state.order = arr;
                      }
                    }}>▼</button
                  >
                </div>
                <SettingsSwitch
                  bind:checked={
                    SETTINGS.live.heal.skillBreakdown.state[
                      col.key as keyof typeof SETTINGS.live.heal.skillBreakdown.state
                    ]
                  }
                  label={col.label}
                  description={col.description}
                />
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <!-- Tanked - Player Settings -->
    <div
      class="rounded-lg border bg-card/40 border-border/60 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
        onclick={() => toggleSection("tankedPlayers")}
      >
        <h2 class="text-base font-semibold text-foreground">
          {$t("tankedPlayersColumns")}
        </h2>
        <ChevronDown
          class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.tankedPlayers
            ? 'rotate-180'
            : ''}"
        />
      </button>
      {#if expandedSections.tankedPlayers}
        <div class="px-4 pb-3 space-y-1">
          <p class="text-xs text-muted-foreground mb-2">
            {$t("columnOrderHint")}
          </p>
          {#each SETTINGS.live.columnOrder.tankedPlayers.state.order as colKey, idx (colKey)}
            {@const col = liveTankedPlayerColumns.find((c) => c.key === colKey)}
            {#if col}
              <div
                class="flex items-center gap-2 px-2 py-1 rounded bg-muted/20 border border-border/30"
              >
                <div class="flex flex-col">
                  <button
                    type="button"
                    class="text-xs px-1 hover:bg-muted/50 rounded disabled:opacity-30"
                    disabled={idx === 0}
                    onclick={() => {
                      const arr = [...SETTINGS.live.columnOrder.tankedPlayers.state.order];
                      const prev = arr[idx - 1];
                      const curr = arr[idx];
                      if (prev !== undefined && curr !== undefined) {
                        arr.splice(idx - 1, 2, curr, prev);
                        SETTINGS.live.columnOrder.tankedPlayers.state.order = arr;
                      }
                    }}>▲</button
                  >
                  <button
                    type="button"
                    class="text-xs px-1 hover:bg-muted/50 rounded disabled:opacity-30"
                    disabled={idx ===
                      SETTINGS.live.columnOrder.tankedPlayers.state.order.length - 1}
                    onclick={() => {
                      const arr = [...SETTINGS.live.columnOrder.tankedPlayers.state.order];
                      const curr = arr[idx];
                      const next = arr[idx + 1];
                      if (curr !== undefined && next !== undefined) {
                        arr.splice(idx, 2, next, curr);
                        SETTINGS.live.columnOrder.tankedPlayers.state.order = arr;
                      }
                    }}>▼</button
                  >
                </div>
                <SettingsSwitch
                  bind:checked={
                    SETTINGS.live.tanked.players.state[
                      col.key as keyof typeof SETTINGS.live.tanked.players.state
                    ]
                  }
                  label={col.label}
                  description={col.description}
                />
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <!-- Tanked - Skill Breakdown Settings -->
    <div
      class="rounded-lg border bg-card/40 border-border/60 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
        onclick={() => toggleSection("tankedSkills")}
      >
        <h2 class="text-base font-semibold text-foreground">
          {$t("tankedSkillsColumns")}
        </h2>
        <ChevronDown
          class="w-5 h-5 text-muted-foreground transition-transform duration-200 {expandedSections.tankedSkills
            ? 'rotate-180'
            : ''}"
        />
      </button>
      {#if expandedSections.tankedSkills}
        <div class="px-4 pb-3 space-y-1">
          <p class="text-xs text-muted-foreground mb-2">
            {$t("columnOrderHint")}
          </p>
          {#each SETTINGS.live.columnOrder.tankedSkills.state.order as colKey, idx (colKey)}
            {@const col = liveTankedSkillColumns.find((c) => c.key === colKey)}
            {#if col}
              <div
                class="flex items-center gap-2 px-2 py-1 rounded bg-muted/20 border border-border/30"
              >
                <div class="flex flex-col">
                  <button
                    type="button"
                    class="text-xs px-1 hover:bg-muted/50 rounded disabled:opacity-30"
                    disabled={idx === 0}
                    onclick={() => {
                      const arr = [...SETTINGS.live.columnOrder.tankedSkills.state.order];
                      const prev = arr[idx - 1];
                      const curr = arr[idx];
                      if (prev !== undefined && curr !== undefined) {
                        arr.splice(idx - 1, 2, curr, prev);
                        SETTINGS.live.columnOrder.tankedSkills.state.order = arr;
                      }
                    }}>▲</button
                  >
                  <button
                    type="button"
                    class="text-xs px-1 hover:bg-muted/50 rounded disabled:opacity-30"
                    disabled={idx === SETTINGS.live.columnOrder.tankedSkills.state.order.length - 1}
                    onclick={() => {
                      const arr = [...SETTINGS.live.columnOrder.tankedSkills.state.order];
                      const curr = arr[idx];
                      const next = arr[idx + 1];
                      if (curr !== undefined && next !== undefined) {
                        arr.splice(idx, 2, next, curr);
                        SETTINGS.live.columnOrder.tankedSkills.state.order = arr;
                      }
                    }}>▼</button
                  >
                </div>
                <SettingsSwitch
                  bind:checked={
                    SETTINGS.live.tanked.skills.state[
                      col.key as keyof typeof SETTINGS.live.tanked.skills.state
                    ]
                  }
                  label={col.label}
                  description={col.description}
                />
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>
</Tabs.Content>
