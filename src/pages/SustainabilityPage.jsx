import LegalPage from './LegalPage';

export default function SustainabilityPage() {
  return (
    <LegalPage eyebrow="Our commitments" title="Sustainability">
      <p>Pareshey Organic exists to bring honest, plant-based skincare back to the everyday. Sustainability isn’t a sticker on our packaging — it’s baked into the way we source, formulate, package and ship.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">Ingredients</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Direct relationships with small farms across Pakistan and India — fair price guarantees, no middlemen.</li>
        <li>Cold-pressed, single-origin oils. No solvents, no industrial extraction.</li>
        <li>Plant actives only — never animal-derived.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-2">Packaging</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Recyclable glass and aluminium containers wherever possible.</li>
        <li>Soy-based inks on FSC-certified paperboard cartons.</li>
        <li>Refill pouches launching late 2026 for our top three formulations.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-2">Manufacturing</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Small-batch production — what you receive is fresh, not warehoused.</li>
        <li>Solar-supported lab in Lahore — 60% of our power on sunny days.</li>
        <li>Wastewater treated on-site.</li>
      </ul>

      <h2 className="text-xl font-medium mt-8 mb-2">Cruelty-free</h2>
      <p>Every batch is dermatologically reviewed by Pakistani-licensed dermatologists. No animal testing — ever, at any stage.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">Honesty</h2>
      <p>If we ever fall short of these commitments, we’ll say so on this page. Sustainability is a direction, not a destination — and we’d rather be honest about where we are than pretend.</p>
    </LegalPage>
  );
}
