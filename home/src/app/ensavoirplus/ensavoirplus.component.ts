import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-ensavoirplus',
  templateUrl: './ensavoirplus.component.html',
  styleUrls: ['./ensavoirplus.component.css']
})
export class EnSavoirPlusComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<EnSavoirPlusComponent>) { }

  ngOnInit() {
  }

}
