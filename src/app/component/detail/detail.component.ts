import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public project!: Project;
  public url: string;
  public deleteConfirm: boolean;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.deleteConfirm = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getProject(id);
    }) 
  }

  getProject(id:string) { 
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
        console.log(this.project._id,'response detail');
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  setDeleteConfirm(confirm:boolean) {
    this.deleteConfirm = confirm 
  }

  deleteProject(id:string) {
    this._projectService.deleteProject(id).subscribe(
      response => {
        if (response.project) {
          this._router.navigate(['/project'])
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
}
