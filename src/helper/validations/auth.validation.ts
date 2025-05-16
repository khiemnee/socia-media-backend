import {z} from 'zod'

const authSchema = z.object({
    username : z.string().nullable().optional(),
    email : z.string({
        required_error : 'Email field cant empty',
        invalid_type_error : 'Please enter valid email format'
    }).email(),
    password : z.string({
        required_error : 'Password field cant empty'
    }).min(8).max(8)
})

export type Auth = z.infer<typeof authSchema>