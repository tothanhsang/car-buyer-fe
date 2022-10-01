import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingBrandComponent } from './listing-brand.component';

describe('ListingBrandComponent', () => {
  let component: ListingBrandComponent;
  let fixture: ComponentFixture<ListingBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
