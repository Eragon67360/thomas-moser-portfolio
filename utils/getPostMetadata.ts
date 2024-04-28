import fs from 'fs'
import matter from 'gray-matter'

export default function getPostMetadata(basePath: string) {
    const folder = basePath + '/'
    const files = fs.readdirSync(folder)
    const markdownPosts = files.filter(file => file.endsWith('.md'))

    // get the file data
    const posts = markdownPosts.map((filename) => {
        const fileContents = fs.readFileSync(`${basePath}/${filename}`, 'utf8')
        const matterResult = matter(fileContents)
        return {
            title: matterResult.data.title,
            read_time: matterResult.data.read_time,
            date: matterResult.data.date,
            description: matterResult.data.description,
            tags: matterResult.data.tags,
            slug: filename.replace('.md', '')
        }
    })
    return posts
}