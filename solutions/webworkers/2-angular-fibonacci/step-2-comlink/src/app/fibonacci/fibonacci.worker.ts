/// <reference lib="webworker" />
import { fibonacci } from './fibonacci';
import * as Comlink from 'comlink';

Comlink.expose(fibonacci);
