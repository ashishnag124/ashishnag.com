import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    order: z.number().int().positive(),
    problem: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    live: z.url(),
    // "coming-soon" renders a placeholder instead of a dead link until the URL resolves.
    liveStatus: z.enum(['live', 'coming-soon']),
    code: z.url().optional(),
    // The first screenshot is the card thumbnail; the case study shows them all.
    screenshots: z
      .array(z.object({ src: image(), alt: z.string(), frame: z.enum(['phone', 'desktop']) }))
      .optional(),
  }),
});

export const collections = { projects };
