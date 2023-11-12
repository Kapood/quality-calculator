import moment from "moment";

async function allocDb() {
    const publicUrl = (window as any).sitePublicUrl;

    const SQL = await window.initSqlJs({
        locateFile(f: string) {
            return `${publicUrl}/${f}`;
        }
    });

    const db = new SQL.Database();
    setupDb(db);
    return db;
}

let db: ReturnType<typeof allocDb> | undefined;

type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

export type Database = NonNullable<Await<typeof db>>;

export function getDb(): Promise<Database> {
    if (!db) {
        db = allocDb();
    }
    return db;
}

function makeRandomDate() {
    const d = new Date(2023, 0, 1);
    d.setDate(d.getDate() + Math.floor(Math.random() * 800));
    return d;
}

function formatDate(d: Date) {
    return moment(d).format("YYYY-MM-DD");
}

function startOfQuarter(d: Date) {
    const m = Math.floor(d.getMonth() / 3) * 3;
    return formatDate(new Date(d.getFullYear(), m, 1));
}

function startOfMonth(d: Date) {    
    return formatDate(new Date(d.getFullYear(), d.getMonth(), 1));
}

function pick(count: number, base: number) {
     return Math.min(count - 1, Math.floor(Math.random() * count)) + base;     
}

function setupDb(db: Database) {

    const workflowStates = [
        "Functionality",
        "Reliability",
        "Efficiency",
        "Usability",
        "Stability"
    ];

    const sourcesOfError = [
        "Test Coverage",
        "Test Success",
        "Errors Tracker"
    ];

    const dates: Date[] = [];
    for (let n = 0; n < 50; n++) {
        dates.push(makeRandomDate());
    }

    const dateRows = dates.map(x => `
        ('${formatDate(x)}', ${x.getFullYear()}, '${startOfQuarter(x)}', '${startOfMonth(x)}')`).join(",");

    const workflows: string[] = [];

    for (const workflowState of workflowStates) {
        for (const sourceOfError of sourcesOfError) {
            for (const resolved of [0, 1]) {
                for (const fixedByCustomer of [0, 1]) {
                    workflows.push(`
                        (${workflows.length + 1}, ${resolved}, '${workflowState}', '${sourceOfError}', ${fixedByCustomer})`);
                }
            }
        }
    }

    const workflowRows = workflows.join(",");

    const categoryCombinations: string[] = [];

    for (const a of [0, 1]) {
        for (const b of [0, 1]) {
            for (const c of [0, 1]) {
                for (const d of [0, 1]) {
                    for (const e of [0, 1]) {
                        for (const f of [0, 1]) {
                            categoryCombinations.push(`
                                (${categoryCombinations.length}, ${a}, ${b}, ${c}, ${d}, ${e}, ${f})`);
                        }
                    }
                }
            }
        }
    }

    const categoryCombinationsRows = categoryCombinations.join(",");

    const bugs: string[] = [];

    for (var n = 0; n < 100; n++) {
        const workflow = pick(workflows.length, 1);
        const customer = pick(6, 1);
        const reported = formatDate(dates[pick(dates.length, 0)]);
        const resolved = formatDate(dates[pick(dates.length, 0)]);
        const assigned = formatDate(dates[pick(dates.length, 0)]);
        const catComb = pick(categoryCombinations.length, 1);
        const coderAssigned = pick(6, 1);
        const coderResolved = pick(6, 1);

        bugs.push(`
            (${n + 1}, ${workflow}, ${customer}, '${reported}', '${resolved}', '${assigned}', ${catComb}, ${coderAssigned}, ${coderResolved})`);
    }

    const bugRows = bugs.join(",");

    const initSql = `
        create table \`main\`.\`Date\` (
            Id date,
            CalendarYearNumber smallint,
            FirstDayOfQuarter date,
            FirstDayOfMonth date
        );

        insert into \`main\`.\`Date\` values ${dateRows};

        create table \`main\`.\`Workflow\` (
            Id int,
            Resolved bit,
            WorkflowState varchar(30),
            SourceOfError varchar(30),
            FixedByCustomer bit
        );

        insert into \`main\`.\`Workflow\` values ${workflowRows};

        create table \`main\`.\`Category\` (
            Id int,
            Label varchar(30)
        );

        insert into \`main\`.\`Category\` values
            (1, 'Design'),
            (2, 'Accessibility'),
            (3, 'Consistency'),
            (4, 'Performance'),
            (5, 'Adaptability'),
            (6, 'Brand Alignment');

        create table \`main\`.\`Coder\` (
            Id int,
            FullName varchar(30)
        );
    
        insert into \`main\`.\`Coder\` values
                (1, 'Trends and Patterns'),
                (2, 'Recommendations'),
                (3, 'Opportunities'),
                (4, 'Key Findings'),
                (5, 'Action Items'),
                (6, 'Future Considerations');

        create table \`main\`.\`Customer\` (
            Id int,
            CustomerName varchar(30)
        );
    
        insert into \`main\`.\`Customer\` values
                (1, 'Project_1 LLC'),
                (2, 'Project_2, Inc.'),
                (3, 'Project_3'),
                (4, 'Project_4'),
                (5, 'Project_5'),
                (6, 'Project_6');

        create table \`main\`.\`CategoryCombination\` (
            Id int,
            Design bit,
            Accessibility bit,
            Consistency bit,
            Performance bit,
            Adaptability bit,
            Brand Alignmen bit
        );

        insert into \`main\`.\`CategoryCombination\` values ${categoryCombinationsRows};

        create table \`main\`.\`Bug\` (
            Id int,
            WorkflowId int,
            CustomerId int,
            ReportedDate date,
            ResolvedDate date,
            AssignedDate date,
            CategoryCombinationId int,
            AssignedCoderId int,
            ResolvedCoderId int
        );

        insert into \`main\`.\`Bug\` values ${bugRows};
    `;

    db.run(initSql);
}
