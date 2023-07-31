// Importar módulos y componentes necesarios
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Importar módulo de enrutamiento para este módulo
import { ArtiregisterRoutingModule } from './artiregister-routing.module';

// Importar el componente principal y el componente del diálogo del producto
import { ArtiregisterComponent } from './artiregister.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ProductDetalleDialogComponent } from './components/product-detalle-dialog/product-detalle-dialog.component';

// Importar el módulo de material para usar los componentes de Angular Material
import { MaterialModule } from '../../../material.module';
import { DatePipe } from '@angular/common';

// Importar el servicio SharedDataService
import { SharedDataService } from './services/shared-data-service.service';
import { AdminModule } from "../admin.module";

@NgModule({
    // Declarar los componentes utilizados en este módulo
    declarations: [
        ArtiregisterComponent,
        ProductDialogComponent,
        ProductDetalleDialogComponent,
    ],
    providers: [
        SharedDataService,
        DatePipe
    ],
    imports: [
        CommonModule,
        ArtiregisterRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        AdminModule,
    ]
})
export class ArtiregisterModule { }