import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string().transform((str) => new Date(str)), // Converts date strings to Date objects
    tags: z.array(z.string()).optional(),
    image: image(),
  }),
});

export const collections = {
  articles: articlesCollection,
};