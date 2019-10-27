import { Document } from '../document.model';
import { MOCKDOCUMENTS } from '../MOCKDOCUMENTS';
import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class DocumentListService {
    documentSelected = new EventEmitter<Document>();
    documents: Document[] = [];
    documentChangeEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();

    constructor() {
        this.documents = MOCKDOCUMENTS;
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

    deleteDocument(document: Document): void {
        if (!document) {
            return;
        }

        const pos = this.documents.indexOf(document);
        if (pos < 0) {
            return;
        }

        this.documents.splice(pos, 1);
        this.documentChangeEvent.emit(this.documents.slice());

}
}
