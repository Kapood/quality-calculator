import React from "react";
interface LayoutElementCoreProps extends React.HTMLAttributes<HTMLDivElement> {
    sizes?: number[];
    children: React.ReactNode | React.ReactNode[];
}
export declare const Row: (props: LayoutElementCoreProps) => JSX.Element;
export declare const Column: (props: LayoutElementCoreProps) => JSX.Element;
export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode | React.ReactNode[];
}
export declare function Layout({ children, ...otherProps }: LayoutProps): JSX.Element;
export {};
