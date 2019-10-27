import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentListService } from '../document-list/document-list.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  nativeWindow: any;
  document: Document;

  constructor(private documentService: DocumentListService,
              private router: Router,
              private route: ActivatedRoute,
              private windRefService: WindRefService) { 
    this.nativeWindow = this.windRefService.getNativeWindow();
              }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.document = this.documentService.getDocument(params['id']);
    });
  }

}
