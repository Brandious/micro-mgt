import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
@Injectable()
export class TasksService {
  private email = process.env.JIRA_USER_EMAIL;
  private apiToken = process.env.JIRA_API_TOKEN;

  private authBuffer = Buffer.from(`${this.email}:${this.apiToken}`).toString(
    'base64',
  );

  // @ts-expect-error sdadsada
  private base64Auth = this.authBuffer.toString('base64');

  private headers = {
    Authorization: `Basic ${this.base64Auth}`,
    Accept: 'application/json',
  };

  constructor(private httpService: HttpService) {}

  findAllProjects(): Observable<any> {
    const res = this.httpService.get(
      `${process.env.JIRA_SITE}/rest/api/3/issue/createmeta`,
      { headers: this.headers },
    );
    return res;
  }

  getBoard(): Observable<any> {
    const res = this.httpService.get(
      `${process.env.JIRA_SITE}/rest/agile/1.0/board`,
      { headers: this.headers },
    );
    return res;
  }

  getBoardById(boardId: string): Observable<any> {
    const res = this.httpService.get(
      `${process.env.JIRA_SITE}/rest/agile/1.0/board/${boardId}`,
      { headers: this.headers },
    );
    return res;
  }

  getIssues(boardId: string): Observable<any> {
    const res = this.httpService.get(
      `${process.env.JIRA_SITE}/rest/agile/1.0/board/${boardId}/issue`,
      { headers: this.headers },
    );
    return res;
  }
}
