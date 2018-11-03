import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../Services/issue.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private issueService: IssueService, private  formBuilder: FormBuilder, private rouer: Router) {
    this.createForm = formBuilder.group({
      //Assign the values for the form
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: ''
    });
  }

  addIssue(title, responsible, description, severity) {
    this.issueService.addNewIssue(title, responsible, description, severity).subscribe(() => {
       this.rouer.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
