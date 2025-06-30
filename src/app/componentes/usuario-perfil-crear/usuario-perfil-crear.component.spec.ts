import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPerfilCrearComponent } from './usuario-perfil-crear.component';

describe('UsuarioPerfilCrearComponent', () => {
  let component: UsuarioPerfilCrearComponent;
  let fixture: ComponentFixture<UsuarioPerfilCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioPerfilCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioPerfilCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
