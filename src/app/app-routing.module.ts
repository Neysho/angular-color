import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorComponent } from './color/color.component';

const routes: Routes = [
  { path: '', redirectTo: '/red', pathMatch: 'full' },
  { path: ':color', component: ColorComponent },
  { path: '**', redirectTo: '/red' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
