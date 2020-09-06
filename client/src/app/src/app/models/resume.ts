export class Resume {
    fullName:string;
    email:string;
    mobile:string;
    file:string;
    objective:string;
    workExperience:WorkExperience[];
    skills:any[];
}


class WorkExperience {
    workExperience:string;
    post:string;
}

