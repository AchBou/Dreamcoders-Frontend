import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RubriqueComponent } from './rubrique.component';

describe('EditableComponent', () => {
  let component: RubriqueComponent;
  let fixture: ComponentFixture<RubriqueComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RubriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
