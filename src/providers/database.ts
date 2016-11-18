import {Injectable} from '@angular/core';
import PouchDB from "pouchdb";

//let PouchDB = require('pouchdb');


@Injectable()
export class Database {  
    private _db;
    private _dbPhotos;
    private _collections;
    private _collectionMedia;

    initDB() {
        console.log('init DB');
        this._db = new PouchDB('collections', { adapter: 'websql' });
        this._dbPhotos = new PouchDB('media', { adapter: 'websql' });
        window["PouchDB"] = PouchDB;
    }
    
    add(collection) {  
        return this._db.post(collection);
    } 
    
    update(collection) {  
        return this._db.put(collection);
    }
    
    delete(collection) {  
        return this._db.remove(collection);
    }
    
    getCollections() {  
    
        if (!this._collections) {
            return this._db.allDocs({ include_docs: true})
                .then(docs => {
    
                    // Each row has a .doc object and we just want to send an 
                    // array of birthday objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.
    
                    this._collections = docs.rows.map(row => {
                        return row.doc;
                    });
    
                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true})
                        .on('change', this.onDatabaseChange);
    
                    return this._collections;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this._collections);
        }
    }

    private onDatabaseChange = (change) => {  
        var index = this.findIndex(this._collections, change.id);
        var collection = this._collections[index];
        console.log('change detected');
        if (change.deleted) {
            console.log('delete detected');
            if (collection) {
                this._collections.splice(index, 1); // delete
            }
        } else {
            if (collection && collection._id === change.id) {
                this._collections[index] = change.doc; // update
            } else {
                this._collections.splice(index, 0, change.doc) // insert
            }
        }
    }
    
    addToCollection(collection, mediaItems) {  
        for (let mediaItem of mediaItems){
            var colItem = {
                title: mediaItem.title,
                url_big: mediaItem.url_big,
                url_small: mediaItem.url_small,
                col_id: collection._id
            };
            this._dbPhotos.post(colItem);
        }
        return true;
    }
    
    deleteFromCollection(colItem) {  
        return this._dbPhotos.remove(colItem);
    }
    
    getCollectionItems() {  
    
        if (!this._collectionMedia) {
            return this._dbPhotos.allDocs({ include_docs: true})
                .then(docs => {
                    this._collectionMedia = docs.rows.map(row => {
                        return row.doc;
                    });
/*    
                    // Listen for changes on the database.
                    this._dbPhotos.changes({ live: true, since: 'now', include_docs: true})
                        .on('change', this.onDatabaseChange);
*/
                    return this._collectionMedia;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this._collectionMedia);
        }

    }    
    
    // Binary search, the array is by default sorted by _id.
    private findIndex(array, id) {  
        var low = 0, high = array.length, mid;
        while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
    }


}