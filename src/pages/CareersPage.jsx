import LegalPage from './LegalPage';

export default function CareersPage() {
  return (
    <LegalPage eyebrow="Join us" title="Careers at Pareshey Organic">
      <p>We’re a small, growing team building one of Pakistan’s most-loved clean beauty brands. If you care about ingredients, customers and craft — we’d love to hear from you.</p>

      <h2 className="text-xl font-medium mt-8 mb-2">Open roles</h2>
      <div className="space-y-4 not-prose">
        <div className="border border-neutral-200 rounded-xl p-5">
          <div className="text-base font-medium">Customer Care Associate</div>
          <div className="text-sm text-neutral-500 mt-1">Lahore · Full-time · On-site</div>
          <p className="text-sm text-neutral-700 mt-2">Be the voice of Pareshey Organic. Respond to customer queries on email, WhatsApp and Instagram. Routine and ingredient knowledge a plus.</p>
        </div>
        <div className="border border-neutral-200 rounded-xl p-5">
          <div className="text-base font-medium">Production Lead</div>
          <div className="text-sm text-neutral-500 mt-1">Lahore · Full-time · On-site</div>
          <p className="text-sm text-neutral-700 mt-2">Own the small-batch production line. Coordinate with formulation, QC and packaging. Bachelor’s degree in chemistry / pharmacy / food science preferred.</p>
        </div>
        <div className="border border-neutral-200 rounded-xl p-5">
          <div className="text-base font-medium">Content & Social</div>
          <div className="text-sm text-neutral-500 mt-1">Lahore or Remote (Pakistan) · Full-time</div>
          <p className="text-sm text-neutral-700 mt-2">Bring our story to life on Instagram, TikTok and the blog. Strong writing in English and Urdu required; basic photo/video editing a plus.</p>
        </div>
      </div>

      <h2 className="text-xl font-medium mt-8 mb-2">How to apply</h2>
      <p>Email a one-page CV and a short note to <a href="mailto:paresheyorganics@gmail.com" className="underline">paresheyorganics@gmail.com</a> with the role in the subject line. We read every email — replies usually within a week.</p>
    </LegalPage>
  );
}
