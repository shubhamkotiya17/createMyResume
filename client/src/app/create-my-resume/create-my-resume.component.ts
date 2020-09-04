import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-my-resume',
  templateUrl: './create-my-resume.component.html',
  styleUrls: ['./create-my-resume.component.css']
})
export class CreateMyResumeComponent implements OnInit {
  resumeForm:FormGroup;
  workExperience:FormArray;
  skils:FormArray;
  preview:string="";

  constructor(private fb:FormBuilder, private cd: ChangeDetectorRef) { 
    this.resumeForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      userImage: [null, Validators.required],
      objective: ['', Validators.required],
      workExperience : this.fb.array([this.createWorkExpFields()]),
      skills : this.fb.array([this.createSkillsFields()])
    })
  }

  ngOnInit() {
  }

  get resumeFormControl() { return this.resumeForm.controls;}

  onFileSelect = (event) => {
      let reader = new FileReader();
      if(event.target.files && event.target.files.length) {
         const file = (event.target.files[0] as File);

         reader.onload = () => {
            this.resumeForm.patchValue({
              userImage: file
            });
            this.preview = reader.result as string;
         }

          reader.readAsDataURL(file);
          this.cd.markForCheck();
      }
  }

  createWorkExpFields():FormGroup {
      return this.fb.group({
        workExperience:['']
      })
  }

  createSkillsFields():FormGroup {
      return this.fb.group({
          skills:['']
      })
  }

  addItem(fieldType:string): void {
    if(fieldType === 'workExperience') {
      this.workExperience = this.resumeForm.get('workExperience') as FormArray;
      this.workExperience.push(this.createWorkExpFields());
    }else {
      this.skils = this.resumeFormControl.skills as FormArray;
      this.skils.push(this.createSkillsFields());
    }
  }

  submitResumeForm() {
    console.log('form submitted === ', this.resumeForm);
    
  }
}
