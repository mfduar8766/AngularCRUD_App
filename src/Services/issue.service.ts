import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  URI = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getAllIssues() {
    return this.http.get(`${this.URI}/api/issues`);
  }

  getIssueById(id) {
    return this.http.get(`${this.URI}/api/isseues/issue/${id}`);
  }

  addNewIssue(title, responsible, description, severity) {
    const newIssue = {
      title:title,
      responsible:responsible,
      description:description,
      severity:severity
    };
    return this.http.post(`${this.URI}/api/issues/add`,newIssue);
  }

  updateIssueById(id, title, responsible, description, severity, status) {
    const updatedIssue = {
      title:title,
      responsible:responsible,
      description:description,
      severity:severity,
      status:status
    };
    return this.http.put(`${this.URI}/api/issues/issue/${id}/update`,updatedIssue);
  }

  deleteIssueById(id) {
    return this.http.delete(`${this.URI}/issues/issue/${id}/delete`);
  }
}
