import { Request, Response } from "express";
import { ScheduleService } from "../../services/schedule/scheduleService";
import { HttpException } from "../../../@types/HttpException";
import { ScheduleSchema } from "../../dto/schedule/scheduleDto";

export class ScheduleController {
  private scheduleService: ScheduleService
  constructor () {
    this.scheduleService = new ScheduleService()
  }

   async createSchedule(req: Request, res: Response) :Promise<Response>{
    const { user_id } = req
    const parse = ScheduleSchema.parse({...req.body, user_id})
    try {
      const schedule = await this.scheduleService.create(parse)
      return res.status(201).json(schedule)
    } catch (error) {
      throw new HttpException(400, error.message)
    }
  }
}