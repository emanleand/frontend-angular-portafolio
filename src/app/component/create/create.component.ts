import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})

export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: string;
  public fileToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) { 
    this.title = 'Create project';
    this.project = new Project('','','','',2020,'','');
    this.status = '';
    this.fileToUpload = [];
  }

  ngOnInit(): void {
  }

  onSubmit(form:any) {
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {
          //upload image
          if (this.fileToUpload) {   
            this._uploadService.makeFileRequest(
              Global.url + 'upload-image/' + response.project._id,
              [],
              this.fileToUpload,
              'image'
              ).then((result:any) => {
                this.status = 'success';
                form.reset();
            })
          } else {
            this.status = 'success';
            form.reset();
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  fileChangeEvent(fileIunput:any) {
    this.fileToUpload = <Array<File>>fileIunput.target.files;
  }


}
