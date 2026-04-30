<script lang="ts">
    import { invoke } from "@tauri-apps/api/core";
    import { Button } from "$lib/components/ui/button";
    import { save } from "@tauri-apps/plugin-dialog";
    import { toast } from "svelte-sonner";
    import { t } from "$lib/utils";

    async function openLogDir() {
        try {
            await invoke("open_log_dir");
        } catch (e) {
            console.error(e);
            toast.error($t("openLogDirFailed") + e);
        }
    }

    async function createDiagnosticsBundle() {
        try {
            const ts = new Date();
            const pad = (n: number) => n.toString().padStart(2, "0");
            const defaultName = `debug_${ts.getFullYear()}-${pad(ts.getMonth() + 1)}-${pad(ts.getDate())}_${pad(ts.getHours())}-${pad(ts.getMinutes())}-${pad(ts.getSeconds())}.zip`;

            const destinationPath = await save({
                title: $t("saveDebugZip"),
                defaultPath: defaultName,
                filters: [{ name: "Zip", extensions: ["zip"] }],
            });

            if (!destinationPath) {
                return;
            }

            const path = await invoke<string>("create_diagnostics_bundle", {
                destination_path: destinationPath,
            });
            try {
                await navigator.clipboard.writeText(path);
                toast.success($t("debugZipCreatedCopied") + path);
            } catch {
                toast.success($t("debugZipCreated") + path);
            }
        } catch (e) {
            console.error(e);
            toast.error($t("createDebugZipFailed") + e);
        }
    }
</script>

<div class="space-y-3">
    <div
        class="overflow-hidden rounded-lg border border-border/60 bg-card/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
    >
        <div class="px-4 py-3">
            <h2 class="mb-4 text-base font-semibold text-foreground">
                {$t("tabDebug")}
            </h2>

            <div class="flex items-center justify-between">
                <div class="text-sm text-muted-foreground">
                    <div class="font-medium text-foreground">{$t("logFiles")}</div>
                    {$t("openLogDirDesc")}
                </div>
                <Button variant="outline" onclick={openLogDir}>
                    {$t("openLogs")}
                </Button>
            </div>

            <div class="mt-4 flex items-center justify-between">
                <div class="text-sm text-muted-foreground">
                    <div class="font-medium text-foreground">{$t("debugZip")}</div>
                    {$t("debugZipDesc")}
                </div>
                <Button variant="outline" onclick={createDiagnosticsBundle}>
                    {$t("createDebugZip")}
                </Button>
            </div>
        </div>
    </div>
</div>
