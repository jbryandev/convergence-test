import * as migration_20250103_134345_initial from './20250103_134345_initial';
import * as migration_20250105_150150 from './20250105_150150';

export const migrations = [
  {
    up: migration_20250103_134345_initial.up,
    down: migration_20250103_134345_initial.down,
    name: '20250103_134345_initial',
  },
  {
    up: migration_20250105_150150.up,
    down: migration_20250105_150150.down,
    name: '20250105_150150'
  },
];
