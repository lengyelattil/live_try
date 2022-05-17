import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

const Bolt = React.forwardRef((props, ref) => (
  <SvgIcon {...props} ref={ref}>
    <path d='M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z' />
  </SvgIcon>
));

export default Bolt;
