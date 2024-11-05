import { Component, Input } from '@angular/core';
import { Contact, ContactService } from '../../service/contact.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {
    contact: any;
    constructor(private contactService: ContactService) { }
    ngOnInit(): void {
        this.contact = this.contactService.contactSelectedData;
    }

}
