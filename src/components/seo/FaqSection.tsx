import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({
  title = "Frequently asked questions",
  items,
}: {
  title?: string;
  items: FaqItem[];
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
        <Accordion className="mt-4" collapsible type="single">
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
