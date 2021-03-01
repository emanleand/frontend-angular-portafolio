import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './component/about/about.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { CreateComponent } from './component/create/create.component';
import { ContactComponent } from './component/contact/contact.component';
import { ErrorComponent } from './component/error/error.component';
import { DetailComponent } from './component/detail/detail.component';
import { EditComponent } from './component/edit/edit.component';

const appRoutes : Routes = [
    {path: '', component: AboutComponent},
    {path: 'about', component: AboutComponent},
    {path: 'project', component: ProjectsComponent},
    {path: 'create-project', component: CreateComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'project/:id', component: DetailComponent},
    {path: 'edit-project/:id', component: EditComponent},
    {path: '**', component: ErrorComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);