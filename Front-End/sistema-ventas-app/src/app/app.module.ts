import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CategoriasService } from '../app/pages/admin/services/categorias.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { NgxSpinnerModule } from 'ngx-spinner';

// Importa tus interceptores (si los tienes)
import { LoadingInterceptor } from '../app/shared/interceptor/loading.interceptor';
import { TokenInterceptor } from '../app/shared/interceptor/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    SidebarModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule
  ],
  providers: [
    CategoriasService,
    {provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
