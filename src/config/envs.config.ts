import * as z from 'zod'


const EnvSchema = z.object({

    NEXT_PUBLIC_NEXT_BACKEND: z.string().nonempty("El url del backend no puede ir vacio"),
    NEXT_PUBLIC_RECAPTCHA: z.string().nonempty("El token de captcha es obligatorio")

})


const validate = EnvSchema.safeParse(process.env);

if (!validate.success) throw new Error(validate.error.message)



export const envs = {
    BACKEND: validate.data.NEXT_PUBLIC_NEXT_BACKEND,
    RECAPTCHA: validate.data.NEXT_PUBLIC_RECAPTCHA
}