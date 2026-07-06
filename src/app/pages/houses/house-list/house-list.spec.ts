import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseList } from './house-list';

describe('HouseList', () => {
  let component: HouseList;
  let fixture: ComponentFixture<HouseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
