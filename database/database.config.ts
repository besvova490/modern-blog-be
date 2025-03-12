import { DataSource, type DataSourceOptions } from 'typeorm';
import { DatabaseConfig } from '../config/database';

export default new DataSource(DatabaseConfig as DataSourceOptions);
