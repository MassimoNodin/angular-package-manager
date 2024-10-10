import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerativeAIComponent } from './generative-ai.component';

describe('GenerativeAIComponent', () => {
  let component: GenerativeAIComponent;
  let fixture: ComponentFixture<GenerativeAIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerativeAIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerativeAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
