import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../Services/issue.service';
import { Router } from '@angular/router';
import { IssueInterface } from '../../../Models/issue.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listOfIssues: IssueInterface[];
  //Set up matTable
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];

  constructor(private issueService: IssueService,
    private router: Router) { }

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService.getAllIssues()
    .subscribe((data: IssueInterface[]) => {
      this.listOfIssues = data;
      console.log(this.listOfIssues);
    });
  }

  editIssue(id) {
    //Navigate to the edit component based on issue id
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
    this.issueService.deleteIssueById(id).subscribe(() => {
      this.fetchIssues();
    });
  }
}
