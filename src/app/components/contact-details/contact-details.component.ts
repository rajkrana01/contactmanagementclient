import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../service/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
    @Input() contact!: Contact;
    @Output() showHideListEmit = new EventEmitter<boolean>();
    text: string = "Hide List";
    ngOnInit(): void {
    }
    showHideList() {
        this.text = this.text == "Hide List"? "Show List": "Hide List";
        this.showHideListEmit.emit(this.text=="Hide List");
    }
}
