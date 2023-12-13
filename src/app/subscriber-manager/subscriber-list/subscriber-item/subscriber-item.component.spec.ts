import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberItemComponent } from './subscriber-item.component';

describe('SubscriberItemComponent', () => {
  let component: SubscriberItemComponent;
  let fixture: ComponentFixture<SubscriberItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriberItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriberItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
