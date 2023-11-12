import { FilterJson } from "flowerbi";
export interface PageFiltersState {
    readonly global: FilterJson[];
    readonly interactions: FilterJson[];
    readonly interactionKey: string;
}
export interface PageFilters extends PageFiltersState {
    setInteraction(key: string, filters: FilterJson[]): void;
    setGlobal(filters: FilterJson[]): void;
    clearInteraction(): void;
    clearGlobal(): void;
    clearAll(): void;
    getFilters(key: string): FilterJson[];
}
export declare function usePageFilters(): PageFilters;
export interface PageFiltersProp {
    pageFilters: PageFilters;
}
