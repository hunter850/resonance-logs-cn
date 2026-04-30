<script lang="ts">
  import type { ModuleInfo } from "$lib/api";
  import { t } from "$lib/utils";

  let {
    moduleCount = null,
    modules = [],
    minTotalValue = 12,
  }: {
    moduleCount: number | null;
    modules: ModuleInfo[];
    minTotalValue: number;
  } = $props();

  const filteredModuleCount = $derived(
    modules.filter(
      (module) =>
        module.parts.reduce((total, part) => total + part.value, 0) >= minTotalValue
    ).length
  );
</script>

<div class="rounded-lg border border-border/60 bg-card/40 p-4 space-y-1">
  <div class="text-base font-semibold text-foreground">{$t("dataStatus")}</div>
  <div class="text-sm text-muted-foreground">
    {$t("moduleCountColon")}{moduleCount ?? $t("notSynced")}
  </div>
  <div class="text-sm text-muted-foreground">
    {$t("afterFilteringColon")}{moduleCount === null ? $t("notSynced") : filteredModuleCount}
  </div>
</div>

