import {z} from 'zod'


const postSchema = z.object({
    content : z.string(),
    image : z.string().nullable().optional(),
})

export type Post = z.infer<typeof postSchema>