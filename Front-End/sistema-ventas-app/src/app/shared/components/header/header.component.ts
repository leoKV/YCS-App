import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLogged= false;
  @Output() togglesidenav = new EventEmitter<void>();
  constructor(){}

  onToggleSidenav():void{
    this.togglesidenav.emit();
  }
}
