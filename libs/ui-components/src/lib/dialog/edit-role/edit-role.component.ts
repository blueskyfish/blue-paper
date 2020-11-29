import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNil } from '@blue-paper/shared-commons';
import { DialogHandler } from '../dialog.handler';

@Component({
  selector: 'bpa-edit-role',
  template: `
    <form class="form dialog" [formGroup]="formRole" autocomplete="off" (ngSubmit)="save()">
      <h3 class="title">{{ 'app.editorBureau.dialog.editRole.title' | translate }}</h3>
      <div class="content">
          <mat-form-field class="form-field">
            <mat-label>{{ 'app.editorBureau.dialog.editRole.role.label' | translate}}</mat-label>
            <input matInput type="text" formControlName="role" autofocus class="form-control">
          </mat-form-field>
      </div>
      <div class="command-bar">
        <button mat-raised-button type="button" (click)="cancel()" class="button">
          {{ 'app.command.cancel.title' | translate }}
        </button>
        <button mat-raised-button color="primary" type="submit"  class="button">
          {{ 'app.editorBureau.dialog.editRole.command.save.title' | translate }}
        </button>
      </div>
    </form>
  `,
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

  formRole = new FormGroup({
    role: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)])
  });

  constructor(private handler: DialogHandler<string, string>) { }

  ngOnInit(): void {
    const role = this.handler.data;
    this.formRole.setValue({
      role,
    });
  }

  cancel(): void {
    this.handler.dismiss(null);
  }

  save(): void {
    const value = this.formRole.value;
    if (!isNil(value) && !isNil(value.role)) {
      this.handler.dismiss(value.role);
    }
  }
}
