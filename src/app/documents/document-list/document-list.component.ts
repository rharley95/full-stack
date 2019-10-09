import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    // tslint:disable-next-line: max-line-length
    new Document('1', 'file one', 'This is the description of the document.', 'url', null),
    // tslint:disable-next-line: max-line-length
    new Document('1', 'file two', 'This is the description of the document.', 'url', null),
    // tslint:disable-next-line: max-line-length
    new Document('1', 'file three', 'This is the description of the document.', 'url', null),
    // tslint:disable-next-line: max-line-length
    new Document('1', 'file four', 'This is the description of the document.', 'url', null),
    // tslint:disable-next-line: max-line-length
    new Document('1', 'file five', 'This is the description of the document.', 'url', null)
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
