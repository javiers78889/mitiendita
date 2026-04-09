
import { z } from "zod";

//create
export const CreateAccountSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"), // no vacío
    cedula: z
        .string()
        .regex(/^\d-\d{3}-\d{3}$/, "Cédula inválida, debe tener el formato x-xxx-xxx"), // ejemplo
    email: z.string().email("Email inválido"), // valida formato email
    cellphone: z
        .string()
        .regex(/^\d{4}-\d{4}$/, "Celular inválido, debe ser xxxx-xxxx"), // tu formato
    password: z
        .string()
        .min(6, "El largo mínimo para el password es de 6 caracteres"),
    birthdate: z
        .string().nonempty("la fecha de nacimiento no puede ir en blanco"),
    captcha: z.string().nonempty("El reCAPTCHA no puede ir vacio")
});

export const UpdateAccountSchema = CreateAccountSchema.pick({
    name: true,
    cedula: true,
    email: true,
    cellphone: true,
    birthdate: true
}).partial()
    .extend({
        password: z
            .string()
            .min(6, "El largo mínimo para el password es de 6 caracteres")
            .optional()
    });

//login

export const LoginSchema = CreateAccountSchema.pick({
    email: true,
    captcha: true
}).extend({
    password: z.string()

})


export const ClientDetailsSchema = CreateAccountSchema.pick({
    name: true,
    email: true,
    cedula: true,
    cellphone: true,
    birthdate: true
}).extend({
    cant_tiendas: z.coerce.number()
})

export type ClientDetailsSchemaType = z.infer<typeof ClientDetailsSchema>

//Tiendas

export const TiendasSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    image: z.string().url(),
    cellphone: z.string(),
    cant_productos:z.coerce.number(),

    foundationDate: z.string().datetime(),

    province: z.string().trim(),
    distrito: z.string().trim(),
    corregimiento: z.string().trim(),

    latitud: z.number(),
    longitud: z.number(),

    status: z.boolean(),
    categoryId: z.number(),

    userId: z.string().uuid(),

    active: z.boolean(),

    start_date: z.string().datetime(),
    end_date: z.string().datetime(),
});


export const TiendasListSchema = z.object({
    data: z.array(TiendasSchema),
    lastPage: z.coerce.number(),
});

export type TiendasType = z.infer<typeof TiendasSchema>
export type TiendasListType = z.infer<typeof TiendasListSchema>


//responses

export const SuccessSchema = z.object({
    message: z.string().nonempty("El mensaje no puede venir vacio")
})

export type SuccessType = z.infer<typeof SuccessSchema>
export const ErrorSchema = z.object({
    message: z.string().nonempty("El mensaje no puede venir vacio"),

    statusCode: z.coerce.number()
})


//token
export const LoginTokenSchem = z.object({
    token: z.string().nonempty("El mensaje no puede venir vacio")
})



//image upload

export const UploadImageSchema = z.object({
    url: z.string().nonempty("La url vino vacia")
})


//create store

export const createStoreSchema = z.object({
    name: z.string().min(1, "El nombre de la tienda es obligatorio"),
    cellphone: z.string().nonempty("el celular es obligatorio"),
    description: z.string().min(1, "La descripción es obligatoria"),
    image: z.string().url("Debe ser una URL válida de la imagen"),
    foundationDate: z
        .string()
        .refine(
            (val) => !isNaN(Date.parse(val)),
            "La fecha de fundación debe ser una fecha válida"
        ),
    province: z.string().min(1, "La provincia es obligatoria"),
    distrito: z.string().min(1, "El distrito es obligatorio"),
    corregimiento: z.string().min(1, "El corregimiento es obligatorio"),
    categoryId: z.coerce.number("La categoría debe ser un número")
        .int("La categoría debe ser un número entero")
        .positive("La categoría debe ser mayor que 0"),
    lat: z
        .number("La latitud debe ser un número")
        .min(-90, "Latitud inválida")
        .max(90, "Latitud inválida"),
    lng: z
        .number("La longitud debe ser un número")
        .min(-180, "Longitud inválida")
        .max(180, "Longitud inválida"),
});


// Para obtener el tipo TypeScript basado en el schema
export type CreateStoreType = z.infer<typeof createStoreSchema>;


//categorias 


export const categoriasSchema = z.object({
    id: z.coerce.number(),
    name: z.string().nonempty("Esta categoria vino en vacio"),
    color: z.string().nonempty("Este color de la categoria vino vacio")
})

export const categoriaListSchema = z.array(categoriasSchema)


//anuncios 

const AnunciosSchema = z.object({
    id: z.coerce.number(),
    name: z.string().nonempty(),
    image: z.string().nonempty(),
    userId: z.string().nonempty(),
    end_date: z.string().nonempty(),
    start_date: z.string().nonempty()
})
export type AnunciosType = z.infer<typeof AnunciosSchema>
export const ListAnunciosSchema = z.array(AnunciosSchema)

export type ListAnunciosType = z.infer<typeof ListAnunciosSchema>


//Departamentos


export const DepartamentosSchema = z.object({
    id: z.coerce.number(),
    name: z.string().nonempty(),
    storeId: z.string().nonempty()
})

export const ListDepartamentos = z.array(DepartamentosSchema)

export type DepartamentosType = z.infer<typeof DepartamentosSchema>
export type ListDepartamentosType = z.infer<typeof ListDepartamentos>


//Productos 


export const productoSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    description: z.string().min(1),
    image: z.string().url(),
    quantity: z.number().int().nonnegative(),
    storeId: z.string().uuid(),
    departmentId: z.coerce.number().int()
});

export const createProductSchema = productoSchema.pick({
    name: true,
    quantity: true,
    description: true,
    image: true,
    storeId: true,
    departmentId: true
})

export const updateProductSchema = productoSchema.pick({
    name: true,
    quantity: true,
    description: true,
    image: true,
}).extend({
    id: z.string().nonempty('El id del producto es necesario para actualizar')
})

export const DeleteProductSchema = z.object({
    id: z.string().nonempty(),
    password: z.string().nonempty("La contraseña no puede ir vacía")
})
export type createProductType = z.infer<typeof createProductSchema>

export type ProductType = z.infer<typeof productoSchema>

export const productosSchema = z.array(productoSchema);

export const ProductPaginationSchema = z.object({
    productos: z.array(productoSchema),
    totalpages: z.coerce.number()
})


//Departamentos

export const CreateDepartamentoSchema = z.object({
    name: z.string().nonempty("El nombre del departamento no puede ir vacio"),
    storeId: z.string().nonempty()
})

export const UpdateDepartamentoSchema = CreateDepartamentoSchema.pick({
    name: true,
}).extend({

    id: z.coerce.number()
})
export const DeleteDepartamentoSchema = UpdateDepartamentoSchema.pick({
    id: true
}).extend({

    password: z.string().nonempty("El password es necesario para poder eliminar el departamento")
})



//tienda detalle

export const DepartmentSchema = z.object({
    "id": z.number(),
    "name": z.string(),
    "storeId": z.string(),
});
export type Department = z.infer<typeof DepartmentSchema>;

export const TiendaDetalleSchema = z.object({
    "name": z.string(),
    "cellphone": z.string(),
    "description": z.string(),
    "image": z.string(),
    "foundationDate": z.coerce.date(),
    "province": z.string(),
    "distrito": z.string(),
    "corregimiento": z.string(),
    "latitud": z.number(),
    "longitud": z.number(),
    "departments": z.array(DepartmentSchema),
});
export type Welcome = z.infer<typeof TiendaDetalleSchema>;


//tienda producto detalle

const productoDetalleSchema = productoSchema.pick({
    id: true,
    name: true,
    description: true,
    image: true,
    quantity: true

})
export type productoDetalleType = z.infer<typeof productoDetalleSchema>
export const TiendaProductoDetalleSchema = z.object({
    productos: z.array(productoDetalleSchema),
    total: z.coerce.number().nonnegative('la cantidad de productos vino negativa')

})

//chatbot response 

export const ProductosDisponibleSchema = z.object({
    "Nombre": z.string(),
    "Descripcion": z.string(),
    "imagen": z.string(),
    "Cantidad": z.number(),
    "Provincia": z.string(),
    "Distrito": z.string(),
    "Tienda": z.string(),
    "Latitud": z.coerce.number(),
    "Longitud": z.coerce.number(),
    "Enlace": z.string(),
    "Googlemaps": z.string(),
});
export type ProductosDisponibleType = z.infer<typeof ProductosDisponibleSchema>;

export const ProductosDisponibleSchemaList = z.array(ProductosDisponibleSchema)

export type ProductosDisponibleSchemaType = z.infer<typeof ProductosDisponibleSchemaList>;


// VALIDATE ACCOUNT 

export const validateAccountSchema = z.object({
    token: z.string().nonempty("el token es necesario")
})


//reset-password

export const ResetPasswordStep1Schema = z.object({
    email: z.email().nonempty("Email obligatorio")
})

export const ResetPasswordStep2Schema = z.object({
    token: z.string().nonempty("El token es obligatorio")
})

export const ResetPasswordStep3Schema = z.object({
    password: z.string().nonempty("La contrasena no puede ir vacia"),
    passwordConfirm: z.string().nonempty("La contrasena no puede ir vacia"),

}).refine((n) => n.password === n.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"],
});

//destacadas

const StoreSchema = z.object({
    id:z.string(),
    name: z.string(),
    image: z.string().url(), // valida que sea una URL
});

const DestacadoSchema = z.object({
    id: z.number(),
    start: z.string().refine(
        (date) => !isNaN(Date.parse(date)),
        { message: "start debe ser una fecha válida" }
    ),
    end: z.string().refine(
        (date) => !isNaN(Date.parse(date)),
        { message: "end debe ser una fecha válida" }
    ),
    storeId: z.string().uuid(), // valida que sea UUID
    store: StoreSchema,
});

// Esquema para un array de destacados
export const DestacadosArraySchema = z.array(DestacadoSchema);
export type DestacadosArrayType = z.infer<typeof DestacadosArraySchema>


//anuncios




const anunciosStore = StoreSchema.pick({
    name: true,
    image: true
})

export const AnuncionsPubSchema = AnunciosSchema.pick({
    id: true,
    name: true,
    image: true,

}).extend({
    store: anunciosStore,

})

export const AnunciosPubList = z.array(AnuncionsPubSchema)
export type AnunciosPubListType = z.infer<typeof AnunciosPubList>;
