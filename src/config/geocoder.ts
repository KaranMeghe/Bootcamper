/** @format */
import NodeGeocoder, { Options } from 'node-geocoder';

const options: Options = {
  provider: 'openstreetmap',
};

const geocoder = NodeGeocoder(options);

export default geocoder;
