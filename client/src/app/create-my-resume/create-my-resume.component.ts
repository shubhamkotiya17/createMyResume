import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { jsPDF } from "jspdf";
import { Resume } from '../src/app/models/resume';
import { ResumeServiceService } from '../services/resume-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';


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

  constructor(private fb:FormBuilder, 
    private cd: ChangeDetectorRef,
    private resumeService:ResumeServiceService
    ) { 
    this.resumeForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      userImage: [null, Validators.required],
      objective: ['', Validators.required],
      workExperience : this.fb.array([this.createWorkExpFields()]),
      post : this.fb.array([this.createWorkExpFields()]),
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
        workExperience:['', Validators.required],
        post:['', Validators.required]
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

  percentDone: any = 0;
  submitResumeForm() {
    console.log('form submitted === ', this.resumeForm.value);
    if(this.resumeForm.value.userImage) {
        this.resumeService.addImg(
          this.resumeForm.value.userImage
        ).subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.percentDone = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.percentDone}%`);
              break;
            case HttpEventType.Response:
              console.log('Resume Data Added Successfully !', event.body);
              this.generateResume(this.resumeForm.value, event.body);
              this.percentDone = false;
          }
        });
    }
  }

  generateResume = (rf:Resume, body:any) => {
    const allWorkExperience = rf.workExperience;
    const allSkills = rf.skills;
    let imgPath= (body && body.userCreated) ? body.userCreated.avatar: "";

    let companyNamePositionPlace=108, postPositionPlace=113, skillPostionPlace=0;

    let doc = new jsPDF();
    doc.setFontSize(40);
    doc.text(rf.fullName, 40, 30);
    // "http://localhost:4000/public/shiba2.jpg"
    doc.addImage(imgPath , "jpeg", 150, 10, 40, 40);

    doc.setFont("courier", "normal");
    doc.setFontSize(13);
    doc.text(rf.email, 60,40, null,null);
    doc.text(rf.mobile, 60,45, null,null);
    doc.setFont("courier", "NORMAL")
    doc.setFontSize(16);

    doc.text("PROFESSION SUMMARY", 50,65, null,null); // heading
    doc.line(10, 71, 200, 70);
    doc.setFont("courier", "normal")
    doc.setFontSize(12);
    doc.text(rf.objective, 10,78, null,null);
    doc.setFont("courier", "NORMAL")
    doc.setFontSize(16);
    
    
    doc.text("EMPLOYEMENT HISTORY", 50,95, null,null); // h
    doc.line(10,  100, 200, 100);
    doc.setFont("courier", "BOLD");
    doc.setFontSize(14);

    allWorkExperience.forEach((exp) => {
        doc.setFont("courier", "BOLD")
        doc.text(exp.workExperience.trim(), 10, companyNamePositionPlace, null,null);
        doc.setFont("courier", "normal");
        doc.text(exp.post.trim(), 10, postPositionPlace , null,null);
        companyNamePositionPlace+=16;
        postPositionPlace+=17;

    });

    doc.setFont("courier", "NORMAL");
    doc.setFontSize(16);
    doc.text("SKIILLS", 50, postPositionPlace+2 , null,null); // h
    postPositionPlace+=6
    doc.line(10,  postPositionPlace, 200, postPositionPlace);
    doc.setFont("courier", "normal");
    doc.setFontSize(14);
    skillPostionPlace= postPositionPlace+6;
    allSkills.forEach((s)=>{
        doc.text(s.skills.trim(), 10, skillPostionPlace, null,null);
        skillPostionPlace+=8;
    });
    
    doc.setFont("courier", "NORMALs");
    doc.setFontSize(16);
    doc.text("DECLARATION", 50, skillPostionPlace+4 , null,null); // h
    skillPostionPlace+=7;

    doc.line(10,  skillPostionPlace, 200, skillPostionPlace);
    doc.setFont("courier", "normal");
    doc.setFontSize(14);
    doc.text("Hereby, I declare that all information that are given by me is valid", 10, skillPostionPlace+4 , null,null); // h

    let resumeName='Resume_'+Date.now()+".pdf";
    doc.save(resumeName);
  }


}
