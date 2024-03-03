import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
@Injectable()
export class TasksService {
  constructor(private httpService: HttpService) {}
  findAll(): Observable<any> {
    const email = process.env.JIRA_USER_EMAIL;
    const apiToken = process.env.JIRA_API_TOKEN;

    const authBuffer = Buffer.from(`${email}:${apiToken}`).toString('base64');

    // @ts-expect-error sdadsada
    const base64Auth = authBuffer.toString('base64');

    const headers = {
      Authorization: `Basic ${base64Auth}`,
      Accept: 'application/json',
    };

    const res = this.httpService.get(
      `${process.env.JIRA_SITE}/rest/api/3/issue/createmeta`,
      { headers },
    );
    return res;
  }
}
