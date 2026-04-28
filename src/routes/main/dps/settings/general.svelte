<script lang="ts">
  import SettingsSelect from "./settings-select.svelte";
  import { locale, t } from "$lib/utils";
</script>

<div class="space-y-3">
  <div
    class="rounded-lg border bg-card/40 border-border/60 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
  >
    <div class="px-4 py-3">
      <h2 class="text-base font-semibold text-foreground mb-4">
        {$t("basicSettings")}
      </h2>

      <div class="space-y-1 -mx-4 -mb-3 px-4 pb-3">
        <SettingsSelect
          bind:selected={$locale}
          values={[
            { label: "简体中文 (zh-CN)", value: "zh-CN" },
            { label: "繁體中文 (zh-TW)", value: "zh-TW" },
            { label: "日本語 (ja)", value: "ja" },
            { label: "English (en)", value: "en" },
          ]}
          label={$t("appLanguage")}
          description={$t("appLanguageDesc")}
        />
      </div>
    </div>
  </div>
</div>
