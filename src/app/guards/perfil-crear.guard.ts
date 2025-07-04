import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';

export const perfilCrearGuard: CanActivateFn = (route, state) => {
  return true;
};
