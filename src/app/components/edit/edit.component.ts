import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../Services/issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: string;
  issue: any = {};
  updatedForm: FormGroup;

  constructor(private issueService: IssueService, private router: Router, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.updateForm();
   }

   updateForm() {
    this.updatedForm = this.formBuilder.group({
      //Assign the values for the form
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: ''
    });
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(issueId => {
      this.id = issueId.id;
      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updatedForm.get('title').setValue(this.issue.title);
        this.updatedForm.get('responsible').setValue(this.issue.responsible);
        this.updatedForm.get('description').setValue(this.issue.description);
        this.updatedForm.get('severity').setValue(this.issue.severity);
        this.updatedForm.get('status').setValue(this.issue.status);
      });
    });
  }

  updateIssue(title, responsible, description, severity, status) {
    this.issueService.updateIssueById(this.id, title, responsible, description, severity, status).subscribe(() => {
      this.snackBar.open('Issue updated successfully','OK', {
        duration:3000
      });
    });
  }
}
