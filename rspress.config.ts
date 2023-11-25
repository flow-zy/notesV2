import * as path from 'path';
import { defineConfig } from 'rspress/config';
export default defineConfig({
	base: process.env.NODE_ENV == 'development' ? '' : '/notes2/',
	root: path.join(__dirname, 'docs'),
	title: 'ZY的学习笔记',
	description: '在这里你可以找到大部分的前端编程知识',
	icon: '/rspress-icon.png',
	logo: {
		light: '/rspress-light-logo.png',
		dark: '/rspress-dark-logo.png',
	},
	themeConfig: {
		footer: {
			message: '这里是zy的学习笔记',
		},
		outlineTitle: '目录',
		prevPageText: '上一页',
		nextPageText: '下一页',
		socialLinks: [
			{
				icon: 'github',
				mode: 'link',
				content: 'https://github.com/flow-zy/notes',
			},
		],
		enableContentAnimation: true,
	},
});
