import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContatosComponent } from 'src/view/contatos/contatos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuContatosComponente } from 'src/view/componentes/menu-contatos/menu-contatos.component';
import { ListarContatosComponent } from 'src/view/componentes/listar-contatos/listar-contatos.component';
import { ListboxModule } from 'primeng/listbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FieldsetModule } from 'primeng/fieldset';
import { DadosContatoComponent } from 'src/view/componentes/dados-contato/dados-contato.component';
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MessageService } from "primeng/api";
import { InputMaskModule } from 'primeng/inputmask';
import { CelularPipe } from 'src/shared/pipes/celular.pipes';

@NgModule({
  declarations: [
    AppComponent,
    ContatosComponent,
    MenuContatosComponente,
    ListarContatosComponent,
    DadosContatoComponent,
    CelularPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    RouterModule,
    FormsModule,
    TabMenuModule,
    ListboxModule,
    AutoCompleteModule,
    FieldsetModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ButtonModule,
    SpeedDialModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    SidebarModule,
    InputMaskModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
