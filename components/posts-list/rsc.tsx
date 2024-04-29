import getPosts from '@/lib/get-posts'
import PostsList from '.'

export async function PostListRSC() {
  const posts = await getPosts(true)
  return (
    <div className='w-full'>
      <PostsList posts={posts} />
    </div>
  )
}