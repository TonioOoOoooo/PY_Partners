import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the language prefix for URLs based on the current language
 * @param language Current language code (fr or en)
 * @returns Language prefix for URLs (/fr/, /en/ or /)
 */
export function getLanguagePrefix(language: string): string {
  if (language === 'fr') {
    return '/fr';
  } else if (language === 'en') {
    return '/en';
  }
  return '';
}
