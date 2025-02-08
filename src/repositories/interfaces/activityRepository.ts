import { Activity, Prisma } from '@prisma/client'

export interface ActivityRepository {
  createActivity: (
    data: Prisma.ActivityUncheckedCreateInput,
  ) => Promise<Activity>

  updateActivity: (
    activityId: string,
    data: Prisma.ActivityUpdateInput,
  ) => Promise<Activity | null>

  findActivity: (id: string) => Promise<Activity | null>

  checkActivities: () => Promise<Activity | null>

  countActivities: () => Promise<{
    totalActivities: number
    resume: { category: string; amount: number }[]
  }>
}
