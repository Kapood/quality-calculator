import React from "react";
import { FlowerBITable, useQuery } from "flowerbi-react";
import { FlowerBIChartBox } from "flowerbi-react-utils";
import { Bug, CoderAssigned, Customer, Workflow } from "../demoSchema";
import { VisualProps } from "./VisualProps";

export interface BugsGridProps extends VisualProps { }

export function BugsGrid({ fetch }: BugsGridProps) {

    const data = useQuery(fetch, {
        select: {
            id: Bug.Id,
            state: Workflow.WorkflowState,
            customer: Customer.CustomerName,
            coder: CoderAssigned.FullName,
        },
        allowDuplicates: true,
        comment: "allbugs"
    });

    return (
        <FlowerBIChartBox title={"All Quality Assesments"} state={data.state}>
            <FlowerBITable
                data={data}
                columns={{
                    ID: (d) => `${d.values.id}`,
                    QualityMetric: (d) => d.values.state ?? "",
                    Project: (d) => d.values.customer ?? "",
                    Notes: (d) => d.values.coder ?? "",
                }} 
            />
        </FlowerBIChartBox>
    );
}
