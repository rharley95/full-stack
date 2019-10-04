import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();


  onSelect(feature: string){
    this.featureSelected.emit(feature);
  }

}
