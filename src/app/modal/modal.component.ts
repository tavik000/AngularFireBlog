import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  // @Input() id: string;
  private element: any;

  constructor(private el: ElementRef) {
      this.element = el.nativeElement;
  }
  // constructor(){}
  ngOnInit(): void {
      let modal = this;


      // ensure id attribute exists
      // if (!this.id) {
      //     console.error('modal must have an id');
      //     return;
      // }

      // move element to bottom of page (just before </body>) so it can be displayed above everything else
      // document.body.appendChild(this.element);

      // close modal on background click
      this.element.addEventListener('click', function (e: any) {
          if (e.target.className === 'jw-modal') {
              modal.close();
          }
      });

      // add self (this modal instance) to the modal service so it's accessible from controllers
  }

  // remove self from modal service when directive is destroyed
  // ngOnDestroy(): void {
  //     this.element.remove();
  // }

  // open modal
  open(): void {
      this.element.style.display = 'block';
      document.body.classList.add('jw-modal-open');
  }

  // close modal
  close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('jw-modal-open');
  }
}
