import { WebpackRunner } from '@iamyth/webpack-runner';
import path from 'path';

new WebpackRunner({
    projectDirectory: path.join(__dirname, '..'),
    port: 8080,
    tsconfigFilePath: path.join(__dirname, '../config/tsconfig.src.json'),
}).run();
