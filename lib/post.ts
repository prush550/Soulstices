import path from "path"
import fs from "fs"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    const filePath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      ...data,
    }
  })

  // sort by date
  return allPosts.sort((a: any, b: any) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
