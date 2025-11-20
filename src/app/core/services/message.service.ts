import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, action: string = 'Cerrar', duration: number = 4000) {
    this.snackBar.open(message, action, { duration });
  }
}
