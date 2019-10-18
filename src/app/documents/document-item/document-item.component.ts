import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentListService } from '../document-list/document-list.service';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  @Input() document: Document;


  constructor(private documentService: DocumentListService) { }

  ngOnInit() {
  }

  onSelected() {
    this.documentService.documentSelected.emit(this.document);
  }

}
