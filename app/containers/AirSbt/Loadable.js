/**
 *
 * Asynchronously loads the component for AirSbt
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
