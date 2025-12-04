import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDDSelect } from './user-ddselect';

describe('UserDDSelect', () => {
  let component: UserDDSelect;
  let fixture: ComponentFixture<UserDDSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDDSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDDSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
