export function getFirstWords(text: string | undefined, count: number): string {
    if (!text) return '';
    const words = text.trim().split(/\s+/);
    const preview = words.slice(0, count).join(' ');
    return words.length > count ? `${preview}…` : preview;
}


