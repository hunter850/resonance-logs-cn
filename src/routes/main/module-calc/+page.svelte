<script lang="ts">
  import { onMount } from "svelte";
  import { Button } from "$lib/components/ui/button";
  import CalculatorIcon from "virtual:icons/lucide/calculator";
  import RefreshCw from "virtual:icons/lucide/refresh-cw";
  import PlayIcon from "virtual:icons/lucide/play";
  import AlertTriangle from "virtual:icons/lucide/alert-triangle";
  import Loader2 from "virtual:icons/lucide/loader-2";
  import { t } from "$lib/utils";

  import DataStatus from "./data-status.svelte";
  import FilterSettings from "./filter-settings.svelte";
  import CalcSettings from "./calc-settings.svelte";
  import ResultsTable from "./results-table.svelte";
  import ModuleDetail from "./module-detail.svelte";

  import {
    getLatestModules,
    optimizeLatestModules,
    type ModuleSolution,
  } from "$lib/api";
  import { invoke } from "@tauri-apps/api/core";

  import {
    MODULE_CALC,
    ensureModuleCalcProgressListener,
  } from "$lib/stores/module-calc-store.svelte";

  const ATTR_OPTIONS = $derived([
    { id: 1110, label: $t("attrStr") },
    { id: 1111, label: $t("attrDex") },
    { id: 1112, label: $t("attrInt") },
    { id: 1113, label: $t("attrAtkDmg") },
    { id: 1114, label: $t("attrEliteDmg") },
    { id: 1205, label: $t("attrAtkHeal") },
    { id: 1206, label: $t("attrSpecHeal") },
    { id: 1407, label: $t("attrCastingFocus") },
    { id: 1408, label: $t("attrAtkSpeedFocus") },
    { id: 1409, label: $t("attrCritFocus") },
    { id: 1410, label: $t("attrLuckyFocus") },
    { id: 1307, label: $t("attrMagicRes") },
    { id: 1308, label: $t("attrPhysRes") },
    { id: 2104, label: $t("attrExDmgStack") },
    { id: 2105, label: $t("attrExAgility") },
    { id: 2204, label: $t("attrExHpCondense") },
    { id: 2205, label: $t("attrExFirstAid") },
    { id: 2404, label: $t("attrExHpWave") },
    { id: 2405, label: $t("attrExHpLeech") },
    { id: 2406, label: $t("attrExTeamCritLucky") },
    { id: 2304, label: $t("attrExDesperateGuard") },
  ]);

  async function refreshModules() {
    if (MODULE_CALC.loading) return;
    MODULE_CALC.loading = true;
    MODULE_CALC.error = null;
    try {
      MODULE_CALC.modules = await getLatestModules();
      MODULE_CALC.moduleCount = MODULE_CALC.modules.length;
    } catch (e) {
      MODULE_CALC.error = (e as Error)?.message ?? $t("failedToFetchModules");
    } finally {
      MODULE_CALC.loading = false;
    }
  }

  async function refreshGpuSupport() {
    try {
      MODULE_CALC.gpuSupport = await invoke("check_gpu_support");
    } catch {
      MODULE_CALC.gpuSupport = null;
    }
  }

  async function runOptimize() {
    if (MODULE_CALC.loading) return;
    MODULE_CALC.loading = true;
    MODULE_CALC.error = null;
    MODULE_CALC.progress = { value: 0, max: 0 };
    try {
      const minMap = Object.fromEntries(
        MODULE_CALC.minRequirements
          .filter((m) => m.attrId && m.value !== null)
          .map((m) => [m.attrId as number, m.value as number])
      );

      // Deep clone/snapshot to ensure no Proxy issues passed to invoke
      const payload = {
        targetAttributes: [...MODULE_CALC.targetAttributes],
        excludeAttributes: [...MODULE_CALC.excludeAttributes],
        minTotalValue: MODULE_CALC.minTotalValue,
        minAttrRequirements: minMap,
        useGpu: MODULE_CALC.useGpu,
        combinationSize: MODULE_CALC.combinationSize,
      };

      console.log("Calling optimize_latest_modules with:", payload);

      MODULE_CALC.solutions = await optimizeLatestModules(payload);
      if (MODULE_CALC.solutions.length === 0) {
        MODULE_CALC.error = $t("noAvailableSolutions");
      }
    } catch (e) {
      console.error("Optimize error:", e);
      if (typeof e === "string") {
        MODULE_CALC.error = e;
      } else if (e instanceof Error) {
        MODULE_CALC.error = e.message;
      } else {
        MODULE_CALC.error = $t("calcFailed") + JSON.stringify(e);
      }
    } finally {
      MODULE_CALC.loading = false;
    }
  }

  function openDetail(sol: ModuleSolution) {
    MODULE_CALC.detailSolution = sol;
    MODULE_CALC.detailOpen = true;
  }

  onMount(async () => {
    refreshModules();
    refreshGpuSupport();
    await ensureModuleCalcProgressListener();
  });
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div
        class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary"
      >
        <CalculatorIcon class="w-5 h-5" />
      </div>
      <div>
        <h1 class="text-xl font-bold text-foreground">{$t("moduleCalc")}</h1>
        <p class="text-sm text-muted-foreground">{$t("calcModuleDesc")}</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <Button
        variant="outline"
        onclick={refreshModules}
        disabled={MODULE_CALC.loading}
      >
        {#if MODULE_CALC.loading}
          <Loader2 class="w-4 h-4 mr-2 animate-spin" />
        {:else}
          <RefreshCw class="w-4 h-4 mr-2" />
        {/if}
        {$t("refreshData")}
      </Button>
      <Button
        onclick={runOptimize}
        disabled={MODULE_CALC.loading || (MODULE_CALC.moduleCount || 0) < MODULE_CALC.combinationSize}
      >
        {#if MODULE_CALC.loading}
          <Loader2 class="w-4 h-4 mr-2 animate-spin" />
        {:else}
          <PlayIcon class="w-4 h-4 mr-2" />
        {/if}
        {$t("startCalc")}
      </Button>
    </div>
  </div>

  {#if MODULE_CALC.error}
    <div
      class="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-destructive"
    >
      <AlertTriangle class="w-4 h-4" />
      <span class="text-sm">{MODULE_CALC.error}</span>
    </div>
  {/if}

  <div class="grid gap-4 md:grid-cols-2">
    <DataStatus
      moduleCount={MODULE_CALC.moduleCount}
      modules={MODULE_CALC.modules}
      minTotalValue={MODULE_CALC.minTotalValue}
    />
    <CalcSettings
      bind:useGpu={MODULE_CALC.useGpu}
      bind:gpuSupport={MODULE_CALC.gpuSupport}
      bind:combinationSize={MODULE_CALC.combinationSize}
    />
  </div>

  <FilterSettings
    attributeOptions={ATTR_OPTIONS}
    bind:targetAttributes={MODULE_CALC.targetAttributes}
    bind:excludeAttributes={MODULE_CALC.excludeAttributes}
    bind:minTotalValue={MODULE_CALC.minTotalValue}
    bind:minRequirements={MODULE_CALC.minRequirements}
  />

  <div class="rounded-lg border border-border/60 bg-card/40 p-4 space-y-3">
    <div class="flex items-center justify-between">
      <div class="text-base font-semibold text-foreground">
        {$t("calcResultTop10")}
      </div>
      {#if MODULE_CALC.loading}
        <div class="flex flex-col gap-1 w-64">
          <div
            class="flex items-center justify-end text-xs text-muted-foreground"
          >
            <Loader2 class="w-3 h-3 mr-1 animate-spin" />
            <span>
              {MODULE_CALC.combinationSize === 5 ? $t("calculatingMulti") : $t("calculating")} {MODULE_CALC.progress.max > 0
                ? `${Math.round((MODULE_CALC.progress.value / MODULE_CALC.progress.max) * 100)}%`
                : ""}
            </span>
          </div>
          {#if MODULE_CALC.progress.max > 0}
            <div
              class="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
            >
              <div
                class="h-full bg-primary transition-all duration-300"
                style="width: {(MODULE_CALC.progress.value /
                  MODULE_CALC.progress.max) *
                  100}%"
              ></div>
            </div>
          {/if}
        </div>
      {/if}
    </div>
    <ResultsTable
      solutions={MODULE_CALC.solutions}
      onview={openDetail}
    />
  </div>

  <ModuleDetail
    bind:open={MODULE_CALC.detailOpen}
    bind:solution={MODULE_CALC.detailSolution}
  />
</div>
