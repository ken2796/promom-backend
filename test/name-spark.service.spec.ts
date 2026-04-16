import { NotFoundException } from '@nestjs/common';
import { NameSparkService } from '../src/name-spark/name-spark.service';
import { NameGender } from '../src/shared/enums/name-gender.enum';
import { NameOrigin } from '../src/shared/enums/name-origin.enum';

describe('NameSparkService', () => {
  let service: NameSparkService;

  beforeEach(() => {
    service = new NameSparkService();
  });

  // ── search ──────────────────────────────────────────────────────────────────

  describe('search', () => {
    it('returns all names when no filters are supplied', () => {
      const results = service.search({});
      expect(results.length).toBeGreaterThan(0);
    });

    it('respects the limit parameter', () => {
      const results = service.search({ limit: 3 });
      expect(results).toHaveLength(3);
    });

    it('defaults to limit 10 when limit is omitted', () => {
      const results = service.search({});
      expect(results.length).toBeLessThanOrEqual(10);
    });

    it('filters by gender and excludes non-matching names', () => {
      const results = service.search({ gender: NameGender.Boy });
      for (const r of results) {
        expect([NameGender.Boy, NameGender.Unisex]).toContain(r.gender);
      }
    });

    it('filters by origin', () => {
      const results = service.search({ origins: [NameOrigin.Japanese] });
      for (const r of results) {
        expect(r.origin).toBe(NameOrigin.Japanese);
      }
    });

    it('filters by multiple origins', () => {
      const results = service.search({
        origins: [NameOrigin.Arabic, NameOrigin.Hebrew],
      });
      for (const r of results) {
        expect([NameOrigin.Arabic, NameOrigin.Hebrew]).toContain(r.origin);
      }
    });

    it('filters by startingLetter (case already normalised by DTO)', () => {
      const results = service.search({ startingLetter: 'L' });
      for (const r of results) {
        expect(r.name.startsWith('L')).toBe(true);
      }
    });

    it('returns an empty array when no names match the filters', () => {
      const results = service.search({
        startingLetter: 'Z',
        origins: [NameOrigin.Japanese],
      });
      expect(results).toHaveLength(0);
    });

    it('returns results sorted by matchScore descending', () => {
      const results = service.search({ gender: NameGender.Girl });
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].matchScore).toBeGreaterThanOrEqual(
          results[i].matchScore,
        );
      }
    });

    it('breaks score ties alphabetically', () => {
      // Two gender=girl names with same score should be sorted A→Z
      const results = service.search({ gender: NameGender.Girl, limit: 10 });
      const sameScore = results.filter(
        (r) => r.matchScore === results[0].matchScore,
      );
      const names = sameScore.map((r) => r.name);
      expect(names).toEqual([...names].sort());
    });

    it('includes isFavorite from seed state', () => {
      const results = service.search({ startingLetter: 'L' });
      const layla = results.find((r) => r.id === 'layla');
      expect(layla?.isFavorite).toBe(true);
    });

    it('each result includes required fields', () => {
      const [first] = service.search({ limit: 1 });
      expect(first).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        meaning: expect.any(String),
        gender: expect.any(String),
        origin: expect.any(String),
        matchScore: expect.any(Number),
        isFavorite: expect.any(Boolean),
      });
    });
  });

  // ── getNameDetail ────────────────────────────────────────────────────────────

  describe('getNameDetail', () => {
    it('returns a full detail object for a known id', () => {
      const detail = service.getNameDetail('layla');
      expect(detail.id).toBe('layla');
      expect(detail.name).toBe('Layla');
      expect(Array.isArray(detail.styles)).toBe(true);
      expect(typeof detail.insight).toBe('string');
    });

    it('throws NotFoundException for an unknown id', () => {
      expect(() => service.getNameDetail('missing-name')).toThrow(
        NotFoundException,
      );
    });

    it('returns a copy of styles so mutations are isolated', () => {
      const detail = service.getNameDetail('layla');
      const originalLength = detail.styles.length;
      detail.styles.push('Extra');
      expect(service.getNameDetail('layla').styles).toHaveLength(originalLength);
    });
  });

  // ── updateFavorite ───────────────────────────────────────────────────────────

  describe('updateFavorite', () => {
    it('sets isFavorite to true', () => {
      const result = service.updateFavorite('ayla', { isFavorite: true });
      expect(result.isFavorite).toBe(true);
    });

    it('sets isFavorite to false', () => {
      // layla starts as true in seed
      const result = service.updateFavorite('layla', { isFavorite: false });
      expect(result.isFavorite).toBe(false);
    });

    it('persists the mutation across subsequent calls', () => {
      service.updateFavorite('ayla', { isFavorite: true });
      expect(service.getNameDetail('ayla').isFavorite).toBe(true);

      service.updateFavorite('ayla', { isFavorite: false });
      expect(service.getNameDetail('ayla').isFavorite).toBe(false);
    });

    it('reflects updated state in search results', () => {
      service.updateFavorite('ayla', { isFavorite: true });
      const results = service.search({ startingLetter: 'A' });
      const ayla = results.find((r) => r.id === 'ayla');
      expect(ayla?.isFavorite).toBe(true);
    });

    it('throws NotFoundException for an unknown id', () => {
      expect(() =>
        service.updateFavorite('no-such-name', { isFavorite: true }),
      ).toThrow(NotFoundException);
    });
  });
});
