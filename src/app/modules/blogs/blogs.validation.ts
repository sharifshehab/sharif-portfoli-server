import z from "zod";

// For create new blog
export const createBlogZodSchema = z.object({
    title: z
        .string()
        .min(8, { message: "Title must be at least 8 characters long." })
        .max(225, { message: "Title cannot exceed 25 characters." })
        .refine((val) => typeof val === "string", {
            message: "Title must be a string",
        }),
    description: z
        .string()
        .refine((val) => typeof val === "string", {
            message: "Description must be string",
        }),
    email: z
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    thumbnail: z
        .string(),
    tags: z
        .array(z.string()).min(1, { message: "At least one tag is required." })
});

// For update old blog
export const updateBlogZodSchema = createBlogZodSchema.partial();

