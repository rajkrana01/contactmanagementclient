// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';

const routes: Routes = [
  { path: '', component: ContactListComponent },
   { path: 'contactInfo', component: ContactInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
