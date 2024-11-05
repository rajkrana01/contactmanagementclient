// src/app/components/contact-list/contact-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact, ContactService } from '../../service/contact.service';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource: MatTableDataSource<Contact> = new MatTableDataSource();
    errorMessage: string = '';
    contactData: any;
    contact: any;
    showHideList: boolean = true;

    showMoreConact: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private contactService: ContactService,
    public dialog: MatDialog,
      private snackBar: MatSnackBar,
      private router: Router 
  ) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => this.errorMessage = err
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      width: '400px',
      panelClass: 'center-dialog',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.loadContacts();
        this.snackBar.open('Contact created successfully!', 'Close', { duration: 3000 });
      }
    });
  }

  openEditModal(contact: Contact): void {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      width: '400px',
      data: { isEdit: true, contact: contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.loadContacts();
        this.snackBar.open('Contact updated successfully!', 'Close', { duration: 3000 });
      }
    });
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id).subscribe({
        next: () => {
          this.loadContacts();
          this.snackBar.open('Contact deleted successfully!', 'Close', { duration: 3000 });
        },
        error: (err) => this.snackBar.open(`Error: ${err}`, 'Close', { duration: 3000 })
      });
    }
    }
    conactDetails(contact: Contact) {
        this.showMoreConact = true;
        this.contactData = contact;
    }
    showHideGrid(val: any) {
        this.showHideList = val;
    }
    onRowClick(row: any) {
        this.contactService.contactSelectedData = row;
        this.router.navigate(['/contactInfo']);
    }
}
