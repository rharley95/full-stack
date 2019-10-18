import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentListService } from './document-list/document-list.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentListService]
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  constructor(private documentService: DocumentListService) { }

  ngOnInit() {
    this.documentService.documentSelected.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }

}
