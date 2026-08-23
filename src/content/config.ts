import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const skills = defineCollection({
  loader: glob({ pattern: 'pmo-*.md' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

export const collections = { skills };
