import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";
import type { PoojaTiming } from "@shared/schema";

const defaultAartiTimings: PoojaTiming[] = [
  { id: "1", nameEn: "Morning (Mangla)", nameHi: "प्रातःकाल (मंगला)", timingKartik: "6:15", timingMaha: "6:00", timingVaishakh: "5:45", timingBhadra: "6:00", category: "aarti", order: 1 },
  { id: "2", nameEn: "Evening (Sandhya)", nameHi: "सायंकाल (सांध्य)", timingKartik: "6:15", timingMaha: "6:45", timingVaishakh: "7:15", timingBhadra: "6:45", category: "aarti", order: 2 },
  { id: "3", nameEn: "Night (Shayan)", nameHi: "रात्रि (शयन)", timingKartik: "9:15", timingMaha: "9:15", timingVaishakh: "9:15", timingBhadra: "9:15", category: "aarti", order: 3 },
];

const defaultDarshanTimings: PoojaTiming[] = [
  { id: "4", nameEn: "Morning to Afternoon", nameHi: "सुबह से दोपहर", timingKartik: "6:15 - 1:30", timingMaha: "6:00 - 1:30", timingVaishakh: "5:45 - 1:30", timingBhadra: "6:00 - 1:30", category: "darshan", order: 1 },
  { id: "5", nameEn: "Afternoon to Night", nameHi: "दोपहर से रात", timingKartik: "2:30 - 9:15", timingMaha: "2:30 - 9:15", timingVaishakh: "2:30 - 9:15", timingBhadra: "2:30 - 9:15", category: "darshan", order: 2 },
];

const seasons = [
  { keyEn: "Kartik - Margshir - Posh", keyHi: "कार्तिक - मार्गशीर - पोष", field: "timingKartik" },
  { keyEn: "Maha - Falgun - Chaitra", keyHi: "महा - फाल्गुन - चैत्र", field: "timingMaha" },
  { keyEn: "Vaishakh - Jyeshth - Ashadh - Shravan", keyHi: "वैशाख - ज्येष्ठ - आषाढ़ - श्रावण", field: "timingVaishakh" },
  { keyEn: "Bhadra - Ashwin", keyHi: "भाद्रपद - आश्विन", field: "timingBhadra" },
];

export function PoojaTimings() {
  const { t } = useLanguage();

  const { data: timings, isLoading } = useQuery<PoojaTiming[]>({
    queryKey: ["/api/pooja-timings"],
  });

  const displayTimings = timings && timings.length > 0 ? timings : [...defaultAartiTimings, ...defaultDarshanTimings];
  const aartiTimings = displayTimings.filter((timing) => timing.category === "aarti");
  const darshanTimings = displayTimings.filter((timing) => timing.category === "darshan");

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-accent/30" data-testid="pooja-timings-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Clock className="w-6 h-6" />
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("Aarti & Darshan Timings", "आरती और दर्शन समय")}
            </h2>
          </div>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="space-y-8">
          <Card className="overflow-hidden border-t-4 border-t-primary">
            <div className="bg-primary/10 px-4 py-3">
              <h3 className="text-xl font-semibold text-primary">
                {t("Aarti Timings", "आरती समय")}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="table-aarti-timings">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      {t("Aarti", "आरती")}
                    </th>
                    {seasons.map((season) => (
                      <th key={season.field} className="px-4 py-3 text-center font-semibold text-foreground text-sm">
                        {t(season.keyEn, season.keyHi)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {aartiTimings.map((timing, index) => (
                    <tr key={timing.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {t(timing.nameEn, timing.nameHi)}
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{timing.timingKartik}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{timing.timingMaha}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{timing.timingVaishakh}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{timing.timingBhadra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="overflow-hidden border-t-4 border-t-primary">
            <div className="bg-primary/10 px-4 py-3">
              <h3 className="text-xl font-semibold text-primary">
                {t("Darshan Timings", "दर्शन समय")}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="table-darshan-timings">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      {t("Darshan", "दर्शन")}
                    </th>
                    {seasons.map((season) => (
                      <th key={season.field} className="px-4 py-3 text-center font-semibold text-foreground text-sm">
                        {t(season.keyEn, season.keyHi)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {darshanTimings.map((timing, index) => (
                    <tr key={timing.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {t(timing.nameEn, timing.nameHi)}
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{timing.timingKartik}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{timing.timingMaha}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{timing.timingVaishakh}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{timing.timingBhadra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-primary/5 text-center text-sm text-primary font-medium">
              {t(
                "Shri Umiya Mataji rest time: 1:30 PM to 2:30 PM",
                "श्री उमिया माताजी विश्राम समय: दोपहर 1:30 से 2:30 बजे"
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
