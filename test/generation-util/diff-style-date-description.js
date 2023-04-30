const assert = require('assert');
const describe = require('mocha').describe;
const it = require('mocha').it;
const {
  Generation,
  DiffStyleDateDescription,
} = require('../../src/generation-util');

describe('DiffStyleDateDescription', () => {
  it('No data in generation 0 and generation 1', () => {
    const generation0Data = [];
    const generation1Data = [];

    const generation0 = new Generation(generation0Data);
    const generation1 = new Generation(generation1Data);

    const diff = new DiffStyleDateDescription().get(generation0, generation1);

    assert.deepStrictEqual(diff.length, 0);
  });

  it('No data in generation 0', () => {
    const generation0Data = [];
    const generation1Data = [
      {
        path: '/page_1.html',
        title: 'Page 1',
        records: [
          {
            date: '2023/01/01',
            description: [
              'Message 1',
            ],
          },
        ],
      },
    ];

    const generation0 = new Generation(generation0Data);
    const generation1 = new Generation(generation1Data);

    const diff = new DiffStyleDateDescription().get(generation0, generation1);

    assert.deepStrictEqual(diff.length, 0);
  });

  it('No data in generation 1', () => {
    const generation0Data = [
      {
        path: '/page_1.html',
        title: 'Page 1',
        records: [
          {
            date: '2023/01/01',
            description: [
              'Message 1',
            ],
          },
        ],
      },
    ];
    const generation1Data = [];

    const generation0 = new Generation(generation0Data);
    const generation1 = new Generation(generation1Data);

    const diff = new DiffStyleDateDescription().get(generation0, generation1);

    assert.deepStrictEqual(diff.length, 1);
    assert.deepStrictEqual(diff[0].path, '/page_1.html');
    assert.deepStrictEqual(diff[0].title, 'Page 1');
    assert.deepStrictEqual(diff[0].records.length, 1);
    assert.deepStrictEqual(diff[0].records[0].date, '2023/01/01');
    assert.deepStrictEqual(diff[0].records[0].description, ['Message 1']);
  });

  it('Record added in generation 0', () => {
    const generation0Data = [
      {
        path: '/page_1.html',
        title: 'Page 1',
        records: [
          {
            date: '2023/01/02',
            description: [
              'Message 2',
            ],
          },
          {
            date: '2023/01/01',
            description: [
              'Message 1',
            ],
          },
        ],
      },
    ];
    const generation1Data = [
      {
        path: '/page_1.html',
        title: 'Page 1',
        records: [
          {
            date: '2023/01/01',
            description: [
              'Message 1',
            ],
          },
        ],
      },
    ];

    const generation0 = new Generation(generation0Data);
    const generation1 = new Generation(generation1Data);

    const diff = new DiffStyleDateDescription().get(generation0, generation1);

    assert.deepStrictEqual(diff.length, 1);
    assert.deepStrictEqual(diff[0].path, '/page_1.html');
    assert.deepStrictEqual(diff[0].title, 'Page 1');
    assert.deepStrictEqual(diff[0].records.length, 1);
    assert.deepStrictEqual(diff[0].records[0].date, '2023/01/02');
    assert.deepStrictEqual(diff[0].records[0].description, ['Message 2']);
  });

  it('Record removed in generation 0', () => {
    const generation0Data = [
      {
        path: '/page_1.html',
        title: 'Page 1',
        records: [
          {
            date: '2023/01/02',
            description: [
              'Message 2',
            ],
          },
        ],
      },
    ];
    const generation1Data = [
      {
        path: '/page_1.html',
        title: 'Page 1',
        records: [
          {
            date: '2023/01/02',
            description: [
              'Message 2',
            ],
          },
          {
            date: '2023/01/01',
            description: [
              'Message 1',
            ],
          },
        ],
      },
    ];

    const generation0 = new Generation(generation0Data);
    const generation1 = new Generation(generation1Data);

    const diff = new DiffStyleDateDescription().get(generation0, generation1);

    assert.deepStrictEqual(diff.length, 0);
  });

  it('Existing records edited in generation 0', () => {
    const generation0Data = [
      {
        path: '/page_1.html',
        title: 'Page 1',
        records: [
          {
            date: '2023/01/02',
            description: [
              'Message 2 (edit)',
            ],
          },
          {
            date: '2023/01/01',
            description: [
              'Message 1 (edit)',
            ],
          },
        ],
      },
    ];
    const generation1Data = [
      {
        path: '/page_1.html',
        title: 'Page 1',
        records: [
          {
            date: '2023/01/02',
            description: [
              'Message 2',
            ],
          },
          {
            date: '2023/01/01',
            description: [
              'Message 1',
            ],
          },
        ],
      },
    ];

    const generation0 = new Generation(generation0Data);
    const generation1 = new Generation(generation1Data);

    const diff = new DiffStyleDateDescription().get(generation0, generation1);

    assert.deepStrictEqual(diff.length, 1);
    assert.deepStrictEqual(diff[0].path, '/page_1.html');
    assert.deepStrictEqual(diff[0].title, 'Page 1');
    assert.deepStrictEqual(diff[0].records.length, 2);
    assert.deepStrictEqual(diff[0].records[0].date, '2023/01/02');
    assert.deepStrictEqual(diff[0].records[0].description, ['Message 2 (edit)']);
    assert.deepStrictEqual(diff[0].records[1].date, '2023/01/01');
    assert.deepStrictEqual(diff[0].records[1].description, ['Message 1 (edit)']);  });
});
