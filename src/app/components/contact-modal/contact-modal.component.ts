// src/app/components/contact-modal/contact-modal.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact, ContactService } from '../../service/contact.service';

interface DialogData {
  isEdit: boolean;
  contact?: Contact;
}

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit {
  contactForm!: FormGroup;
  isEdit: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    public dialogRef: MatDialogRef<ContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;

    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    if (this.isEdit && this.data.contact) {
      this.contactForm.patchValue({
        firstName: this.data.contact.firstName,
        lastName: this.data.contact.lastName,
        email: this.data.contact.email
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    const contactData: Contact = {
      id: this.data.contact ? this.data.contact.id : 0, 
      firstName: this.contactForm.value.firstName,
      lastName: this.contactForm.value.lastName,
      email: this.contactForm.value.email
    };

    if (this.isEdit) {
      this.contactService.updateContact(contactData.id, contactData).subscribe({
        next: () => this.dialogRef.close('updated'),
        error: (err) => {
          this.errorMessage = err;
          this.snackBar.open(`Error: ${err}`, 'Close', { duration: 3000 });
        }
      });
    } else {
      this.contactService.createContact(contactData).subscribe({
        next: () => this.dialogRef.close('saved'),
        error: (err) => {
          this.errorMessage = err;
          this.snackBar.open(`Error: ${err}`, 'Close', { duration: 3000 });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get f() { return this.contactForm.controls; }
}
