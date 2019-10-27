import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentListService } from './document-list.service';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[];

  constructor(private documentService: DocumentListService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();

    this.documentService.documentChangeEvent.subscribe((documents: Document[]) => {
      this.documents = documents.slice();
    });
  }

}