import React from "react";
export interface DropDownOption<T> {
    label: string;
    value: T;
}
export declare function useDropDown<T>(options: DropDownOption<T>[]): {
    options: string[];
    value: string;
    onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
    readonly selected: T;
};
export interface DropDownProps {
    options: string[];
    value: string;
    onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
}
export declare function DropDown({ options, value, onChange }: DropDownProps): JSX.Element;
