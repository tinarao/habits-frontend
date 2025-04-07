import { z } from "zod"

const validators = {
  name: z.string({ message: "Некорректное название" }).min(1, "Слишком короткое название").max(128, "Слишком длинное название"),
  description: z.string({ message: "Некорректное описание" }).max(1024, "Слишком длинное описание"),
}

export const createHabitSchema = z.object({
  name: validators.name,
  description: z.optional(validators.description),
  remind: z.boolean().default(false),
})

// Types

export type CreateHabitDto = z.infer<typeof createHabitSchema>

export const habitValidator = validators
