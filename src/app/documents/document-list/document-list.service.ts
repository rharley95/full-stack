import { Document } from '../document.model';
import { MOCKDOCUMENTS } from '../MOCKDOCUMENTS';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class DocumentListService {
    documents: Document[] = [];
    documentSelected = new EventEmitter<Document>();
    documentChangeEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();
    documentListChangeEvent: Subject<Document[]> = new Subject<Document[]>();
    maxDocumentId: number;

    constructor(private http: HttpClient) {
        // this.documents = MOCKDOCUMENTS; because we're getting data from firebase I suppose?
        this.maxDocumentId = this.getMaxId();
        this.getDocuments();
    }

    getDocuments(): void {
        // return this.documents.slice(); changed for the new http get change
        this
            .http
            .get('https://romina-cms.firebaseio.com/documents.json')
            .subscribe(
                // success function
                (documents: Document[]) => {
                    this.documents = documents;
                    // this is where the sort function loop begins. I am making small parameters
                    // for the documents and creating a block with the if else statement that only fires when it sorts.
                    this.documents.sort((current: Document, next: Document): number => {
                        if (current < next) {
                            return -1;
                        } else if (current === next) {
                            return 0;
                        } else {
                            return 1;
                        }
                    });
                    this.documentListChangeEvent.next(this.documents.slice());
                }, (err: any) => {
                    console.error(err);
                });
    }

    getDocument(id: string): Document {

        // tslint:disable-next-line: prefer-const
        for (let document of this.documents) {
            if (document.id === id) {
                return document;
            }
        }

        return null;
    }

    // Didn't we already have this one??

    deleteDocument(document: Document): void {
        if (!document) {
            return;
        }

        const pos = this.documents.indexOf(document);
        if (pos < 0) {
            return;
        }

        this.documents.splice(pos, 1);
        this.storeDocuments();

    }

    getMaxId(): number {
        let maxId = 0;
        for (let document of this.documents) {
            let currentId = +document.id;
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }

    addDocument(document: Document) {
        if (document == null) {
            return;
        }

        this.maxDocumentId++;
        document.id = (this.maxDocumentId).toString();
        this.documents.push(document);
        this.storeDocuments();
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) {
            return;
        }

        let pos = this.documents.indexOf(originalDocument);
        if (pos < 0) {
            return;
        }

        newDocument.id = originalDocument.id;
        this.documents[pos] = newDocument;
        this.storeDocuments();
    }

    storeDocuments(): void {
        let json = JSON.stringify(this.documents);
        let header = new HttpHeaders();
        header.set('Content-Type', 'application/json');
        this
            .http
            .put('https://romina-cms.firebaseio.com/documents.json', json, {
                headers: header
            }).subscribe(() => {
                this.documentListChangeEvent.next((this.documents.slice()));
            });
    }


}
