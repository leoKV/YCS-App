import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CateregisterComponent } from './cateregister.component';

const routes: Routes = [{ path: '', component: CateregisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CateregisterRoutingModule { }
