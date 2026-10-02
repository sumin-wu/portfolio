export type Facet = {
  id: number
  title: string
  role: string
  /** Optional short one-liner shown just under the title. */
  tagline?: string
  description: string
  /** Optional long-form story, revealed by a "Read more" toggle in the panel. */
  longDescription?: string
  /** Single image. Ignored when `images` is provided. */
  imageUrl?: string
  /** Multiple images render as a slideshow inside the panel. */
  images?: string[]
  linkUrl?: string
  linkLabel?: string
}

// One object per window (grid order, left-to-right, top-to-bottom).
// Swap this content freely — the panel UI reads only these fields.
//
// PLACEHOLDER CONVENTION: wherever a real asset isn't in yet, the field is
// left commented out with a `TODO` marker. Fill in the URL and uncomment the
// line to make it appear — no UI changes required.
export const FACETS: Facet[] = [
  {
    id: 0,
    title: 'Rock Climber',
    role: 'Hobby',
    description: 'Finding focus on the wall.',
    images: [
      '/climbing/climb-1.jpeg',
      '/climbing/climb-2.jpeg',
      '/climbing/climb-3.jpeg',
    ],
  },
  {
    id: 1,
    title: 'PM Intern, eBay Live',
    role: 'Work',
    description:
      'Shaped the host console and Stream Manager experience for eBay Live, including AI-enabled features that help sellers run their live shopping streams.',
    images: ['/ebay/ebay-1.jpeg', '/ebay/ebay-2.jpeg'],
    // TODO: add a link (case study, press, or eBay Live), then uncomment.
    // linkUrl: 'PLACEHOLDER_URL',
    // linkLabel: 'See eBay Live',
  },
  {
    id: 2,
    title: 'PM & Co-Founder, Hemut',
    role: 'Startup · YC X25',
    tagline: 'AI Voice Agents for Trucking',
    description:
      'Led development of CRM and multilingual AI voice agents for truck dispatching.',
    images: ['/hemut/hemut-cover.jpeg'],
    linkUrl: 'https://hemut.com',
    linkLabel: 'Visit Hemut',
  },
  {
    id: 3,
    title: 'AI National Policy for Greece',
    role: 'Publication',
    description:
      'Contributed to national-level policy work on artificial intelligence in Greece.',
    images: ['/greece/greece-1.jpeg'],
    linkUrl:
      'https://foresight.gov.gr/en/studies/A-Blueprint-for-Greece-s-AI-Transformation',
    linkLabel: 'Read the blueprint',
  },
  {
    id: 4,
    title: 'USC Entryway Optimization Project',
    role: 'Case Study',
    description:
      'A project optimizing pedestrian flow and access at a busy USC campus entryway.',
    longDescription:
      'ID queuing systems have become a common form of identity validation for businesses, small and large. Different in their own ways, the organization of these queuing systems gives way to various advantages and disadvantages for the audience they serve. USC’s recent developments, following their priority to increase institutional safety, have included the implementation of these ID queuing systems spread across campus entry points. The Pardee Way security checkpoint is particularly interesting because of the unique physical constraints it is subjected to—that being the narrow arches—which limit the options to optimize its layout. In this paper, we will explore how to simulate Pardee Way in an accurate manner as well as methods to optimize its operational processes.',
    images: ['/usc/usc-1.jpeg'],
    linkUrl: '/usc/pardee-way-report.pdf',
    linkLabel: 'Read the full paper',
    // linkUrl: 'PLACEHOLDER_PDF_URL',
    // linkLabel: 'Read the case study',
  },
  {
    id: 5,
    title: 'AI Marketing Intern, Verizon',
    role: 'Work',
    // TODO: replace with a 1–2 sentence teaser about the Verizon internship.
    description:
      'PLACEHOLDER — add a one to two sentence description of your work at Verizon.',
    // TODO: add a link if there is one, then uncomment.
    // linkUrl: 'PLACEHOLDER_URL',
    // linkLabel: 'Learn more',
  },
  {
    id: 6,
    title: 'Substack Writer',
    role: 'Writing',
    description: 'Essays and notes, published on Substack.',
    images: ['/substack/substack-1.jpeg'],
    linkUrl:
      'https://substack.com/@suminwu?r=2q967b&utm_medium=ios&utm_source=profile&shareImageVariant=blur',
    linkLabel: 'Read on Substack',
  },
  {
    id: 7,
    title: 'Founder, RetroPod',
    role: 'Startup · Stealth',
    description:
      'A distraction-minimizing retro phone concept designed for Gen Z.',
    // TODO: add a link if/when it is public, then uncomment.
    // linkUrl: 'PLACEHOLDER_URL',
    // linkLabel: 'Learn more',
  },
  {
    id: 8,
    title: 'Founder & PM, Pillar',
    role: 'Startup',
    description:
      'PM & Co-Founder of Pillar, a cost estimation co-pilot for construction.',
    longDescription:
      'After 8 weeks, 100+ user interviews, and multiple pivots, my team at USC’s premier startup incubator, LavaLab, started building in construction. Why? According to a 2024 McKinsey study, construction productivity hasn’t seen growth in decades. In fact, it has been declining in the US. We grew curious and took this opportunity to dive deeper into the industry. Currently, project managers and cost estimators spend upwards of weeks manually tracing blueprints and calculating costs of projects using static pricing data. This time consuming and error prone process often results in cost overruns, costing general contractors anywhere from thousands to millions of dollars. That’s why we built Pillar: a customized AI copilot for pre-construction. From blueprint extraction to retrieving real time pricing, our platform reshapes traditional cost estimation workflows, giving teams more time, accuracy, and savings. As a product manager, I went from zero expertise in construction to demoing Pillar to some of the country’s largest general contractors. In December, I had the opportunity to pitch our product to 300+ attendees, alongside my cofounders Tiffanie Lim, Wesley Chou, and Joshua Placido. This journey has been incredibly challenging and rewarding, teaching me how to leverage AI to disrupt existing systems.',
    images: ['/pillar/pillar-1.jpeg', '/pillar/pillar-2.jpeg', '/pillar/pillar-3.jpeg'],
    // TODO: add the LinkedIn URL, then uncomment to show the button.
    // linkUrl: 'PLACEHOLDER_LINKEDIN_URL',
    // linkLabel: 'View on LinkedIn',
  },
  {
    id: 9,
    title: 'DJ',
    role: 'Music',
    description: 'Finalist at Your Shot LA.',
    images: ['/dj/dj-1.jpeg'],
    // TODO: add a set/mix link (SoundCloud, Instagram, etc.), then uncomment.
    // linkUrl: 'PLACEHOLDER_URL',
    // linkLabel: 'Hear a set',
  },
]
