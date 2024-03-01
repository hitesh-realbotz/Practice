import { Injectable } from '@angular/core';
import { ConfirmComponent } from '../modals/confirm/confirm.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  bsModelRef?: BsModalRef<ConfirmComponent>;

  constructor(private modalService: BsModalService) { }

  confirm(
    title = 'Confirmation', 
    message = 'Are you sure you want to do this?', 
    btnOkText = 'Ok', 
    btnCancelText = 'Cancel'): Observable<boolean> {
      const config = {
        initialState: {
          title, 
          message,
          btnOkText,
          btnCancelText
        }
      }
      this.bsModelRef = this.modalService.show(ConfirmComponent, config);
      return this.bsModelRef.onHidden!.pipe(
        map(() => {
          return this.bsModelRef!.content!.result
        })
      )
  }
}
