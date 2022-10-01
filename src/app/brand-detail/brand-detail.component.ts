import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.scss'],
})
export class BrandDetailComponent implements OnInit {
  statuses = [
    { value: 'acitve', viewValue: 'Active' },
    { value: 'inactive', viewValue: 'Inactive' },
  ];
  selectedStatus = this.statuses[0].value;

  constructor() {}

  ngOnInit(): void {}

  saveChange() {}
}
