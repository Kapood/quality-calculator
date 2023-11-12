import React, { ReactNode } from "react";
export interface FlowerBIChartBox extends React.HTMLAttributes<HTMLDivElement> {
    id?: string;
    title?: string;
    children?: ReactNode | ReactNode[];
    state?: string;
}
export declare function FlowerBIChartBox({ id, title, children, state }: FlowerBIChartBox): JSX.Element;
