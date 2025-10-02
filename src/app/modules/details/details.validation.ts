import z from "zod";


export const educationZodSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title is required", })
        .refine((val) => typeof val === "string", {
            message: "Title must be strings",
        }),
    institute: z
        .string()
        .min(1, { message: "Institute is required", })
        .refine((val) => typeof val === "string", {
            message: "Institute must be strings",
        }),
    session: z
        .string()
        .min(1, { message: "Session is required", })
        .refine((val) => typeof val === "string", {
            message: "Session must be strings",
        }),
})
// For adding details
export const detailZodSchema = z.object({
    about: z
        .string()
        .min(1, { message: "About is required", })
        .refine((val) => typeof val === "string", {
            message: "About must be strings",
        }),
    education: z
        .array(educationZodSchema).min(1, { message: "Education is required", })
});

// For updating details
export const updateDetailZodSchema = detailZodSchema.partial();

