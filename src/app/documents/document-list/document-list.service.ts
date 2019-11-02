import { Document } from '../document.model';
import { MOCKDOCUMENTS } from '../MOCKDOCUMENTS';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class DocumentListService {
    documentSelected = new EventEmitter<Document>();
    documents: Document[] = [];
    documentChangeEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();
    documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>();
    maxDocumentId: number;

    constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
    }

    getDocuments(): Document[] {
        return this.documents.slice();
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
        let documentListClone = this.documents.slice();
        this.documentChangeEvent.next(documentListClone);

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
        let documentListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentListClone);
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
        let documentListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentListClone);
    }


}
