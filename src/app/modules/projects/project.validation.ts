import z from "zod";

// const upcomingFeaturesZodSchema = z.object({
//     title: z
//         .string()
//         .min(2, { message: "Feature title must be at least 2 characters long." })
//         .max(25, { message: "Feature title cannot exceed 25 characters." })
//         .refine((val) => typeof val === "string", {
//             message: "Feature title must be a string",
//         }),
//     description: z
//         .string()
//         .min(2, { message: "Feature description must be at least 2 characters long." })
//         .refine((val) => typeof val === "string", {
//             message: "Feature description must be a string",
//         }),
// });

// const projectChallengesZodSchema = z.object({
//     title: z
//         .string()
//         .min(2, { message: "Challenges title must be at least 2 characters long." })
//         .max(25, { message: "Challenges title cannot exceed 25 characters." })
//         .refine((val) => typeof val === "string", {
//             message: "Feature title must be a string",
//         }),
//     description: z
//         .string()
//         .min(2, { message: "Challenges description must be at least 2 characters long." })
//         .refine((val) => typeof val === "string", {
//             message: "Challenges description must be a string",
//         }),
// });

// For create user
export const createProjectZodSchema = z.object({
    name: z
        .string()
        .min(5, { message: "Name must be at least 5 characters long." })
        .max(25, { message: "Name cannot exceed 25 characters." })
        .refine((val) => typeof val === "string", {
            message: "Name must be a string",
        }),
    title: z
        .string()
        .refine((val) => typeof val === "string", {
            message: "Sub Title must be a string",
        }),
    description: z
        .string()
        .refine((val) => typeof val === "string", {
            message: "Description must be a string",
        }),
    thumbnail: z
        .string()
        .optional(),
    technologies: z
        .array(z.string()).min(1, { message: "At least one technology is required." }),
    features: z
        .array(z.string()).min(1, { message: "At least one feature is required." }),
    frontEndGithubRepo: z
        .string(),
    backEndGithubRepo: z
        .string(),
    liveLink: z
        .string()
    // upcomingFeatures: z
    //     .array(upcomingFeaturesZodSchema)
    //     .optional(),
    // projectChallenges: z
    //     .array(projectChallengesZodSchema)
    //     .optional(),

});

// For update user
export const updateProjectZodSchema = createProjectZodSchema.partial();


