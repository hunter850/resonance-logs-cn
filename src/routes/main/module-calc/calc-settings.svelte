<script lang="ts">
  import { Switch } from "$lib/components/ui/switch";
  import { Button } from "$lib/components/ui/button";
  import { t } from "$lib/utils";

  let {
    useGpu = $bindable(true),
    gpuSupport = $bindable<{ cuda_available: boolean; opencl_available: boolean } | null>(null),
    combinationSize = $bindable<4 | 5>(4),
  } = $props();
</script>

<div class="rounded-lg border border-border/60 bg-card/40 p-4 space-y-3">
  <div class="text-base font-semibold text-foreground">{$t("calculationSettings")}</div>
  <div class="space-y-2">
    <div class="text-sm text-foreground">{$t("moduleCountLabel")}</div>
    <div class="flex items-center gap-2">
      <Button
        type="button"
        variant={combinationSize === 4 ? "default" : "outline"}
        size="sm"
        onclick={() => (combinationSize = 4)}
      >
        {$t("nModules", { n: "4" })}
      </Button>
      <Button
        type="button"
        variant={combinationSize === 5 ? "default" : "outline"}
        size="sm"
        onclick={() => (combinationSize = 5)}
      >
        {$t("nModules", { n: "5" })}
      </Button>
    </div>
  </div>
  <div class="flex items-center gap-3">
    <Switch bind:checked={useGpu} />
    <div class="text-sm text-foreground">{$t("gpuAcceleration")}</div>
    {#if gpuSupport}
      <div class="text-xs text-muted-foreground">
        CUDA: {gpuSupport.cuda_available ? $t("available") : $t("unavailable")} · OpenCL: {gpuSupport.opencl_available ? $t("available") : $t("unavailable")}
      </div>
    {/if}
  </div>
</div>

