import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),
		pinned: z.boolean().optional().default(false),
		author: z.string().optional().default(""),
		sourceLink: z.string().optional().default(""),
		licenseName: z.string().optional().default(""),
		licenseUrl: z.string().optional().default(""),

		// 👇 新增：评论开关
		comment: z.boolean().optional().default(false),

		/* Page encryption fields */
		encrypted: z.boolean().optional().default(false),
		password: z.string().optional().default(""),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

const specCollection = defineCollection({
	schema: z.object({}),
});

// 👇 新增：pages 集合（用于留言板等独立页面）
const pagesCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string().optional().default(""),
		layout: z.enum(["page"]).default("page"), // 支持 page 布局
		permalink: z.string().optional(), // 自定义路径
		comment: z.boolean().optional().default(false), // 页面也可评论
	}),
});

export const collections = {
	posts: postsCollection,
	pages: pagesCollection, // ← 必须导出 pages
	spec: specCollection,
};
