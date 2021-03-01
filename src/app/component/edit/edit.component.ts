import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})

export class EditComponent implements OnInit {

  public title: string;
  public project!: Project;
  public status: string;
  public fileToUpload: Array<File>;
  public url: string;
  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.title = 'Edit project';
    this.status = '';
    this.fileToUpload = [];
    this.url = Global.url;
  }
  
  ngOnInit(): void {
    console.log('eeeee');
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getProject(id);
    }) 
  }

  getProject(id:string) { 
    this._projectService.getProject(id).subscribe(
      response => {
        console.log(response.project, 'edit')
        this.project = response.project;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(form:any) {
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project) {
          //upload image
          console.log(this.fileToUpload, 'this.fileToUpload');
          if (this.fileToUpload.length > 0) {
            this._uploadService.makeFileRequest(
              Global.url + 'upload-image/' + response.project._id,
              [],
              this.fileToUpload,
              'image'
              ).then((result:any) => {
                this.status = 'success';
            })
          } else {
            this.status = 'success';
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
