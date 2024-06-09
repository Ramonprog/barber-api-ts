import { scheduleDto } from "../../dto/schedule/scheduleDto";
import { ScheduleRepository } from "../../repository/schedule/scheduleRepository";

export class ScheduleService {
  private scheduleRepository: ScheduleRepository;

  constructor() {
    this.scheduleRepository = new ScheduleRepository();
  }

  async create(schedule: scheduleDto): Promise<scheduleDto>{
    try {
      const newSchedule = await this.scheduleRepository.create(schedule)
      return newSchedule
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}