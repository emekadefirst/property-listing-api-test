import 'reflect-metadata';
import { describe, expect, it } from 'vitest';
import { validate } from 'class-validator';
import { UpdatePropertyDto } from './dtos.property.js';

const errorsFor = (payload: object) =>
  validate(Object.assign(new UpdatePropertyDto(), payload));

describe('UpdatePropertyDto', () => {
  it('accepts a partial payload (PATCH)', async () => {
    const errors = await errorsFor({ title: 'Detach Luxury 3-bedroom apartment' });
    expect(errors).toHaveLength(0);
  });

  it('accepts an empty payload', async () => {
    expect(await errorsFor({})).toHaveLength(0);
  });

  it('still rejects invalid values for supplied fields', async () => {
    expect((await errorsFor({ bedrooms: -1 })).length).toBeGreaterThan(0);
    expect((await errorsFor({ price: 'not-a-decimal' })).length).toBeGreaterThan(0);
    expect((await errorsFor({ type: 'castle' })).length).toBeGreaterThan(0);
  });
});
