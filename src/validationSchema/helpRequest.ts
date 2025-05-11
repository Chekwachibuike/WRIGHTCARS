import { object, string, array, number, TypeOf, z } from "zod";

export const createHelpRequestSchema = object({
  body: object({
    description: string({
      required_error: "Description is required",
    }),
    location: object({
      lat: number({
        required_error: "Latitude is required",
      }),
      lng: number({
        required_error: "Longitude is required",
      }),
    }),
    images: array(string().url()).optional(),
  }),
});

export const updateHelpRequestSchema = object({
  body: object({
    description: string().optional(),
    location: object({
      lat: number(),
      lng: number(),
    }).optional(),
    images: array(string().url()).optional(),
    status: z.enum(['pending', 'accepted', 'in_progress', 'completed', 'cancelled']).optional(),
    workerId: string().uuid().optional(),
  }),
});

export const helpRequestIdSchema = object({
  params: object({
    id: string({
      required_error: "Help request ID is required",
    }).uuid("Invalid help request ID format"),
  }),
});

export type createHelpRequestInput = TypeOf<typeof createHelpRequestSchema>["body"];
export type updateHelpRequestInput = TypeOf<typeof updateHelpRequestSchema>["body"];
export type helpRequestIdInput = TypeOf<typeof helpRequestIdSchema>["params"]; 