"use client";

import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Sheet } from "@/components/ui/Sheet";
import { Skeleton } from "@/components/ui/Skeleton";
import { Table } from "@/components/ui/Table";
import { Tabs } from "@/components/ui/Tabs";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { CountUp } from "@/components/motion/CountUp";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { SearchX } from "lucide-react";
import { useState } from "react";

const buttonVariants = ["primary", "secondary", "ghost", "link", "danger"] as const;
const buttonSizes = ["sm", "md", "lg"] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-neutral-100 py-10 first:border-t-0 first:pt-0">
      <h2 className="mb-6 text-h2 font-display text-neutral-900">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 lg:px-10">
      <h1 className="mb-2 text-display-lg font-display text-neutral-900">Style Guide</h1>
      <p className="mb-10 max-w-prose text-body-lg text-neutral-600">
        Every ui/ component in every documented variant and state, for visual review.
      </p>

      <Section title="Typography">
        <div className="flex flex-col gap-3">
          <p className="text-display-xl font-display">Display XL / Fraunces 600</p>
          <p className="text-display-lg font-display">Display LG / Fraunces 600</p>
          <p className="text-h2 font-display">Heading 2</p>
          <p className="text-h3 font-display">Heading 3</p>
          <p className="text-h4 font-display">Heading 4</p>
          <p className="text-body-lg">Body large — lead paragraph copy at 1.125rem.</p>
          <p className="text-body">Body — default paragraph copy at 1rem.</p>
          <p className="text-body-sm text-neutral-500">Body small — meta and captions.</p>
          <p className="text-eyebrow uppercase text-primary-600">Eyebrow label</p>
          <p className="text-stat font-display text-primary-700">95%</p>
        </div>
      </Section>

      <Section title="Color tokens">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-10">
          {["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map((shade) => (
            <div key={shade} className="flex flex-col gap-1">
              <div className={`h-14 rounded-md bg-primary-${shade}`} />
              <span className="text-xs text-neutral-500">primary-{shade}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-col gap-4">
          {buttonVariants.map((variant) => (
            <div key={variant} className="flex flex-wrap items-center gap-3">
              <span className="w-24 text-body-sm text-neutral-500">{variant}</span>
              {buttonSizes.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  Button {size}
                </Button>
              ))}
              <Button variant={variant} loading>
                Loading
              </Button>
              <Button variant={variant} disabled>
                Disabled
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-3">
          {(["solid", "soft", "outline"] as const).map((variant) =>
            (["primary", "accent", "success", "warning", "neutral"] as const).map((tone) => (
              <Badge key={`${variant}-${tone}`} variant={variant} tone={tone}>
                {variant} {tone}
              </Badge>
            )),
          )}
        </div>
      </Section>

      <Section title="Form fields">
        <div className="grid max-w-md gap-4">
          <Input placeholder="Default input" />
          <Input placeholder="Invalid input" invalid />
          <Input placeholder="Disabled input" disabled />
          <Select defaultValue="">
            <option value="" disabled>
              Select a program
            </option>
            <option value="ma">Medical Assistant</option>
          </Select>
          <Textarea placeholder="Message" />
          <Checkbox id="sg-consent" label="I consent to be contacted." />
        </div>
      </Section>

      <Section title="Card">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>Static card</Card>
          <Card hoverable>Hoverable card — lift + shadow on hover</Card>
        </div>
      </Section>

      <Section title="Accordion">
        <Accordion type="single" variant="bordered">
          <AccordionItem id="sg-acc-1" question="What is single-open bordered?">
            Only one panel can be open at a time, with a visible border.
          </AccordionItem>
          <AccordionItem id="sg-acc-2" question="Second question">
            Opening this closes the first panel.
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title="Tabs (resize below 640px to see the accordion fallback)">
        <Tabs
          aria-label="Styleguide example tabs"
          items={[
            { id: "one", label: "Overview", content: <p>Overview tab content.</p> },
            { id: "two", label: "Curriculum", content: <p>Curriculum tab content.</p> },
          ]}
        />
      </Section>

      <Section title="Modal & Sheet">
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
          <Button variant="secondary" onClick={() => setSheetOpen(true)}>
            Open sheet
          </Button>
        </div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Example modal">
          <p className="text-body-sm text-neutral-600">Centered dialog, focus-trapped, Escape closes.</p>
        </Modal>
        <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Example sheet">
          <p className="text-body-sm text-neutral-600">Bottom sheet on mobile, centered on desktop.</p>
        </Sheet>
      </Section>

      <Section title="Toast">
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => showToast("success", "Your request was submitted.")}>
            Trigger success toast
          </Button>
          <Button variant="secondary" onClick={() => showToast("error", "Something went wrong.")}>
            Trigger error toast
          </Button>
        </div>
      </Section>

      <Section title="Skeleton & EmptyState">
        <div className="mb-6 flex gap-3">
          <Skeleton className="h-24 w-24" />
          <Skeleton className="h-4 w-48" />
        </div>
        <EmptyState icon={SearchX} title="No programs match your filters" description="Try clearing a filter." />
      </Section>

      <Section title="Breadcrumbs">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Programs", href: "/programs" },
            { label: "Medical Assistant" },
          ]}
        />
      </Section>

      <Section title="Table (resize below 640px to see the stacked-card fallback)">
        <Table
          getRowKey={(r) => r.id}
          columns={[
            { key: "date", header: "Start date", render: (r) => r.date },
            { key: "program", header: "Program", render: (r) => r.program },
          ]}
          rows={[
            { id: "1", date: "Aug 3, 2026", program: "Medical Assistant" },
            { id: "2", date: "Aug 10, 2026", program: "Phlebotomy Technician" },
          ]}
        />
      </Section>

      <Section title="Motion: Reveal, CountUp, Marquee">
        <Reveal>
          <p className="text-body text-neutral-600">
            This paragraph fades up into view once per page load (scroll to re-trigger on a fresh visit).
          </p>
        </Reveal>
        <p className="mt-6 text-stat font-display text-primary-700">
          <CountUp value={95} suffix="%" />
        </p>
        <div className="mt-6">
          <Marquee ariaLabel="Styleguide marquee example">
            {["Item A", "Item B", "Item C", "Item D"].map((item) => (
              <span key={item} className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-body-sm">
                {item}
              </span>
            ))}
          </Marquee>
        </div>
      </Section>
    </div>
  );
}
