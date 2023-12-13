import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberManagerComponent } from './subscriber-manager.component';

describe('SubscriberManagerComponent', () => {
  let component: SubscriberManagerComponent;
  let fixture: ComponentFixture<SubscriberManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriberManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriberManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
