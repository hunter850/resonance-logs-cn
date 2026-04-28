/**
 * @file This file contains utility functions for the application.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { derived, writable } from "svelte/store";
import translations from "./translations";

/**
 * A utility function to merge Tailwind classes.
 *
 * @param inputs - A list of class values to merge.
 * @returns The merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

// i18n
export const locale = writable("en");
export const locales = Object.keys(translations);

type LocaleKey = keyof typeof translations;
type TranslationKey = keyof typeof translations["en"];

function translate(locale: LocaleKey, key: TranslationKey, vars: Record<string, string>) {
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no locale provided`);

  // Grab the translation from the translations object, fallback to English
  let text = (translations[locale]?.[key] || translations["en"]?.[key]) as string;

  if (!text) {
    console.warn(`no translation found for ${locale}.${key}`);
    return key;
  }

  // Replace any passed in variables in the translation string.
  Object.keys(vars).forEach((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k] as string);
  });

  return text;
}

export const t = derived(locale, ($locale) => (key: TranslationKey, vars: Record<string, string> = {}) =>
  translate($locale as LocaleKey, key, vars)
);