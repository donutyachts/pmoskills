import { defineCollection, z } from 'astro:content';

const skills = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    stage: z.string(),
    order: z.number(),
    summary: z.string(),
    video: z.string().url().optional(),
    sourceFile: z.string(),
    related: z.array(z.string()).default([]),
  }),
});

const topics = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    relatedSkills: z.array(z.string()).default([]),
  }),
});

export const collections = { skills, topics };
