import z from 'zod'

export const ScheduleSchema = z.object({
  user_id: z.string(),
  haircut_id: z.string(),
  customer: z.string(),
})

export type scheduleDto = z.infer<typeof ScheduleSchema>