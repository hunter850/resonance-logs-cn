<script lang="ts">
  /**
   * @file Default page for DPS tool - redirects to history tab.
   */
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { t } from "$lib/utils";

  onMount(() => {
    goto("/main/dps/history");
  });
</script>

<p class="text-muted-foreground">{$t("redirecting")}</p>
