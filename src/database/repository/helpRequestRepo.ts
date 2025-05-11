import HelpRequest from '../models/helpRequest';
import { Op } from 'sequelize';

interface HelpRequestAttributes {
  id?: string;
  userId: string;
  workerId?: string | null;
  description: string;
  location: { lat: number; lng: number };
  images?: string[];
  status?: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
}

export default class HelpRequestRepo {
  static async createHelpRequest(helpRequest: HelpRequestAttributes) {
    return await HelpRequest.create(helpRequest as any);
  }

  static async findById(id: string) {
    return await HelpRequest.findByPk(id, {
      include: [
        { association: 'user', attributes: ['id', 'name', 'emailAddress', 'phoneNumber'] },
        { association: 'worker', attributes: ['id', 'name', 'emailAddress', 'phoneNumber'] },
      ],
    });
  }

  static async findByUserId(userId: string) {
    return await HelpRequest.findAll({
      where: { userId },
      include: [
        { association: 'user', attributes: ['id', 'name', 'emailAddress', 'phoneNumber'] },
        { association: 'worker', attributes: ['id', 'name', 'emailAddress', 'phoneNumber'] },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  static async findByWorkerId(workerId: string) {
    return await HelpRequest.findAll({
      where: { workerId },
      include: [
        { association: 'user', attributes: ['id', 'name', 'emailAddress', 'phoneNumber'] },
        { association: 'worker', attributes: ['id', 'name', 'emailAddress', 'phoneNumber'] },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  static async findPendingRequests() {
    return await HelpRequest.findAll({
      where: { status: 'pending' },
      include: [
        { association: 'user', attributes: ['id', 'name', 'emailAddress', 'phoneNumber'] },
      ],
      order: [['createdAt', 'ASC']],
    });
  }

  static async updateHelpRequest(id: string, updateData: Partial<HelpRequest>) {
    const helpRequest = await this.findById(id);
    if (!helpRequest) return null;
    
    await helpRequest.update(updateData);
    return helpRequest;
  }

  static async deleteHelpRequest(id: string) {
    const helpRequest = await this.findById(id);
    if (!helpRequest) return false;
    
    await helpRequest.destroy();
    return true;
  }

  static async assignWorker(helpRequestId: string, workerId: string) {
    return await this.updateHelpRequest(helpRequestId, {
      workerId,
      status: 'accepted',
    });
  }

  static async updateStatus(helpRequestId: string, status: HelpRequest['status']) {
    return await this.updateHelpRequest(helpRequestId, { status });
  }
} 