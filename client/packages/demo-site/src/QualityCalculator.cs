 public class QualityCalculator
{
    private ProjectData projectData;

    public QualityCalculator(ProjectData data)
    {
        projectData = data;
    }

    private double CalculateFunctionalityMetric()
    {
        // Логіка розрахунку функціональності на основі реальних даних
        double functionalityScore = (double)projectData.SuccessfullyImplementedFeatures / projectData.TotalFeatures;

        return functionalityScore;
    }

    private double CalculateReliabilityMetric()
    {
        // Логіка розрахунку надійності на основі реальних даних
        double reliabilityScore = 1 - ((double)projectData.CriticalBugs / projectData.TotalTests);

        return reliabilityScore;
    }

    private double CalculateEfficiencyMetric()
    {
        // Логіка розрахунку ефективності на основі реальних даних
        double efficiencyScore = 1 - (projectData.AverageResponseTime / projectData.MaxResponseTime);

        return efficiencyScore;
    }

    private double CalculateUsabilityMetric()
    {
        // Логіка розрахунку зручності використання на основі реальних даних
        double usabilityScore = (double)projectData.UsersWithoutAssistance / projectData.TotalUsers;

        return usabilityScore;
    }

    public double CalculateOverallQuality()
    {
        double functionalityWeight = 0.4;
        double reliabilityWeight = 0.2;
        double efficiencyWeight = 0.2;
        double usabilityWeight = 0.2;

        double overallQuality =
            functionalityWeight * CalculateFunctionalityMetric() +
            reliabilityWeight * CalculateReliabilityMetric() +
            efficiencyWeight * CalculateEfficiencyMetric() +
            usabilityWeight * CalculateUsabilityMetric();

        return overallQuality;
    }
}

public class ProjectData
{
    public int TotalFeatures { get; set; }
    public int SuccessfullyImplementedFeatures { get; set; }
    public int TotalTests { get; set; }
    public int CriticalBugs { get; set; }
    public double MaxResponseTime { get; set; }
    public double AverageResponseTime { get; set; }
    public int TotalUsers { get; set; }
    public int UsersWithoutAssistance { get; set; }
}
