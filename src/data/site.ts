// Site-wide copy and links. Edit freely.

export const site = {
  name: 'Jameel Belza',
  brand: 'JED CREATIVES',
  role: 'Multimedia Artist',
  location: 'Vietnam',
  cv: 'cv/BELZA-CV-PORT-FULL_2.pdf',
  cvFileName: 'BELZA-CV-PORT FULL_2.pdf',
};

export const heroTags = ['3D Motion GFX', 'Video Editing', 'Graphic Design', 'Visual FX'];

export const about = {
  lead: 'My name is Jameel Belza, a Filipino student currently studying and freelancing in Vietnam.',
  body: 'I’ve worked with publications, organizations, producer teams and business collaborations — pairing design with scripting and storytelling to make visuals that move people.',
  facts: [
    { label: 'Est.', value: '2023' },
    { label: 'Studying at', value: 'Thai Nguyen University of Technology' },
  ],
};

// Tools floating around the About photo. `icon` matches a file in src/assets/tools/.
// Hover/click shows: name, `tagline`, `description` and the `uses` tags.
export const tools = [
  {
    icon: 'photoshop',
    name: 'Adobe Photoshop',
    tagline: 'Pubmats, posters & photo manipulation', // TODO: review copy
    description:
      'The main tool for publication materials — posters, pubmats and brand assets. Used for compositing, retouching, photo-manipulated ads and thumbnails for video work.', // TODO: review copy
    uses: ['Pubmats', 'Photo manipulation', 'Brand assets'],
  },
  {
    icon: 'premiere',
    name: 'Adobe Premiere Pro',
    tagline: 'Editing & storytelling', // TODO: review copy
    description:
      'Where every edit comes together: festival promos, school features like ISDAE and short-form social cuts — pacing, colour and sound before anything ships.', // TODO: review copy
    uses: ['Promos', 'Features', 'Short-form'],
  },
  {
    icon: 'after-effects',
    name: 'Adobe After Effects',
    tagline: 'Motion graphics & VFX', // TODO: review copy
    description:
      'Titles, animated icon systems and compositing — from the ISDAE motion package to the effects in the personal showreel and the 2D informative animations.', // TODO: review copy
    uses: ['Motion graphics', 'VFX', '2D animation'],
  },
  {
    icon: 'krita',
    name: 'Krita',
    tagline: 'Digital painting & 2D assets', // TODO: review copy
    description:
      'Drawing characters, props and backgrounds that are later animated in the 2D informative explainers.', // TODO: review copy — confirm how Krita is used
    uses: ['Illustration', 'Characters', 'Backgrounds'],
  },
  {
    icon: 'blender',
    name: 'Blender',
    tagline: '3D modeling, animation & rendering', // TODO: review copy
    description:
      "Builds the virtual news studios (Alerto 24, Lion's Update) and the 3D openers and title graphics for school productions like GNHS — rendered in Cycles.", // TODO: review copy
    uses: ['Virtual studios', '3D titles', 'Cycles renders'],
  },
] as const;

// Services & pricing (Services section). Prices are in Philippine pesos as on Jameel's pricing slides.
// `note` adds a second line under the service name.
export const pricing = {
  currency: 'PHP',
  rows: [
    { service: 'Graphic Design', basic: '₱900', pro: '₱1,400' },
    { service: 'Video Editing', note: 'Short form', basic: '₱1,700+', pro: '₱3,500+' },
    { service: 'Video Editing', note: 'Long form', basic: '₱3,000+', pro: '₱4,500+' },
    { service: 'Motion Graphics', basic: '₱4,000', pro: '₱6,000+' },
    { service: 'Logo Animation', basic: '₱3,700+', pro: '₱5,000+' },
    { service: '3D Graphics', basic: '₱6,000+', pro: '₱8,000' },
  ],
  tiers: {
    basic: {
      name: 'Basic',
      title: 'Budget Mode',
      points: ['Practical approach.', 'Simpler execution.', 'Efficient use of assets.', 'Less complex effects.'],
      bestFor: 'Best for clients who prioritize affordability.',
    },
    pro: {
      name: 'Creative',
      title: 'Full Creativity',
      points: [
        'Full creative direction.',
        'More experimentation.',
        'Advanced editing/design/animation.',
        'Stronger storytelling and visual identity.',
        'More freedom to explore ideas.',
      ],
      bestFor: 'Best for clients who prioritize quality + creative impact.',
    },
  },
};

const EMAIL = 'jameelbelza@gmail.com';

// Monthly packages (shown under the pricing table in Services).
export const packages = [
  {
    name: 'Basic',
    price: '₱12,000',
    period: '/month',
    features: [
      '8 short-form reels',
      '2 static pubmats',
      'Content calendar and posting schedule',
      'Caption writing and basic hashtags',
      'Publishing to 1 social media platform',
    ],
  },
  {
    name: 'Pro',
    price: '₱22,000',
    period: '/month',
    features: [
      '12 short-form reels',
      '4 static pubmats',
      'Monthly content calendar and content strategy',
      'Captions, hooks, and calls to action',
      'Publishing to 2 social media platforms, with adapted formatting',
      '1 revision round per content piece',
    ],
  },
  {
    name: 'Premium',
    price: '₱35,000',
    period: '/month',
    features: [
      '16 short-form reels',
      '8 static pubmats or carousel posts',
      'Monthly content strategy and campaign concepts',
      'Advanced creative direction, hooks, captions, and CTAs',
      'Publishing to 3 social media platforms, with adapted formatting',
    ],
  },
];

export const contact = {
  email: EMAIL,
  phone: '+83 936 991 794',
  phoneHref: 'tel:+83936991794', // keep in sync with `phone` (digits only, with the +)
  // Contact form ("Email me"). Delivered by FormSubmit (free, no account) straight to EMAIL.
  // One-time setup: the FIRST message sent from the live site triggers an "Activate form" email to that
  // inbox — click it once and every message after that is delivered. Send one test before launch.
  // Optional: after activation FormSubmit gives a random alias (e.g. https://formsubmit.co/abc123…) that
  // hides the address from the page source — paste it here. A Formspree endpoint
  // (https://formspree.io/f/xxxx) works here too.
  formAction: `https://formsubmit.co/${EMAIL}`,
};

export const socials = [
  { label: 'Facebook', handle: 'Ja Meel', href: 'https://www.facebook.com/ja.meel.451329' },
  { label: 'Instagram', handle: '@jhmeooo_', href: 'https://www.instagram.com/jhmeooo_' },
  { label: 'LinkedIn', handle: 'Jameel Belza', href: 'https://www.linkedin.com/in/jameel-belza-7bb852396/' },
];
