import { createContext } from 'react';

const AccessKeyContext = createContext([null, () => {}]);

export default AccessKeyContext;