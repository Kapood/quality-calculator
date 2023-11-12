import React, { useState } from "react";
import "./App.css";
import { BugReporting } from "./Reports/BugReporting";
import { VisualProps } from "./Reports/VisualProps";
import { usePageFilters } from "flowerbi-react";
import { useFilterPane, FilterPane } from "./FilterPane";
import {Chart, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Legend, LineController} from "chart.js";
import { localFetch } from "./localFetch";
import { BugsGrid } from "./Reports/BugsGrid";

Chart.registry.add(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Legend, LineController);

Chart.defaults.font.family = "Segoe UI, 'Helvetica', 'Arial', sans-serif";
if (Chart.defaults.plugins.legend && Chart.defaults.plugins.legend.labels) {
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
}

Chart.defaults.maintainAspectRatio = false;

const reports = {
    "Project Dashboard": (f: VisualProps) => <BugReporting {...f} />,    
    "Quality Assessment": (f: VisualProps) => <BugsGrid {...f} />,    
}

type ReportName = keyof typeof reports;

const reportNames = Object.keys(reports) as ReportName[];

const defaultReport: ReportName = "Project Dashboard";

function App() {
    const [reportName, setReportName] = useState(defaultReport);
    const pageFilters = usePageFilters();
    const filterPane = useFilterPane(pageFilters);

    const report = reports[reportName];

    return (
        <div className="reports-site">
            <div className="list">
                {
                    reportNames.map(n => (
                        <div key={n}
                            className={`item ${n === reportName && "selected"}`}
                            onClick={() => setReportName(n)}>{n}</div>
                    ))
                }
            </div>
            <div className="content">
                <div className="title-bar">
                    <div className="title">{filterPane.title}</div>
                    <div className="filters-button" onClick={filterPane.toggle}>Filters</div>
                </div>
                <div className="report-with-filters">
                    <div className="report-itself" onClick={pageFilters.clearInteraction}>
                        {report({ fetch: localFetch, pageFilters })}
                    </div>
                    <FilterPane filterPane={filterPane} />
                </div>
            </div>
        </div>
    );
}

export default App;
