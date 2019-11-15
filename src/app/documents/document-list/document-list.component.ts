
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Document } from '../document.model';
import { DocumentListService } from '../document-list/document-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  subscription: Subscription;

  constructor(private documentService: DocumentListService) { }

  ngOnInit() {

    this.documentService.documentChangeEvent.subscribe((documents: Document[]) => {
      this.documents = documents.slice();
    });

    this.subscription = this.documentService.documentListChangeEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}