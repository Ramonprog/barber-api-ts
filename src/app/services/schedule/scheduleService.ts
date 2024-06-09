import { HttpException } from "../../../@types/HttpException";
import { scheduleDto } from "../../dto/schedule/scheduleDto";
import { ScheduleRepository } from "../../repository/schedule/scheduleRepository";

export class ScheduleService {
  private scheduleRepository: ScheduleRepository;

  constructor() {
    this.scheduleRepository = new ScheduleRepository();
  }

  async create(schedule: scheduleDto): Promise<scheduleDto> {
    try {
      const newSchedule = await this.scheduleRepository.create(schedule)
      return newSchedule
    } catch (error: any) {
      throw new HttpException(400, error.message)
    }
  }

  async allSchedule(user_id: string): Promise<scheduleDto[]>  {
    try {
      return await this.scheduleRepository.scheduleList(user_id);
    } catch (error) {
      throw new HttpException(400, error.message)
    }
  }

  async finishSchedule(schedule_id: string): Promise<scheduleDto> { 
    if(!schedule_id) {
      throw new HttpException(400, 'Schedule not found')
    }
    try {
      return await this.scheduleRepository.finishSchedule(schedule_id)
    } catch (error) {
      throw new HttpException(400, error.message)
    }
  }
}