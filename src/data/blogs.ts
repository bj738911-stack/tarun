import { BlogPost, Coupon } from '../types';

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: "The Modern Gentleman's Guide to Shirt Collars",
    slug: 'modern-gentlemans-guide-to-shirt-collars',
    excerpt: 'Spread, cutaway, button-down, or band collar? Here is how to pair each collar style with your face shape, tie knots, and occasions.',
    author: 'Julian Vance, Head of Tailoring',
    date: 'September 12, 2026',
    readTime: '6 min read',
    category: 'Style & Tailoring',
    image: 'https://images.unsplash.com/photo-1620012253295-c15c429fbb41?auto=format&fit=crop&w=900&q=80',
    tags: ['Collar Guide', 'Formal Wear', 'Tailoring'],
    content: [
      'A shirt collar does more than hold a necktie; it frames your face, sets the visual tone of your entire outfit, and anchors your proportions.',
      '1. The Cutaway Spread Collar: Designed with points angled broadly toward the shoulders. Best for wider Windsor knots and square or oval face shapes. It projects modern executive confidence.',
      '2. The Classic Button-Down: Born on the polo fields of 1896, this collar features buttons securing points to the shirt body. Perfect for Oxford cloth, smart-casual blazers, and untucked weekend wear.',
      '3. The Band / Mandarin Collar: Clean, minimalist, and tie-free. Ideal with pure linen or crisp cotton poplin for summer gallery openings, vacations, and relaxed dinners.',
      'Choosing the right collar transforms an ordinary shirt into a bespoke statement.'
    ]
  },
  {
    id: 'blog-2',
    title: 'Fabric Breakdown: Oxford, Poplin, Twill, and Linen',
    slug: 'fabric-breakdown-oxford-poplin-twill-linen',
    excerpt: 'Understand fabric weaves, thread counts, and breathability to choose the right shirt for every season and lifestyle.',
    author: 'Ethan Brooks, Materials Specialist',
    date: 'August 28, 2026',
    readTime: '5 min read',
    category: 'Fabric Science',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
    tags: ['Fabrics', 'Cotton', 'Linen', 'Quality'],
    content: [
      'The tactile feel and durability of a shirt come down to the weave structure and staple length of the yarn.',
      'Oxford Cloth: Woven in a basket-weave structure combining two warp yarns with one heavier weft yarn. Durable, textured, and becomes softer with every wash.',
      'Poplin: A balanced plain weave that is smooth, lightweight, and crisp. The default choice for sharp business formalwear.',
      'Linen: Spun from flax fibers, linen is hollow-cored, allowing heat and moisture to vent effortlessly. Its natural slub texture embodies Mediterranean effortless luxury.',
      'At ATTRXNWEAR, every weave is pre-washed and combed to eliminate shrinkage and maximize longevity.'
    ]
  },
  {
    id: 'blog-3',
    title: 'Generational Style: How to Dress Sharper in Your 20s, 30s, and 40s+',
    slug: 'generational-style-guide-mens-shirts',
    excerpt: 'From trend-forward relaxed fits to refined timeless classics, here is how modern men evolve their wardrobe across each decade.',
    author: 'Marcus Cole, Creative Director',
    date: 'August 15, 2026',
    readTime: '7 min read',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
    tags: ['Generations', 'Style Guide', 'Wardrobe'],
    content: [
      'Menswear is not one-size-fits-all, nor should it be confined to rigid generational stereotypes. At ATTRXNWEAR, we believe in style that grows with you.',
      'In your 20s: Experiment with bold botanical prints, camp collars, raw denim overshirts, and relaxed proportions. Pair expressive shirts with vintage sneakers.',
      'In your 30s: Focus on versatility. Transition effortlessly from morning video calls to evening client dinners with fine tattersall checks, smart casual micro-dobby shirts, and tailored linen.',
      'In your 40s and beyond: Prioritize supreme tactile comfort and unmatched fabric pedigree. Luxurious two-ply Egyptian cottons, brushed flannel, and classic regular fits that offer breathability and dignified sophistication.'
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'FIRST10',
    discountPercent: 10,
    minOrderValue: 999,
    description: '10% off on your first ATTRXNWEAR order (Min. ₹999)',
    isActive: true,
    expiryDate: '2026-12-31'
  },
  {
    code: 'ATTRXN20',
    discountPercent: 20,
    minOrderValue: 1499,
    description: '20% off on orders above ₹1,499',
    isActive: true,
    expiryDate: '2026-11-30'
  },
  {
    code: 'FESTIVE30',
    discountPercent: 30,
    minOrderValue: 2499,
    description: '30% exclusive discount on orders above ₹2,499',
    isActive: true,
    expiryDate: '2026-10-15'
  }
];
