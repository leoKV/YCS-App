import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtiviewComponent } from './artiview.component';
import { ArtiviewRoutingModule } from './artiview-routing.module';

@NgModule({
  declarations: [ArtiviewComponent],
  imports: [CommonModule,
  ArtiviewRoutingModule],
})
export class ArtiviewModule {}
