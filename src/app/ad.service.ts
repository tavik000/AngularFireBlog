import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from '@angular/fire/database-deprecated';
import { CommentComponent } from './ad-listing/ad-listing.component';
// import { AllComment } from './app.module';


@Injectable()
export class AdService {

  // constructor(private db: AngularFireDatabase) { }

  // createAd(): FirebaseObjectObservable<AllComment> {
  //   const adDefault = new AllComment()
  //   const adKey = this.db.list('/cmt').push(adDefault).key
  //   return this.db.object('/cmt/' + adKey)
  // }


  // /// Updates an existing Ad
  // updateAd(ad: FirebaseObjectObservable<AllComment>, data: any) {
  //   return ad.update(data)
  // }

}
