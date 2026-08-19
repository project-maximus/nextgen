import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ProgramsCatalog } from "./ProgramsCatalog";

export const metadata: Metadata = pageMetadata({
  title: "Certification Programs",
  description:
    "11 AMCA-accredited healthcare certification programs at NextGen Health Institute — clinical, administrative, and specialized training in Dallas–Fort Worth, 2 to 24 weeks.",
  path: "/programs",
});

export default function ProgramsPage() {
  return <ProgramsCatalog />;
}
